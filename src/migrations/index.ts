import * as migration_20260321_170500_add_mcp_plugin_tables from './20260321_170500_add_mcp_plugin_tables';

export const migrations = [
  {
    up: migration_20260321_170500_add_mcp_plugin_tables.up,
    down: migration_20260321_170500_add_mcp_plugin_tables.down,
    name: '20260321_170500_add_mcp_plugin_tables',
  },
];
