// payload/hooks/revalidateCache.ts

import { CollectionAfterDeleteHook } from "payload"
import { CollectionAfterChangeHook, GlobalAfterChangeHook } from "payload"




const FRONTEND_URL = process.env.FRONTEND_URL || 'https://www.neuhomeservices.com'
const REVALIDATE_SECRET = process.env.CACHE_REVALIDATE_SECRET

async function pingRevalidate(tag: string) {
  if (!REVALIDATE_SECRET) {
    console.warn('CACHE_REVALIDATE_SECRET not set — skipping revalidation')
    return
  }
  try {
    const res = await fetch(
      `${FRONTEND_URL}/api/revalidate?secret=${REVALIDATE_SECRET}&tag=${tag}`,
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