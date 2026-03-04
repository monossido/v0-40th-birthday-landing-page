"use server"

export interface FormState {
  status: "idle" | "success" | "error"
  message: string
}

export async function subscribeAction(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const email = formData.get("email")

  if (!email || typeof email !== "string" || !email.includes("@")) {
    return {
      status: "error",
      message: "Per favore inserisci un indirizzo email valido.",
    }
  }

  try {
    // Placeholder: replace with your actual email service (e.g. Resend, Mailchimp, DB insert)
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Log for now — swap with real persistence later
    console.log("[subscribe]", email)

    return {
      status: "success",
      message: "Grazie! Ti contatteremo presto con tutti i dettagli.",
    }
  } catch {
    return {
      status: "error",
      message: "Qualcosa è andato storto. Riprova tra poco.",
    }
  }
}
