"use server";

import { headers } from "next/headers";

export interface FormState {
  status: "idle" | "success" | "error";
  message: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function subscribeAction(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const email = formData.get("email");
  const hpField = formData.get("company");
  const isActiveField = formData.get("isActive");
  const isActive =
    typeof isActiveField === "string" && isActiveField === "true";

  if (typeof hpField === "string" && hpField.trim().length > 0) {
    return {
      status: "success",
      message: "Grazie! Ti contatteremo presto con tutti i dettagli.",
    };
  }

  if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
    return {
      status: "error",
      message: "Per favore inserisci un indirizzo email valido.",
    };
  }

  try {
    const webhookUrl = process.env.GOOGLE_APPS_SCRIPT_WEBHOOK_URL;
    const webhookSecret = process.env.GOOGLE_APPS_SCRIPT_SECRET;

    if (!webhookUrl || !webhookSecret) {
      console.error(
        "[subscribe] Missing GOOGLE_APPS_SCRIPT_WEBHOOK_URL or GOOGLE_APPS_SCRIPT_SECRET",
      );
      return {
        status: "error",
        message: "Configurazione server incompleta. Riprova tra poco.",
      };
    }

    const requestHeaders = await headers();
    const forwardedFor = requestHeaders.get("x-forwarded-for");
    const ipAddress = forwardedFor?.split(",")[0]?.trim() ?? "unknown";
    const userAgent = requestHeaders.get("user-agent") ?? "unknown";

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        secret: webhookSecret,
        ipAddress,
        userAgent,
        submittedAt: new Date().toISOString(),
        isEasterEggActive: isActive,
      }),
    });

    if (!response.ok) {
      console.error("[subscribe] Webhook failed with status", response.status);
      return {
        status: "error",
        message: "Non siamo riusciti a registrarti. Riprova tra poco.",
      };
    }

    return {
      status: "success",
      message: "Perfetto, controlla la tua email per la conferma.",
    };
  } catch (error) {
    console.error("[subscribe] Unexpected error", error);
    return {
      status: "error",
      message: "Qualcosa è andato storto. Riprova tra poco.",
    };
  }
}
