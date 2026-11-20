"use client";

import { useActionState } from "react";
import Link from "next/link";
import { ArrowRight, Check, LoaderCircle } from "lucide-react";
import { joinWaitlist, type WaitlistState } from "./actions";
import { MatchousePromo } from "./matchouse-promo";
import styles from "./waitlist.module.css";

const initialState: WaitlistState = { status: "idle" };

export function WaitlistForm() {
  const [state, formAction, pending] = useActionState(
    joinWaitlist,
    initialState,
  );

  if (state.status === "success") {
    const first = state.name.split(/\s+/)[0];
    return (
      <div className={styles.success} role="status">
        <span className={styles.successIcon}>
          <Check />
        </span>
        <h2>
          {first ? `You're on the list, ${first}.` : "You're on the list."}
        </h2>
        <p>
          We'll email you when private early access opens in early 2027. Until
          then, you can follow along as Runvey is built in the open.
        </p>
        <MatchousePromo />
        <Link className={styles.successLink} href="/">
          Back to home <ArrowRight />
        </Link>
      </div>
    );
  }

  const errors = state.status === "error" ? state.fieldErrors : undefined;
  const values = state.status === "error" ? state.values : undefined;

  return (
    <>
      <form className={styles.form} action={formAction} noValidate>
        <div className={styles.field}>
          <label htmlFor="wl-name">Name</label>
          <input
            id="wl-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Ada Lovelace"
            defaultValue={values?.name}
            maxLength={120}
            required
            aria-invalid={errors?.name ? true : undefined}
            aria-describedby={errors?.name ? "wl-name-error" : undefined}
          />
          {errors?.name && (
            <p className={styles.fieldError} id="wl-name-error">
              {errors.name}
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="wl-email">Email</label>
          <input
            id="wl-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            defaultValue={values?.email}
            maxLength={254}
            required
            aria-invalid={errors?.email ? true : undefined}
            aria-describedby={errors?.email ? "wl-email-error" : undefined}
          />
          {errors?.email && (
            <p className={styles.fieldError} id="wl-email-error">
              {errors.email}
            </p>
          )}
        </div>

        {/* Honeypot for bots; hidden from people and assistive tech. */}
        <div className={styles.honeypot} aria-hidden="true">
          <label htmlFor="wl-company">Company</label>
          <input
            id="wl-company"
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {state.status === "error" && !errors?.name && !errors?.email && (
          <p className={styles.fieldError} role="alert">
            {state.message}
          </p>
        )}

        <button className={styles.submit} type="submit" disabled={pending}>
          {pending ? (
            <>
              <LoaderCircle className={styles.spin} /> Joining…
            </>
          ) : (
            <>
              Get early access <ArrowRight />
            </>
          )}
        </button>

        <p className={styles.fine}>
          We'll only email you about Runvey's launch. No spam, unsubscribe
          anytime. See our <Link href="/privacy">privacy policy</Link>.
        </p>
      </form>
      <MatchousePromo compact />
    </>
  );
}
