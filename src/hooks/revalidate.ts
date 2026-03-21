// payload/hooks/revalidateCache.ts

import { CollectionAfterDeleteHook } from "payload"
import { CollectionAfterChangeHook, GlobalAfterChangeHook } from "payload"




/** Base URL of the Next app that serves GET /api/revalidate (not necessarily the public marketing domain). */
const REVALIDATE_BASE_URL =
  process.env.FRONTEND_URL ||
  'https://www.neuhomeservices.com'
const REVALIDATE_SECRET = process.env.CACHE_REVALIDATE_SECRET

/** Busts Next.js cache tags on the frontend. Runs from collection afterChange/afterDelete — including saves made via @payloadcms/plugin-mcp (payload.create / payload.update), which execute the same hooks as the admin UI. */
async function pingRevalidate(tag: string) {
  if (!REVALIDATE_SECRET) {
    console.warn('CACHE_REVALIDATE_SECRET not set — skipping revalidation')
    return
  }
  try {
    const res = await fetch(
      `${REVALIDATE_BASE_URL.replace(/\/$/, '')}/api/revalidate?secret=${REVALIDATE_SECRET}&tag=${tag}`,
      { method: 'GET' }
    )
    if (res.ok) {
      console.log(`✓ Revalidated tag: ${tag}`)
    } else {
      console.error(`✗ Revalidation failed [${res.status}]:`, tag)
    }
  } catch (err) {
    console.error('Revalidation fetch error:', err)
  }
}

// Collections: pages, services, experiments
export const revalidateCms: CollectionAfterChangeHook = async ({ doc }) => {
  await pingRevalidate('cms')
  return doc
}

export const revalidateCmsOnDelete: CollectionAfterDeleteHook = async ({ doc }) => {
  await pingRevalidate('cms')
  return doc
}

// Globals: header, footer (longer cache — bust both tags)
export const revalidateCmsStatic: GlobalAfterChangeHook = async ({ doc }) => {
  await pingRevalidate('cms-static')
  await pingRevalidate('cms')
  return doc
}