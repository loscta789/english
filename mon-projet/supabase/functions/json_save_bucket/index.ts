import { serve } from "https://deno.land/std/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const raw = await req.text();
    const newEntry = JSON.parse(raw); // par exemple { "chat": ["phrase1", "phrase2"] }

    const keyword = Object.keys(newEntry)[0];
    if (!keyword || !Array.isArray(newEntry[keyword])) {
      return new Response("Format invalide", {
        status: 400,
        headers: corsHeaders,
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // 🧩 Étape 1 : essayer de récupérer le fichier totalJson.json s’il existe
    let currentData: Record<string, string[]> = {};
    const { data, error: downloadError } = await supabase
      .storage
      .from("englishbucket")
      .download("keywords/totalJson.json");

    if (!downloadError && data) {
      const text = await data.text();
      currentData = JSON.parse(text);
    }

    // 🧩 Étape 2 : ajouter ou mettre à jour l’entrée
    currentData[keyword] = newEntry[keyword];

    // 🧩 Étape 3 : sauvegarder le nouveau fichier
    const fileContent = new Blob(
      [JSON.stringify(currentData, null, 2)],
      { type: "application/json" }
    );

    const { error: uploadError } = await supabase.storage
      .from("englishbucket")
      .upload("keywords/totalJson.json", fileContent, {
        upsert: true,
        contentType: "application/json",
      });

    if (uploadError) {
      return new Response(JSON.stringify(uploadError), {
        status: 500,
        headers: corsHeaders,
      });
    }

    return new Response("Ajout réussi", { status: 200, headers: corsHeaders });

  } catch (err: unknown) {
    return new Response("Erreur serveur", {
      status: 500,
      headers: corsHeaders,
    });
  }
});
