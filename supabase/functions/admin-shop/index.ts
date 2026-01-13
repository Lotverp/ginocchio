import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

    const { action, table, data, id, key, value } = await req.json();
    console.log(`Admin shop action: ${action} on ${table || 'settings'}`);

    // Validate table name for shop operations
    if (table && !['shop_packages', 'shop_skins', 'site_settings'].includes(table)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Tabella non valida' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // GET SETTINGS
    if (action === 'get-settings') {
      const { data: settings, error } = await supabase
        .from('site_settings')
        .select('*')
        .order('key');

      if (error) {
        console.error('Error fetching settings:', error);
        return new Response(
          JSON.stringify({ success: false, error: error.message }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ success: true, data: settings }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // UPDATE SETTING
    if (action === 'update-setting') {
      if (!key || value === undefined) {
        return new Response(
          JSON.stringify({ success: false, error: 'Key e value richiesti' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const { data: updatedSetting, error } = await supabase
        .from('site_settings')
        .update({ value })
        .eq('key', key)
        .select()
        .single();

      if (error) {
        console.error('Error updating setting:', error);
        return new Response(
          JSON.stringify({ success: false, error: error.message }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      console.log('Setting updated:', key, '=', value);
      return new Response(
        JSON.stringify({ success: true, data: updatedSetting }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // GET ALL items (including inactive for admin)
    if (action === 'get-all') {
      const { data: items, error } = await supabase
        .from(table)
        .select('*')
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching items:', error);
        return new Response(
          JSON.stringify({ success: false, error: error.message }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ success: true, data: items }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // CREATE item
    if (action === 'create') {
      const { data: newItem, error } = await supabase
        .from(table)
        .insert([data])
        .select()
        .single();

      if (error) {
        console.error('Error creating item:', error);
        return new Response(
          JSON.stringify({ success: false, error: error.message }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      console.log('Item created:', newItem.id);
      return new Response(
        JSON.stringify({ success: true, data: newItem }),
        { status: 201, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // UPDATE item
    if (action === 'update') {
      if (!id) {
        return new Response(
          JSON.stringify({ success: false, error: 'ID richiesto per l\'aggiornamento' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const { data: updatedItem, error } = await supabase
        .from(table)
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating item:', error);
        return new Response(
          JSON.stringify({ success: false, error: error.message }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      console.log('Item updated:', id);
      return new Response(
        JSON.stringify({ success: true, data: updatedItem }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // DELETE item
    if (action === 'delete') {
      if (!id) {
        return new Response(
          JSON.stringify({ success: false, error: 'ID richiesto per l\'eliminazione' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting item:', error);
        return new Response(
          JSON.stringify({ success: false, error: error.message }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      console.log('Item deleted:', id);
      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // TOGGLE active status
    if (action === 'toggle-active') {
      if (!id) {
        return new Response(
          JSON.stringify({ success: false, error: 'ID richiesto' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Get current status
      const { data: currentItem, error: fetchError } = await supabase
        .from(table)
        .select('is_active')
        .eq('id', id)
        .single();

      if (fetchError) {
        return new Response(
          JSON.stringify({ success: false, error: fetchError.message }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Toggle status
      const { data: updatedItem, error } = await supabase
        .from(table)
        .update({ is_active: !currentItem.is_active })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        return new Response(
          JSON.stringify({ success: false, error: error.message }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      console.log('Item toggled:', id, '-> is_active:', updatedItem.is_active);
      return new Response(
        JSON.stringify({ success: true, data: updatedItem }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Azione non valida' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Admin shop error:', error);
    return new Response(
      JSON.stringify({ error: 'Errore interno del server' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
