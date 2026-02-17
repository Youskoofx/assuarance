import { supabase } from "@/lib/supabase";

export interface EmailPayload {
  nom?: string;
  prenom?: string;
  email?: string;
  telephone?: string;
  type_assurance?: string;
  ville?: string;
  message?: string;
  to?: string | string[];
  template?: string;
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

    if (error) throw error;
    if ((data as any)?.error) throw (data as any)?.error;

    return { success: true };
  } catch (err) {
    console.error("sendPersonalEmail failure:", err);
    return { success: false, error: err };
  }
}
