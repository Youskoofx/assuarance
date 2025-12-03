// Edge Function: send-devis-email
// Envoie un email à contact@prevoyanceservices.fr avec le lien du devis stocké (Supabase Storage)
// Déploiement : supabase functions deploy send-devis-email
// Test local : supabase functions serve send-devis-email --env-file ../.env
// curl -i -X POST "http://localhost:54321/functions/v1/send-devis-email" \
//   -H "Content-Type: application/json" \
//   -d '{"nom":"Jean Dupont","email":"jean@email.fr","message":"Merci","fileUrl":"https://.../devis123.pdf"}'

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface DevisPayload {
  nom: string;
  email: string;
  message: string;
  fileUrl: string;
}

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const TO_EMAIL = "contact@prevoyanceservices.fr";
const FROM_EMAIL = "Prévoyance Services <onboarding@resend.dev>";

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function badRequest(message: string) {
  return jsonResponse({ success: false, message }, 400);
}

function internalError(message: string, error?: unknown) {
  return jsonResponse({ success: false, message, error }, 500);
}

async function sendMail(payload: DevisPayload) {
  if (!RESEND_API_KEY) {
    return internalError("RESEND_API_KEY manquant dans les variables d'environnement.");
  }

  const html = `
    <h2>Nouvelle demande de devis</h2>
    <p><b>Nom :</b> ${payload.nom}</p>
    <p><b>Email :</b> ${payload.email}</p>
    <p><b>Message :</b><br>${payload.message}</p>
    <p><b>Fichier devis :</b> <a href="${payload.fileUrl}">Télécharger le devis</a></p>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      subject: `Nouveau devis reçu de ${payload.nom}`,
      html,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    return jsonResponse(
      { success: false, message: "Erreur lors de l'envoi de l'email", details: errorText },
      502
    );
  }

  const providerResponse = await res.json();
  return jsonResponse({
    success: true,
    message: "Email envoyé",
    providerResponse: { id: providerResponse.id, status: providerResponse.status ?? "sent" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ success: false, message: "Méthode non autorisée" }, 405);
  }

  try {
    const body = (await req.json()) as Partial<DevisPayload>;
    if (!body.nom || !body.email || !body.message || !body.fileUrl) {
      return badRequest("Champs requis: nom, email, message, fileUrl");
    }
    return await sendMail(body as DevisPayload);
  } catch (error) {
    console.error("[send-devis-email] Erreur interne:", error);
    return internalError("Erreur interne", error);
  }
});
