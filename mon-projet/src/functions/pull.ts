"use client";
// functions/pull.ts
export async function pull(): Promise<Record<string, string[]> | null> {
    try {
      const response = await fetch(
        "https://nzhsvnbqomyungrbfdrd.functions.supabase.co/pull",
        { method: "GET" }
      );
  
      if (!response.ok) return null;
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erreur dans pull():", error);
      return null;
    }
  }
  