// deno-lint-ignore-file no-explicit-any
import { serve } from "https://deno.land/std@0.208.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface EmailRequest {
  to: string | string[];
  template: "welcome" | "admin-new-user" | "invitation";
  subject?: string;
  data?: Record<string, any>;
}

interface RenderedEmail {
  subject: string;
  html: string;
  text: string;
}

function renderTemplate(template: EmailRequest["template"], data: Record<string, any> = {}): RenderedEmail {
  const displayName =
    [data.prenom, data.nom].filter((part) => typeof part === "string" && part.trim().length > 0).join(" ") ||
    data.email ||
    "Client";
  const dashboardUrl = typeof data.dashboardUrl === "string" && data.dashboardUrl.length > 0
    ? data.dashboardUrl
    : `${data.origin ?? "https://assurance.fr"}/espace-client/dashboard`;
  const espaceClientUrl = typeof data.actionUrl === "string" && data.actionUrl.length > 0
    ? data.actionUrl
    : `${data.origin ?? "https://assurance.fr"}/espace-client`;

  const styles = {
    wrapper: "font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background-color:#f7f9fc; padding:32px;",
    container: "max-width:560px;margin:0 auto;background:#ffffff;border-radius:16px;padding:40px;box-shadow:0 22px 45px rgba(15,23,42,0.12);color:#0f172a;",
    heading: "font-size:24px;margin:0 0 16px 0;font-weight:600;color:#0f172a;",
    paragraph: "margin:0 0 16px 0;line-height:1.6;color:#334155;",
    cta: "display:inline-block;padding:12px 22px;border-radius:999px;background:linear-gradient(135deg,#0ea5e9,#06b6d4);color:#ffffff;font-weight:600;text-decoration:none;margin-top:12px;",
    footer: "margin-top:32px;font-size:12px;color:#64748b;line-height:1.5;",
    badge: "display:inline-block;padding:6px 12px;border-radius:999px;background:#e0f2fe;color:#0369a1;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.12em;margin-bottom:24px;",
  } as const;

  switch (template) {
    case "welcome": {
      return {
        subject: "Bienvenue dans votre espace client Assurance Prévoyance",
        html: `
  <div style="${styles.wrapper}">
    <div style="${styles.container}">
      <span style="${styles.badge}">Bienvenue</span>
      <h1 style="${styles.heading}">Bonjour ${displayName},</h1>
      <p style="${styles.paragraph}">
        Merci de votre confiance. Votre espace client est désormais activé : vous pouvez y retrouver le suivi de vos contrats, vos documents et vos échanges avec votre conseiller.
      </p>
      <p style="${styles.paragraph}">
        Pour accéder immédiatement à vos informations, cliquez sur le bouton ci-dessous ou copiez le lien suivant dans votre navigateur :
      </p>
      <p style="${styles.paragraph}">
        <a href="${dashboardUrl}" style="${styles.cta}">Accéder à mon espace client</a>
      </p>
      <p style="${styles.paragraph}">
        ${dashboardUrl}
      </p>
      <p style="${styles.paragraph}">
        Besoin d’aide ? Répondez directement à cet email ou contactez-nous via le chat sécurisé disponible dans votre espace.
      </p>
      <p style="${styles.paragraph}">
        À très bientôt,<br />
        L’équipe Assurance Prévoyance
      </p>
      <div style="${styles.footer}">
        Ce message vous est adressé suite à la création de votre espace client. Si vous pensez l’avoir reçu par erreur, merci de nous contacter.
      </div>
    </div>
  </div>`,
        text:
          `Bonjour ${displayName},

Merci de votre confiance. Votre espace client est maintenant activé :
- Tableau de bord personnalisé
- Contrats et documents accessibles 24/7
- Messagerie sécurisée avec votre conseiller

Accédez à votre espace : ${dashboardUrl}

Besoin d’aide ? Répondez simplement à cet email.

À bientôt,
L’équipe Assurance Prévoyance`,
      };
    }

    case "admin-new-user": {
      return {
        subject: `🆕 Nouveau compte client : ${displayName}`,
        html: `
  <div style="${styles.wrapper}">
    <div style="${styles.container}">
      <span style="${styles.badge}">Notification équipe</span>
      <h1 style="${styles.heading}">Un nouvel espace client vient d’être créé</h1>
      <p style="${styles.paragraph}">
        ${displayName} (${data.email}) vient d’activer son espace client.
      </p>
      <p style="${styles.paragraph}">
        Vous pouvez préparer son onboarding : vérifier les documents manquants, proposer un rendez-vous ou envoyer le récapitulatif de garanties.
      </p>
      <p style="${styles.paragraph}">
        <a href="${dashboardUrl}" style="${styles.cta}">Ouvrir le back-office</a>
      </p>
      <div style="${styles.footer}">
        Notification automatique Assurances Prévoyance · Gestion conseillers
      </div>
    </div>
  </div>`,
        text:
          `Nouveau compte client : ${displayName} (${data.email})

Accédez au back-office : ${dashboardUrl}

Pensez à vérifier les documents complémentaires et proposer un accompagnement personnalisé.`,
      };
    }

    case "invitation":
    default: {
      return {
        subject: "Activez votre espace client Assurance Prévoyance",
        html: `
  <div style="${styles.wrapper}">
    <div style="${styles.container}">
      <span style="${styles.badge}">Invitation</span>
      <h1 style="${styles.heading}">Bonjour ${displayName},</h1>
      <p style="${styles.paragraph}">
        Votre conseiller vient de préparer votre dossier. Pour finaliser la création de votre compte, complétez votre inscription en choisissant un mot de passe sécurisé.
      </p>
      <p style="${styles.paragraph}">
        <a href="${espaceClientUrl}" style="${styles.cta}">Finaliser mon inscription</a>
      </p>
      <p style="${styles.paragraph}">
        Une fois connecté, vous retrouverez vos contrats, documents et nos échanges centralisés dans un espace chiffré.
      </p>
      <p style="${styles.paragraph}">
        À tout moment, l’équipe Assurance Prévoyance reste disponible pour répondre à vos questions.
      </p>
      <div style="${styles.footer}">
        Assistance : contact@assurance.fr · +33 1 80 05 00 50
      </div>
    </div>
  </div>`,
        text:
          `Bonjour ${displayName},

Votre conseiller a préparé votre espace client. Finalisez votre inscription ici : ${espaceClientUrl}

Une fois connecté, vous accédez à vos documents, contrats et messagerie sécurisée.

Besoin d’aide ? contact@assurance.fr · 01 80 05 00 50`,
      };
    }
  }
}

async function sendEmail(request: EmailRequest) {
  const apiKey = Deno.env.get("RESEND_API_KEY");
  const from = Deno.env.get("RESEND_FROM_EMAIL") ?? "Assurance Prévoyance <contact@mail.assurance.fr>";

  if (!apiKey) {
    return {
      status: 501,
      body: {
        error: "RESEND_API_KEY is not configured. Configure it with `supabase secrets set`.",
      },
    };
  }

  const recipients = Array.isArray(request.to) ? request.to : [request.to];
  if (!recipients.length) {
    return {
      status: 400,
      body: { error: "Aucun destinataire fourni." },
    };
  }

  const rendered = renderTemplate(request.template, request.data ?? {});
  const subject = request.subject ?? rendered.subject;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: recipients,
      subject,
      html: rendered.html,
      text: rendered.text,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    return {
      status: 502,
      body: { error: `Resend API error: ${errorText}` },
    };
  }

  const data = await response.json();
  return {
    status: 200,
    body: { id: data.id, status: "sent" },
  };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
    });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Méthode non autorisée" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const payload = (await req.json()) as EmailRequest;

    if (!payload?.template || !payload?.to) {
      return new Response(
        JSON.stringify({ error: "Paramètres requis manquants." }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const result = await sendEmail(payload);
    return new Response(JSON.stringify(result.body), {
      status: result.status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("send-personal-email error:", err);
    return new Response(
      JSON.stringify({ error: "Erreur interne lors de l’envoi de l’email." }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
