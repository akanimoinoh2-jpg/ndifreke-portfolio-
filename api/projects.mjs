import { put } from "@vercel/blob";
import { isAuthorized, unauthorized, readProjects, writeProjects } from "../_lib.mjs";

export const config = {
  api: { bodyParser: false }, // needed for multipart uploads
};

export default async function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json(await readProjects());
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  if (!isAuthorized(req)) return unauthorized(res);

  try {
    const form = await req.formData();
    const title = form.get("title");
    const category = form.get("category") || "";
    const summary = form.get("summary") || "";
    const link = form.get("link") || "";
    const image = form.get("image");

    if (!title) {
      return res.status(400).json({ error: "A project title is required." });
    }
    if (!image || typeof image === "string") {
      return res.status(400).json({ error: "A project image is required." });
    }
    if (!/^image\/(png|jpe?g|gif|webp)$/i.test(image.type)) {
      return res.status(400).json({ error: "Only image files are allowed." });
    }
    if (image.size > 15 * 1024 * 1024) {
      return res.status(400).json({ error: "Image must be under 15 MB." });
    }

    // Upload the image to Vercel Blob
    const ext = (image.name.match(/\.(\w+)$/) || [, "png"])[1];
    const safeName = `${Date.now()}-${image.name.replace(/[^\w.\-]+/g, "_")}`;
    const blob = await put(safeName, image.stream(), {
      access: "public",
      addRandomSuffix: false,
      contentType: image.type,
    });

    const list = await readProjects();
    const project = {
      id: Date.now().toString(36),
      title,
      category: category || "New project",
      summary,
      link,
      image: blob.url,
      createdAt: new Date().toISOString(),
    };
    // Newest first
    list.unshift(project);
    await writeProjects(list);

    return res.status(201).json(project);
  } catch (err) {
    return res.status(500).json({ error: err.message || "Upload failed." });
  }
}
