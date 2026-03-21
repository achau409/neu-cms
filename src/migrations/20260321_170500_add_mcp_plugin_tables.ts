import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

/**
 * Adds schema required by @payloadcms/plugin-mcp on an existing database.
 * (A full `migrate:create` snapshot assumes an empty DB and is unsafe to run here.)
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "payload_mcp_api_keys" (
      "id" serial PRIMARY KEY NOT NULL,
      "user_id" integer NOT NULL,
      "label" varchar,
      "description" varchar,
      "pages_find" boolean DEFAULT false,
      "pages_create" boolean DEFAULT false,
      "pages_update" boolean DEFAULT false,
      "services_find" boolean DEFAULT false,
      "services_create" boolean DEFAULT false,
      "services_update" boolean DEFAULT false,
      "header_find" boolean DEFAULT false,
      "header_create" boolean DEFAULT false,
      "header_update" boolean DEFAULT false,
      "footer_find" boolean DEFAULT false,
      "footer_create" boolean DEFAULT false,
      "footer_update" boolean DEFAULT false,
      "media_find" boolean DEFAULT false,
      "media_create" boolean DEFAULT false,
      "payload_mcp_prompt_neo_cms_write_from_brief" boolean DEFAULT true,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "enable_a_p_i_key" boolean,
      "api_key" varchar,
      "api_key_index" varchar
    );
  `)

  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "payload_mcp_api_keys"
        ADD CONSTRAINT "payload_mcp_api_keys_user_id_users_id_fk"
        FOREIGN KEY ("user_id") REFERENCES "public"."users"("id")
        ON DELETE cascade ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
  `)

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "payload_mcp_api_keys_user_idx" ON "payload_mcp_api_keys" USING btree ("user_id");
  `)
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "payload_mcp_api_keys_updated_at_idx" ON "payload_mcp_api_keys" USING btree ("updated_at");
  `)
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "payload_mcp_api_keys_created_at_idx" ON "payload_mcp_api_keys" USING btree ("created_at");
  `)

  await db.execute(sql`
    ALTER TABLE "payload_preferences_rels" ADD COLUMN IF NOT EXISTS "payload_mcp_api_keys_id" integer;
  `)
  await db.execute(sql`
    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "payload_mcp_api_keys_id" integer;
  `)

  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "payload_preferences_rels"
        ADD CONSTRAINT "payload_preferences_rels_payload_mcp_api_keys_fk"
        FOREIGN KEY ("payload_mcp_api_keys_id") REFERENCES "public"."payload_mcp_api_keys"("id")
        ON DELETE cascade ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "payload_locked_documents_rels"
        ADD CONSTRAINT "payload_locked_documents_rels_payload_mcp_api_keys_fk"
        FOREIGN KEY ("payload_mcp_api_keys_id") REFERENCES "public"."payload_mcp_api_keys"("id")
        ON DELETE cascade ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
  `)

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "payload_preferences_rels_payload_mcp_api_keys_id_idx"
      ON "payload_preferences_rels" USING btree ("payload_mcp_api_keys_id");
  `)
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_payload_mcp_api_keys_id_idx"
      ON "payload_locked_documents_rels" USING btree ("payload_mcp_api_keys_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "payload_preferences_rels" DROP CONSTRAINT IF EXISTS "payload_preferences_rels_payload_mcp_api_keys_fk";
  `)
  await db.execute(sql`
    ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_payload_mcp_api_keys_fk";
  `)
  await db.execute(sql`
    ALTER TABLE "payload_preferences_rels" DROP COLUMN IF EXISTS "payload_mcp_api_keys_id";
  `)
  await db.execute(sql`
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "payload_mcp_api_keys_id";
  `)
  await db.execute(sql`DROP INDEX IF EXISTS "payload_preferences_rels_payload_mcp_api_keys_id_idx";`)
  await db.execute(sql`DROP INDEX IF EXISTS "payload_locked_documents_rels_payload_mcp_api_keys_id_idx";`)
  await db.execute(sql`DROP INDEX IF EXISTS "payload_mcp_api_keys_user_idx";`)
  await db.execute(sql`DROP INDEX IF EXISTS "payload_mcp_api_keys_updated_at_idx";`)
  await db.execute(sql`DROP INDEX IF EXISTS "payload_mcp_api_keys_created_at_idx";`)
  await db.execute(sql`
    ALTER TABLE "payload_mcp_api_keys" DROP CONSTRAINT IF EXISTS "payload_mcp_api_keys_user_id_users_id_fk";
  `)
  await db.execute(sql`DROP TABLE IF EXISTS "payload_mcp_api_keys";`)
}
