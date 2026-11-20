"use server";

import { headers } from "next/headers";

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

  const apiUrl = process.env.RUNVEY_API_URL;
  if (!apiUrl) {
    console.error("[waitlist] RUNVEY_API_URL is not set");
    return serverError(name, email);
  }

  const h = await headers();
  try {
    const res = await fetch(`${apiUrl.replace(/\/$/, "")}/v1/early-access`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.RUNVEY_API_KEY && {
          Authorization: `Bearer ${process.env.RUNVEY_API_KEY}`,
        }),
      },
      body: JSON.stringify({
        name,
        email,
        ip:
          h.get("cf-connecting-ip") ??
          h.get("x-forwarded-for")?.split(",")[0]?.trim() ??
          "",
        user_agent: h.get("user-agent") ?? "",
      }),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });

    if (res.status === 422) {
      const body = (await res.json()) as {
        error?: string;
        field_errors?: { name?: string; email?: string };
      };
      return {
        status: "error",
        message: body.error ?? "Check the highlighted fields.",
        fieldErrors: body.field_errors,
        values: { name, email },
      };
    }
    if (!res.ok) {
      console.error("[waitlist] backend returned", res.status);
      return serverError(name, email);
    }
  } catch (err) {
    console.error("[waitlist] backend request failed", err);
    return serverError(name, email);
  }

  return { status: "success", name };
}

function serverError(name: string, email: string): WaitlistState {
  return {
    status: "error",
    message: "Something went wrong on our side. Please try again in a moment.",
    values: { name, email },
  };
}
