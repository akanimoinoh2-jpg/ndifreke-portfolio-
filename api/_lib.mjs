import { put, del } from "@vercel/blob";

// Shared helpers for the Vercel serverless API functions.

export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "ndifreke2026";

export function isAuthorized(req) {
  const header = req.headers.authorization || "";
  return header === `Bearer ${ADMIN_PASSWORD}`;
}

export function unauthorized(res) {
  return res.status(401).json({
    error: "Unauthorized. Admin password required.",
  });
}

// Projects are stored in Vercel Blob so they survive redeploys.
export async function readProjects() {
  try {
    const res = await fetch(
      `${process.env.BLOB_BASE_URL}/projects.json`,
      { cache: "no-store" }
    );
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export async function writeProjects(list) {
  await put("projects.json", JSON.stringify(list, null, 2), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}

export { put, del };
