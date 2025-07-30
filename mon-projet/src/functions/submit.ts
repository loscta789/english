export async function submit(keyword: string, sentences: string[]): Promise<boolean> {
    const data = { [keyword]: sentences };
    const jsonData = JSON.stringify(data, null, 2);
    console.log("jsonData:", jsonData);
  
    try {
      const response = await fetch(
        "https://nzhsvnbqomyungrbfdrd.functions.supabase.co/json_save_bucket",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          
          body: jsonData,
        }
      );
  
      if (!response.ok) {
        return false
      }
  
      return true
    } catch (error) {
      console.error("Erreur lors de l'envoi :", error);
      return false // ou return si tu veux éviter de casser une chaîne
    }
  }
  