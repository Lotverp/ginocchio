import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Simple password hash comparison (for demo - in production use proper bcrypt)
const hashPassword = (password: string): string => {
  // Simple hash for demo purposes
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return `simple_hash_${Math.abs(hash).toString(16)}`;
};

const verifyPassword = (password: string, storedHash: string): boolean => {
  // Check if it's our simple hash format
  if (storedHash.startsWith('simple_hash_')) {
    return hashPassword(password) === storedHash;
  }
  // For demo: allow plain text comparison for initial setup
  // In production, always use proper bcrypt
  return password === storedHash || storedHash.includes(password);
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const body = await req.json();
    const { action, username, password, newPassword } = body;
    console.log(`Admin auth action: ${action} for user: ${username}`);

    if (action === 'login') {
      // Find admin user
      const { data: adminUser, error: findError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('username', username)
        .maybeSingle();

      if (findError) {
        console.error('Error finding admin user:', findError);
        return new Response(
          JSON.stringify({ success: false, error: 'Errore del database' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      if (!adminUser) {
        console.log('Admin user not found:', username);
        return new Response(
          JSON.stringify({ success: false, error: 'Credenziali non valide' }),
          { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // For this demo, we use a simple verification
      // Special case: allow "baudo" password for pippo user (initial setup)
      const isValidPassword = 
        (username === 'pippo' && password === 'baudo') ||
        verifyPassword(password, adminUser.password_hash);
      
      if (!isValidPassword) {
        console.log('Invalid password for admin:', username);
        return new Response(
          JSON.stringify({ success: false, error: 'Credenziali non valide' }),
          { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Generate a simple session token
      const sessionToken = crypto.randomUUID();
      
      console.log('Admin login successful:', username);
      return new Response(
        JSON.stringify({ 
          success: true, 
          admin: { id: adminUser.id, username: adminUser.username },
          sessionToken 
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (action === 'change-password') {
      // Find admin user
      const { data: adminUser, error: findError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('username', username)
        .maybeSingle();

      if (findError || !adminUser) {
        return new Response(
          JSON.stringify({ success: false, error: 'Utente non trovato' }),
          { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Verify current password
      const isValidPassword = 
        (username === 'pippo' && password === 'baudo') ||
        verifyPassword(password, adminUser.password_hash);
      
      if (!isValidPassword) {
        return new Response(
          JSON.stringify({ success: false, error: 'Password corrente non valida' }),
          { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Hash new password and update
      const newPasswordHash = hashPassword(newPassword);
      const { error: updateError } = await supabase
        .from('admin_users')
        .update({ password_hash: newPasswordHash })
        .eq('id', adminUser.id);

      if (updateError) {
        console.error('Error updating password:', updateError);
        return new Response(
          JSON.stringify({ success: false, error: 'Errore durante l\'aggiornamento' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      console.log('Password changed for admin:', username);
      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Azione non valida' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Admin auth error:', error);
    return new Response(
      JSON.stringify({ error: 'Errore interno del server' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
