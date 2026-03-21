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

You MUST complete the workflow using Payload MCP tools you have permission for:
1. If needed, call find* on the relevant collection to inspect existing block types, slugs, or required fields.
2. Create or update documents with create* / update* tools. Do not end with a draft only in chat—the data should exist in Payload.
3. For **pages**: supply title, unique slug, block-based content valid for this project, sidebar status (default draft unless the brief explicitly says publish), and SEO fields when useful.
4. For **services**: match the services schema (including blocks / Lexical fields as defined in the project).
5. Never invent media IDs. If an image is required, either use existing media from a find result or omit the relation and keep text-only content.
6. Respect access control: operations run as the MCP API key user.

Proceed now.`,
          },
        },
      ],
    }),
  },
]
