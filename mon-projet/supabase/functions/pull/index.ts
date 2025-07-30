import { serve } from "https://deno.land/std/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  if (req.method === "GET") {
    try {
      const { data, error } = await supabase
        .storage
        .from("englishbucket")
        .download("keywords/totalJson.json");

      if (error || !data) {
        console.error("Erreur de téléchargement :", error);
        return new Response("Fichier non trouvé", {
          status: 404,
          headers: corsHeaders,
        });
      }

      const text = await data.text();
      const json = JSON.parse(text);

      return new Response(JSON.stringify(json), {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      });

    } catch (err) {
      console.error("Erreur interne :", err);
      return new Response("Erreur serveur", {
        status: 500,
        headers: corsHeaders,
      });
    }
  }

  return new Response("Méthode non autorisée", {
    status: 405,
    headers: corsHeaders,
  });
});
