export const config = {
  puerto: process.env.PORT ?? 3002,
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
  adminUsuario: process.env.ADMIN_USER ?? 'admin',
  adminPassword: process.env.ADMIN_PASSWORD,
  dataDir: process.env.DATA_DIR ?? 'data',
};
