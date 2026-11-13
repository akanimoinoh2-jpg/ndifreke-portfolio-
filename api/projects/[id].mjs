import { del } from "@vercel/blob";
import { isAuthorized, unauthorized, readProjects, writeProjects } from "../_lib.mjs";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed." });
  }
  if (!isAuthorized(req)) return unauthorized(res);

  const id = req.query.id;
  const list = await readProjects();
  const index = list.findIndex((p) => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Project not found." });
  }

  const [removed] = list.splice(index, 1);
  await writeProjects(list);

  // Best-effort cleanup of the uploaded image blob
  if (removed.image) {
    try {
      await del(removed.image);
    } catch {
      // ignore cleanup failures
    }
  }

  return res.status(200).json({ ok: true });
}
