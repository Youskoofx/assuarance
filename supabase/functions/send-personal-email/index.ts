import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const TO_EMAIL = "youssouph2607@gmail.com";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { 
      status: 200,
      headers: corsHeaders 
    });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ success: false, error: "Méthode non autorisée" }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    const body = await req.json();
    console.log("📨 Body reçu :", JSON.stringify(body, null, 2));

    const { nom, prenom, email, telephone, type_assurance, ville, message } = body;

    if (!nom || !email || !type_assurance) {
      return new Response(
        JSON.stringify({ success: false, error: "Champs obligatoires manquants" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!RESEND_API_KEY) {
      console.error("❌ RESEND_API_KEY manquante");
      return new Response(
        JSON.stringify({ success: false, error: "Configuration serveur invalide" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const html = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nouvelle demande de devis</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f0f9f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;">
  
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f0f9f9; padding: 30px 15px;">
    <tr>
      <td align="center">
        
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; width: 100%; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(28, 186, 181, 0.15);">
          
          <tr>
            <td style="background: #ffffff; padding: 40px 25px 30px; text-align: center; border-bottom: 3px solid #1CBAB5;">
              <img src="https://prevoyanceservices.fr/images/image.png" 
                   alt="Prévoyance Services" 
                   width="260" 
                   border="0"
                   style="display: block; margin: 0 auto; max-width: 100%; height: auto;" />
            </td>
          </tr>
          
          <tr>
            <td style="background: linear-gradient(135deg, #1CBAB5 0%, #17a39f 100%); padding: 25px;">
              <div style="background: rgba(255,255,255,0.2); display: inline-block; padding: 5px 12px; border-radius: 15px; margin-bottom: 10px;">
                <span style="color: #ffffff; font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px;">
                  NOUVEAU
                </span>
              </div>
              <h1 style="margin: 0 0 10px; color: #ffffff; font-size: 20px; font-weight: 600; line-height: 1.3;">
                Demande de devis reçue
              </h1>
              <p style="margin: 0; color: rgba(255,255,255,0.95); font-size: 13px; font-weight: 500;">
                ${new Date().toLocaleDateString('fr-FR', { 
                  day: '2-digit', 
                  month: '2-digit', 
                  year: 'numeric'
                })} • ${new Date().toLocaleTimeString('fr-FR', { 
                  hour: '2-digit', 
                  minute: '2-digit'
                })}
              </p>
            </td>
          </tr>
          
          <tr>
            <td style="padding: 35px 25px;">
              
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 30px;">
                <tr>
                  <td style="background: linear-gradient(135deg, #1CBAB5 0%, #17a39f 100%); border-radius: 12px; padding: 25px 20px; text-align: center;">
                    <div style="width: 50px; height: 50px; background: rgba(255,255,255,0.25); border-radius: 50%; margin: 0 auto 12px; font-size: 24px; line-height: 50px;">
                      🛡️
                    </div>
                    <p style="margin: 0 0 8px; color: rgba(255,255,255,0.9); font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 600;">
                      Type de contrat
                    </p>
                    <h2 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 700; line-height: 1.3;">
                      ${type_assurance}
                    </h2>
                  </td>
                </tr>
              </table>
              
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 18px;">
                <tr>
                  <td style="padding-bottom: 12px; border-bottom: 3px solid #1CBAB5;">
                    <h3 style="margin: 0; color: #2d3748; font-size: 17px; font-weight: 700;">
                      Informations du prospect
                    </h3>
                  </td>
                </tr>
              </table>
              
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border: 2px solid #e0f5f5; border-radius: 10px; overflow: hidden;">
                
                <tr>
                  <td style="padding: 18px 15px; border-bottom: 1px solid #e0f5f5; background: #f0f9f9;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="width: 45px; vertical-align: top;">
                          <div style="width: 38px; height: 38px; background: linear-gradient(135deg, #1CBAB5 0%, #17a39f 100%); border-radius: 8px; text-align: center; line-height: 38px; font-size: 18px;">
                            👤
                          </div>
                        </td>
                        <td style="vertical-align: top; padding-left: 12px;">
                          <p style="margin: 0 0 4px; color: #64748b; font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px;">
                            IDENTITÉ
                          </p>
                          <p style="margin: 0; color: #2d3748; font-size: 15px; font-weight: 700; line-height: 1.3;">
                            ${nom} ${prenom || ''}
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <tr>
                  <td style="padding: 18px 15px; border-bottom: 1px solid #e0f5f5; background: #ffffff;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="width: 45px; vertical-align: top;">
                          <div style="width: 38px; height: 38px; background: linear-gradient(135deg, #1CBAB5 0%, #17a39f 100%); border-radius: 8px; text-align: center; line-height: 38px; font-size: 18px;">
                            📧
                          </div>
                        </td>
                        <td style="vertical-align: top; padding-left: 12px;">
                          <p style="margin: 0 0 4px; color: #64748b; font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px;">
                            EMAIL
                          </p>
                          <a href="mailto:${email}" style="color: #1CBAB5; font-size: 13px; font-weight: 700; text-decoration: none; word-break: break-all; line-height: 1.4;">
                            ${email}
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                ${telephone ? `
                <tr>
                  <td style="padding: 18px 15px; border-bottom: 1px solid #e0f5f5; background: #f0f9f9;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="width: 45px; vertical-align: top;">
                          <div style="width: 38px; height: 38px; background: linear-gradient(135deg, #1CBAB5 0%, #17a39f 100%); border-radius: 8px; text-align: center; line-height: 38px; font-size: 18px;">
                            📱
                          </div>
                        </td>
                        <td style="vertical-align: top; padding-left: 12px;">
                          <p style="margin: 0 0 4px; color: #64748b; font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px;">
                            TÉLÉPHONE
                          </p>
                          <a href="tel:${telephone}" style="color: #2d3748; font-size: 16px; font-weight: 700; text-decoration: none;">
                            ${telephone}
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                ` : ''}
                
                ${ville ? `
                <tr>
                  <td style="padding: 18px 15px; background: #ffffff;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="width: 45px; vertical-align: top;">
                          <div style="width: 38px; height: 38px; background: linear-gradient(135deg, #1CBAB5 0%, #17a39f 100%); border-radius: 8px; text-align: center; line-height: 38px; font-size: 18px;">
                            📍
                          </div>
                        </td>
                        <td style="vertical-align: top; padding-left: 12px;">
                          <p style="margin: 0 0 4px; color: #64748b; font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px;">
                            VILLE
                          </p>
                          <p style="margin: 0; color: #2d3748; font-size: 15px; font-weight: 700;">
                            ${ville}
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                ` : ''}
                
              </table>
              
              ${message ? `
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 25px;">
                <tr>
                  <td style="padding-bottom: 12px; border-bottom: 3px solid #1CBAB5;">
                    <h3 style="margin: 0; color: #2d3748; font-size: 17px; font-weight: 700;">
                      Message du prospect
                    </h3>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 15px;">
                    <div style="background: #f0f9f9; border-left: 4px solid #1CBAB5; border-radius: 8px; padding: 18px 15px;">
                      <p style="margin: 0; color: #475569; font-size: 13px; line-height: 1.7; white-space: pre-wrap;">${message}</p>
                    </div>
                  </td>
                </tr>
              </table>
              ` : ''}
              
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 30px;">
                <tr>
                  <td align="center">
                    <a href="https://prevoyanceservices.fr/espace-client" style="display: inline-block; background: linear-gradient(135deg, #1CBAB5 0%, #17a39f 100%); color: #ffffff; text-decoration: none; padding: 15px 30px; border-radius: 8px; font-weight: 700; font-size: 12px; letter-spacing: 0.5px; text-transform: uppercase; box-shadow: 0 4px 12px rgba(28, 186, 181, 0.25);">
                      ACCÉDER À L'ESPACE CLIENT
                    </a>
                    <p style="margin: 12px 0 0; color: #64748b; font-size: 11px;">
                      Pour répondre : <a href="mailto:${email}" style="color: #1CBAB5; text-decoration: none; font-weight: 700;">${email}</a>
                    </p>
                  </td>
                </tr>
              </table>
              
            </td>
          </tr>
          
          <tr>
            <td style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 35px 25px; text-align: center;">
              <img src="https://prevoyanceservices.fr/images/image.png" 
                   alt="Prévoyance Services" 
                   width="160" 
                   border="0"
                   style="display: block; margin: 0 auto 15px; max-width: 100%; height: auto; filter: brightness(0) invert(1); opacity: 0.9;" />
              <div style="height: 2px; width: 50px; background: #1CBAB5; margin: 15px auto;"></div>
              <p style="margin: 0 0 6px; color: #ffffff; font-size: 14px; font-weight: 700; letter-spacing: 0.3px;">
                Prévoyance Services
              </p>
              <p style="margin: 0 0 12px; color: #94a3b8; font-size: 12px;">
                28 ans d'expertise • 16+ partenaires
              </p>
              <p style="margin: 0; color: #64748b; font-size: 10px;">
                Notification automatique • Ne pas répondre
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

    console.log("📤 Envoi email...");

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Prévoyance Services <onboarding@resend.dev>",
        to: [TO_EMAIL],
        subject: `Nouveau devis de ${nom} - ${type_assurance}`,
        html,
      }),
    });

    const providerResponse = await resendResponse.json();
    console.log("📬 Provider response:", JSON.stringify(providerResponse, null, 2));

    if (!resendResponse.ok) {
      console.error("❌ Erreur Resend:", providerResponse);
      return new Response(
        JSON.stringify({ success: false, error: "Échec d'envoi email", details: providerResponse }),
        { status: resendResponse.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("✅ Email envoyé !");

    return new Response(
      JSON.stringify({ success: true, message: "Email envoyé", emailId: providerResponse.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (err) {
    console.error("❌ Erreur:", err);
    return new Response(
      JSON.stringify({ success: false, error: err.message || "Erreur interne" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
