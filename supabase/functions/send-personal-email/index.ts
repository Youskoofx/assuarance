// supabase/functions/send-personal-email/index.ts
// Envoie un email HTML détaillé à l'ADMIN via Resend (notification de demande de devis).
// Déploiement : supabase functions deploy send-personal-email
// Test local : supabase functions serve send-personal-email --env-file ../.env

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const ADMIN_EMAILS = ["contact@prevoyanceservices.fr"]; // ajoute d'autres emails si besoin
const FROM_EMAIL = "Prévoyance Services <onboarding@resend.dev>";

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}

function badRequest(message: string) {
  return jsonResponse({ success: false, error: message }, 400);
}

function internalError(message: string, error?: unknown) {
  return jsonResponse({ success: false, error: message, details: error }, 500);
}

async function handleSendEmail(payload: any) {
  console.log("[send-personal-email] Body reçu :", payload);

  if (!payload.nom || !payload.email || !payload.type_assurance) {
    return badRequest("Champs obligatoires manquants : nom, email, type_assurance");
  }

  if (!RESEND_API_KEY) {
    return internalError("RESEND_API_KEY manquant dans les variables d'environnement.");
  }

  const text = [
    "Demande de devis",
    `Nom: ${payload.nom} ${payload.prenom ?? ""}`.trim(),
    `Email: ${payload.email}`,
    `Téléphone: ${payload.telephone ?? ""}`,
    `Type d'assurance: ${payload.type_assurance}`,
    `Ville: ${payload.ville ?? ""}`,
    payload.message ? `Besoins / message: ${payload.message}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  // HTML détaillé pour l'ADMIN (avec logo, besoins, liens mailto + site)
  const html = `
<!DOCTYPE html>
<html lang="fr" style="margin:0;padding:0;background:#0b1920;">
  <body style="margin:0;padding:0;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#0b1920;color:#0f172a;">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#0b1920;padding:32px 0;">
      <tr>
        <td align="center">

          <table width="640" cellpadding="0" cellspacing="0" role="presentation" style="max-width:640px;width:100%;background:#ffffff;border-radius:24px;overflow:hidden;border:1px solid #0f766e;">
            <!-- BARRE HAUT -->
            <tr>
              <td style="padding:10px 24px;background:linear-gradient(90deg,#0b7285,#38b6b3);color:#e5f6ff;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;">
                PRÉVOYANCE SERVICES • NOUVELLE DEMANDE DE DEVIS
              </td>
            </tr>

            <!-- HEADER AVEC LOGO -->
            <tr>
              <td align="center" style="padding:22px 24px 8px 24px;background:#ffffff;">
                <img
                  src="https://prevoyanceservices.fr/images/image.png"
                  alt="Prévoyance Services"
                  width="120"
                  style="display:block;margin:0 auto 8px auto;"
                />
                <p style="margin:0;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:#6b7280;">
                  Courtier en assurance – Santé &amp; Prévoyance
                </p>
              </td>
            </tr>

            <!-- INTRO -->
            <tr>
              <td style="padding:16px 28px 10px 28px;background:#ffffff;">
                <p style="margin:0 0 6px 0;font-size:13px;color:#6b7280;">
                  Bonjour,
                </p>
                <p style="margin:0 0 10px 0;font-size:15px;color:#374151;line-height:1.6;">
                  Une nouvelle demande de devis vient d’être soumise depuis le site 
                  <strong>prevoyanceservices.fr</strong>. Merci de la prendre en charge.
                </p>
                <p style="margin:0;font-size:13px;color:#6b7280;line-height:1.6;">
                  Les informations ci‑dessous vous permettent de recontacter le client et de préparer une proposition adaptée.
                </p>
              </td>
            </tr>

            <!-- INFOS CLIENT -->
            <tr>
              <td style="padding:10px 28px 0 28px;background:#ffffff;">
                <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="border-radius:16px;border:1px solid #e2e8f0;background:#f9fafb;">
                  <tr>
                    <td style="padding:16px 18px 10px 18px;">
                      <p style="margin:0 0 8px 0;font-size:12px;font-weight:600;letter-spacing:0.14em;color:#64748b;text-transform:uppercase;">
                        Informations du client
                      </p>
                      <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="font-size:14px;color:#0f172a;">
                        <tr>
                          <td style="padding:4px 0;width:150px;color:#6b7280;">Nom complet</td>
                          <td style="padding:4px 0;font-weight:500;">
                            ${payload.nom}${payload.prenom ? " " + payload.prenom : ""}
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:4px 0;width:150px;color:#6b7280;">Email</td>
                          <td style="padding:4px 0;">
                            <a href="mailto:${payload.email}" style="color:#0b7285;text-decoration:none;">
                              ${payload.email}
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:4px 0;width:150px;color:#6b7280;">Téléphone</td>
                          <td style="padding:4px 0;">
                            ${
                              payload.telephone
                                ? `<a href="tel:${payload.telephone}" style="color:#0b7285;text-decoration:none;">${payload.telephone}</a>`
                                : "Non communiqué"
                            }
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:4px 0;width:150px;color:#6b7280;">Ville</td>
                          <td style="padding:4px 0;">
                            ${payload.ville ?? "Non précisée"}
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- DEMANDE / BESOINS -->
            <tr>
              <td style="padding:16px 28px 0 28px;background:#ffffff;">
                <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="border-radius:16px;border:1px solid #e2e8f0;background:#ffffff;">
                  <tr>
                    <td style="padding:16px 18px 10px 18px;">
                      <p style="margin:0 0 8px 0;font-size:12px;font-weight:600;letter-spacing:0.14em;color:#64748b;text-transform:uppercase;">
                        Demande de devis
                      </p>
                      <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="font-size:14px;color:#0f172a;">
                        <tr>
                          <td style="padding:4px 0;width:150px;color:#6b7280;">Type d'assurance</td>
                          <td style="padding:4px 0;font-weight:600;color:#0b7285;">
                            ${payload.type_assurance}
                          </td>
                        </tr>
                        ${
                          payload.message
                            ? `
                        <tr>
                          <td style="padding:8px 0 0 0;width:150px;color:#6b7280;vertical-align:top;">
                            Besoins / message
                          </td>
                          <td style="padding:8px 0 0 0;white-space:pre-line;color:#111827;line-height:1.6;">
                            ${payload.message}
                          </td>
                        </tr>`
                            : ""
                        }
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- ACTIONS CONSEILLER -->
            <tr>
              <td style="padding:18px 28px 8px 28px;background:#ffffff;">
                <p style="margin:0 0 8px 0;font-size:14px;font-weight:600;color:#0f172a;">
                  Prochaines actions recommandées
                </p>
                <ol style="margin:0;padding-left:18px;font-size:13px;color:#4b5563;line-height:1.7;">
                  <li>Contacter le client pour vérifier les informations et préciser son besoin.</li>
                  <li>Qualifier le niveau de couverture souhaité, le budget et les garanties complémentaires.</li>
                  <li>Préparer un ou plusieurs scénarios de devis puis envoyer la proposition détaillée.</li>
                  <li>Noter le suivi dans votre outil interne (CRM / tableau de bord).</li>
                </ol>
              </td>
            </tr>

            <!-- CTA + LIEN SITE -->
            <tr>
              <td style="padding:10px 28px 18px 28px;background:#ffffff;" align="center">
                <a
                  href="mailto:${payload.email}"
                  style="display:inline-block;background:linear-gradient(90deg,#0b7285,#38b6b3);color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;padding:11px 26px;border-radius:999px;box-shadow:0 10px 24px rgba(11,114,133,0.35);margin-bottom:8px;"
                >
                  Répondre au client par email
                </a>
                <br />
                <a
                  href="https://prevoyanceservices.fr"
                  style="display:inline-block;margin-top:6px;font-size:13px;color:#0b7285;text-decoration:none;"
                >
                  Ouvrir le site Prévoyance Services
                </a>
              </td>
            </tr>

            <!-- FOOTER -->
            <tr>
              <td style="padding:14px 24px 20px 24px;background:#f8fafc;border-top:1px solid #e2e8f0;">
                <p style="margin:0 0 4px 0;font-size:11px;line-height:1.6;color:#6b7280;">
                  Email automatique envoyé à l’équipe Prévoyance Services suite à une demande de devis en ligne.
                </p>
                <p style="margin:0;font-size:11px;line-height:1.6;color:#9ca3af;">
                  © 2025 Prévoyance Services – Tous droits réservés.
                </p>
              </td>
            </tr>
          </table>

        </td>
      </tr>
    </table>
  </body>
</html>
`;

  const providerResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: ADMIN_EMAILS,
      subject: `Nouvelle demande de devis ${payload.type_assurance} – ${payload.nom}`,
      html,
      text,
    }),
  });

  let providerJson: any;
  try {
    providerJson = await providerResponse.json();
  } catch {
    providerJson = { error: "Parse error" };
  }

  console.log("[send-personal-email] Provider status:", providerResponse.status, providerJson);

  if (!providerResponse.ok) {
    return jsonResponse(
      {
        success: false,
        error: "Erreur lors de l'envoi de l'email",
        details: providerJson,
      },
      400,
    );
  }

  return jsonResponse({
    success: true,
    message: "Email admin envoyé",
    providerResponse: {
      id: providerJson.id,
      status: providerJson.status ?? "sent",
    },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return jsonResponse({ success: false, error: "Méthode non autorisée" }, 405);
  }
  try {
    const body = await req.json();
    return await handleSendEmail(body);
  } catch (error) {
    console.error("[send-personal-email] Erreur interne:", error);
    return internalError("Erreur interne", error);
  }
});
