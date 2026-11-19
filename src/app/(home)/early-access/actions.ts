"use server";

export type WaitlistState =
  | { status: "idle" }
  | { status: "success"; name: string }
  | {
      status: "error";
      message: string;
      fieldErrors?: { name?: string; email?: string };
      values: { name: string; email: string };
    };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function joinWaitlist(
  _prev: WaitlistState,
  formData: FormData,
): Promise<WaitlistState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();

  // Honeypot: real people never see or fill this field.
  if (String(formData.get("company") ?? "") !== "") {
    return { status: "success", name };
  }

  const fieldErrors: { name?: string; email?: string } = {};
  if (name.length < 1) fieldErrors.name = "Tell us what to call you.";
  else if (name.length > 120) fieldErrors.name = "That name is a little long.";
  if (!EMAIL_PATTERN.test(email) || email.length > 254)
    fieldErrors.email = "Enter a valid email address.";

  if (fieldErrors.name || fieldErrors.email) {
    return {
      status: "error",
      message: "Check the highlighted fields.",
      fieldErrors,
      values: { name, email },
    };
  }

  // TODO(waitlist): store the signup. Destination not decided yet
  // (database / Ghost members / email tool). Until then nothing is saved.
  console.info("[waitlist] signup received (not stored yet)", { name, email });

  return { status: "success", name };
}
