// Supabase Edge Function: send-personal-email
// Envoie un devis par email via Resend, en lisant les champs à plat depuis le body JSON.
// Déploiement : supabase functions deploy send-personal-email
// Test local : supabase functions serve send-personal-email --env-file ../.env
// Curl : curl -i -X POST http://localhost:54321/functions/v1/send-personal-email -H "Content-Type: application/json" -d '{"nom":"Test","email":"test@mail.com","type_assurance":"Prévoyance"}'
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const TO_EMAIL = "contact@prevoyanceservices.fr";
const FROM_EMAIL = Deno.env.get("RESEND_FROM_EMAIL") ?? `Demande de devis <${TO_EMAIL}>`;
function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json"
    }
  });
}
function badRequest(message) {
  return jsonResponse({
    success: false,
    error: message
  }, 400);
}
function internalError(message, error) {
  return jsonResponse({
    success: false,
    error: message,
    details: error
  }, 500);
}
async function handleSendEmail(payload) {
  console.log("[send-personal-email] Body reçu :", payload);
  if (!payload.nom || !payload.email || !payload.type_assurance) {
    return badRequest("Champs obligatoires manquants : nom, email, type_assurance");
  }
  if (!RESEND_API_KEY) {
    return internalError("RESEND_API_KEY manquant dans les variables d’environnement.");
  }
  const html = `
    <h2>Demande de devis</h2>
    <p><b>Nom:</b> ${payload.nom} ${payload.prenom ?? ""}</p>
    <p><b>Email:</b> ${payload.email}</p>
    <p><b>Téléphone:</b> ${payload.telephone ?? ""}</p>
    <p><b>Type d'assurance:</b> ${payload.type_assurance}</p>
    <p><b>Ville:</b> ${payload.ville ?? ""}</p>
    ${payload.message ? `<p><b>Message complémentaire:</b><br>${payload.message}</p>` : ""}
  `;
  const text = [
    `Demande de devis`,
    `Nom: ${payload.nom} ${payload.prenom ?? ""}`.trim(),
    `Email: ${payload.email}`,
    `Téléphone: ${payload.telephone ?? ""}`,
    `Type d'assurance: ${payload.type_assurance}`,
    `Ville: ${payload.ville ?? ""}`,
    payload.message ? `Message complémentaire: ${payload.message}` : null
  ].filter(Boolean).join("\n");
  const providerResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [
        TO_EMAIL
      ],
      subject: `Nouveau devis reçu de ${payload.nom}`,
      html,
      text
    })
  });
  let providerJson;
  let providerText;
  try {
    providerText = await providerResponse.text();
    providerJson = providerText ? JSON.parse(providerText) : {};
  } catch (parseErr) {
    console.error("[send-personal-email] Parsing provider response failed:", parseErr);
    providerJson = {
      error: "Unable to parse provider response",
      raw: providerText
    };
  }
  console.log("[send-personal-email] Provider status:", providerResponse.status, providerJson);
  if (!providerResponse.ok || providerJson?.error) {
    return jsonResponse({
      success: false,
      error: "Erreur lors de l’envoi de l’email",
      details: providerJson
    }, 502);
  }
  return jsonResponse({
    success: true,
    message: "Email envoyé",
    providerResponse: {
      id: providerJson.id,
      status: providerJson.status ?? "sent"
    }
  });
}
Deno.serve(async (req)=>{
  if (req.method === "OPTIONS") return new Response("ok", {
    headers: corsHeaders
  });
  if (req.method !== "POST") {
    return jsonResponse({
      success: false,
      error: "Méthode non autorisée"
    }, 405);
  }
  try {
    const body = await req.json();
    return await handleSendEmail(body);
  } catch (error) {
    console.error("[send-personal-email] Erreur interne:", error);
    return internalError("Erreur interne", error);
  }
});
