import type { Field, GeneratedTypes } from 'payload';

/**
 * Normalize a source string into a slug.
 */
function normalizeSlug(source: string): string {
  return source
    .toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with hyphens
    .replace(/[^a-z0-9-]/g, '')     // Remove special characters
    .replace(/-+/g, '-')            // Replace multiple hyphens with a single hyphen
    .replace(/^-|-$/g, '');         // Remove leading/trailing hyphens
}

/**
 * Utility to create a slug field that auto-generates slugs from a source field
 * and optionally ensures uniqueness per tenant.
 *
 * @param fieldName - The name of the slug field (e.g., 'slug', 'categorySlug')
 * @param sourceField - The name of the field to generate the slug from (e.g., 'name', 'categoryName')
 * @param tenantField - Optional: The name of the tenant field to enforce uniqueness within (e.g., 'tenantID')
 * @param collectionSlug - The slug of the collection this field belongs to
 * @returns A Payload CMS field definition
 */
export const createSlugField = (
  fieldName: string,
  sourceField: string,
  collectionSlug: keyof GeneratedTypes['collections'],
  tenantField?: string
): Field => ({
  name: fieldName,
  type: 'text',
  required: false,
  admin: {
    description: `Auto-generated from ${sourceField} if left empty`,
  },
  hooks: {
    beforeValidate: [
      async ({ value, data, siblingData, req }) => {
        const sourceData = siblingData?.[sourceField] || data?.[sourceField];
        const tenantID = tenantField ? siblingData?.[tenantField] || data?.[tenantField] : undefined;

        // Return user-provided value if it exists
        if (value) return value;
        if (!sourceData) return value; // Skip if missing source

        const baseSlug = normalizeSlug(sourceData);

        let slug = baseSlug;
        let increment = 0;

        // Ensure the slug is unique (globally or per tenant)
        while (true) {
          const where: Record<string, any> = { [fieldName]: { equals: slug } };
          if (tenantField && tenantID) {
            where[tenantField] = { equals: tenantID };
          }

          const existingEntries = await req.payload.find({
            collection: collectionSlug,
            where,
            limit: 1,
          });

          if (existingEntries.docs.length > 0) {
            increment++;
            slug = `${baseSlug}-${increment}`;
          } else {
            break;
          }
        }

        return slug;
      },
    ],
  },
});

export default createSlugField;