import { supabase } from "@/lib/supabase";

export type EmailTemplate = "welcome" | "admin-new-user" | "invitation";

interface EmailPayload {
  to: string | string[];
  template: EmailTemplate;
  subject?: string;
  data?: Record<string, unknown>;
}

interface EmailResponse {
  success: boolean;
  error?: unknown;
}

export async function sendPersonalEmail(payload: EmailPayload): Promise<EmailResponse> {
  try {
    const { data, error } = await supabase.functions.invoke("send-personal-email", {
      body: payload,
    });

    if (error) {
      throw error;
    }

    if ((data as any)?.error) {
      throw (data as any)?.error;
    }

    return { success: true };
  } catch (err) {
    console.error("sendPersonalEmail failure:", err);
    return { success: false, error: err };
  }
}
