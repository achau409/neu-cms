import { z } from 'zod'

const neoCmsBriefArgs = z.object({
  brief: z.string().describe('What to write: topic, tone, audience, CTAs, SEO notes, and any required blocks/sections.'),
  target: z
    .enum(['pages', 'services', 'either'])
    .optional()
    .describe('Primary collection; use "either" when not specified.'),
  slugHint: z
    .string()
    .optional()
    .describe('Preferred URL slug in kebab-case when creating a page or service.'),
})

/**
 * MCP prompts: Cursor (or other clients) can invoke these so the model drafts
 * structured briefs, then uses Payload MCP collection tools to persist data.
 */
export const contentPrompts = [
  {
    name: 'neo_cms_write_from_brief',
    title: 'Neo CMS: persist content from a brief',
    description:
      'Use when the user wants new or updated site copy saved into Payload (pages, services, or navigation) from a natural-language brief—without pasting into the admin UI manually.',
    argsSchema: neoCmsBriefArgs.shape,
    handler: (args: Record<string, unknown>, _req: unknown, _extra: unknown) => ({
      messages: [
        {
          role: 'user' as const,
          content: {
            type: 'text' as const,
            text: `You are writing and saving content for this Payload CMS project (Neo CMS).

Brief:
${String(args.brief ?? '')}

Target collection: ${args.target ?? 'either'}
${args.slugHint ? `Preferred slug: ${args.slugHint}` : ''}

You MUST complete all workflows using the Payload MCP tools you have permission for:
Inspect Existing Content
Use find* on the relevant collection to check existing block types, slugs, or required fields before updating.
Update Only
Use update* tools to modify documents.
Do not leave drafts only in chat—all changes must exist in Payload.
Creation of new documents is not configured yet. If asked about creating content, respond: “Creation not configured; consult your developer.”
Pages
Supply: title, unique slug, valid block-based content, sidebar status (default draft unless brief says publish), and SEO fields when useful.
Services
Follow the services schema exactly, including blocks and Lexical fields as defined in the project.
Media
Never invent media IDs. Use existing media from find* results or omit the relation; text-only content is acceptable if media is unavailable.
Access Control
All operations run as the MCP API key user; respect permissions strictly.
Cache Revalidation
After saving content, call the revalidateCms hook to refresh the cache.
Proceed now.`,
          },
        },
      ],
    }),
  },
]
