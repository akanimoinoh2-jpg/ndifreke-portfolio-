import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(__dirname, "data", "projects.json");
const UPLOAD_DIR = path.join(__dirname, "uploads");
const PUBLIC_DIR = path.join(__dirname, "..", "dist");

// Admin password — change this before going live.
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "ndifreke2026";

for (const dir of [path.dirname(DATA_FILE), UPLOAD_DIR]) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}
if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, "[]");

const app = express();
app.use(express.json());

// Serve uploaded images statically at /uploads
app.use("/uploads", express.static(UPLOAD_DIR));

// Serve the built portfolio (dist) when it exists
if (fs.existsSync(PUBLIC_DIR)) {
  app.use(express.static(PUBLIC_DIR));
}

// --- Auth helpers ------------------------------------------------------
function isAuthorized(req) {
  const header = req.headers.authorization || "";
  return header === `Bearer ${ADMIN_PASSWORD}`;
}

// Reject non-image uploads (matches .png, .jpg, .jpeg, .gif, .webp)
const upload = multer({
  storage: multer.diskStorage({
    destination: UPLOAD_DIR,
    filename: (_req, file, cb) => {
      const safe = Date.now() + "-" + file.originalname.replace(/[^\w.\-]+/g, "_");
      cb(null, safe);
    },
  }),
  limits: { fileSize: 15 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const ok = /^image\/(png|jpe?g|gif|webp)$/i.test(file.mimetype);
    cb(ok ? null : new Error("Only image files are allowed"), ok);
  },
});

// --- Projects API ------------------------------------------------------
function readProjects() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  } catch {
    return [];
  }
}

function writeProjects(list) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(list, null, 2));
}

app.get("/api/projects", (_req, res) => {
  res.json(readProjects());
});

app.post(
  "/api/projects",
  isAuthorizedCheck(),
  upload.single("image"),
  (req, res) => {
    const { title, category, summary, link } = req.body;
    if (!title) {
      return res.status(400).json({ error: "A project title is required." });
    }
    if (!req.file) {
      return res.status(400).json({ error: "A project image is required." });
    }

    const list = readProjects();
    const project = {
      id: Date.now().toString(36),
      title,
      category: category || "New project",
      summary: summary || "",
      link: link || "",
      image: `/uploads/${req.file.filename}`,
      createdAt: new Date().toISOString(),
    };
    // Newest first, matching "recent projects" behaviour
    list.unshift(project);
    writeProjects(list);
    res.status(201).json(project);
  }
);

function isAuthorizedCheck() {
  return (req, res, next) => {
    if (!isAuthorized(req)) {
      return res.status(401).json({ error: "Unauthorized. Admin password required." });
    }
    next();
  };
}

app.delete("/api/projects/:id", isAuthorizedCheck(), (req, res) => {
  const list = readProjects();
  const index = list.findIndex((p) => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Project not found." });

  const [removed] = list.splice(index, 1);
  writeProjects(list);

  // Best-effort cleanup of the uploaded image
  const imagePath = path.join(UPLOAD_DIR, path.basename(removed.image));
  if (removed.image.startsWith("/uploads/") && fs.existsSync(imagePath)) {
    fs.unlinkSync(imagePath);
  }
  res.json({ ok: true });
});

// Serve index.html for client-side routes (React Router)
app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api") && !req.path.startsWith("/uploads")) {
    const indexFile = path.join(PUBLIC_DIR, "index.html");
    if (fs.existsSync(indexFile)) return res.sendFile(indexFile);
    return res.status(404).send("Portfolio not built yet. Run: npm run build");
  }
  next();
});

const PORT = process.env.PORT || 4000;
// Express version kept for local dev. On Vercel, the /api folder runs instead.
app.listen(PORT, () => {
  console.log(`Portfolio backend running on http://localhost:${PORT}`);
});
