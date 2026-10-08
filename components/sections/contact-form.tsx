"use client";

import { useState } from "react";
import { CircleCheckBig, LoaderCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Dictionary } from "@/i18n/dictionaries/en";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type Status = "idle" | "sending" | "sent" | "error";

type FormDict = Dictionary["contact"]["form"];

const EMPTY: FormValues = { name: "", email: "", phone: "", message: "" };

function validate(
  values: FormValues,
  errorsCopy: FormDict["errors"],
): Partial<Record<keyof FormValues, string>> {
  const errors: Partial<Record<keyof FormValues, string>> = {};

  if (!values.name.trim()) {
    errors.name = errorsCopy.name;
  }

  if (!values.email.trim()) {
    errors.email = errorsCopy.emailRequired;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
    errors.email = errorsCopy.emailInvalid;
  }

  const phone = values.phone.trim();
  if (phone) {
    const digits = phone.replace(/\D/g, "");
    if (!/^[+\d\s().-]+$/.test(phone) || digits.length < 7 || digits.length > 15) {
      errors.phone = errorsCopy.phoneInvalid;
    }
  }

  if (!values.message.trim()) {
    errors.message = errorsCopy.messageRequired;
  } else if (values.message.trim().length < 10) {
    errors.message = errorsCopy.messageShort;
  }

  return errors;
}

export function ContactForm({ dict }: { dict: FormDict }) {
  const [values, setValues] = useState<FormValues>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [status, setStatus] = useState<Status>("idle");

  const update = (field: keyof FormValues) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;

    const nextErrors = validate(values, dict.errors);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      const firstInvalid = Object.keys(nextErrors)[0];
      document.getElementById(firstInvalid)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          company: new FormData(event.currentTarget).get("company") ?? "",
        }),
      });
      setStatus(response.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div
        role="status"
        className="glass flex h-full flex-col items-center justify-center rounded-3xl p-10 text-center"
      >
        <span className="grid size-14 place-items-center rounded-full bg-emerald-500/15 text-emerald-500">
          <CircleCheckBig aria-hidden="true" className="size-7" />
        </span>
        <h3 className="font-heading mt-5 text-xl font-semibold tracking-tight">
          {dict.successTitle}
        </h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
          {dict.successText}
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-6"
          onClick={() => {
            setValues(EMPTY);
            setErrors({});
            setStatus("idle");
          }}
        >
          {dict.sendAnother}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="glass relative rounded-3xl p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">{dict.name}</Label>
          <Input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder={dict.namePlaceholder}
            value={values.name}
            onChange={update("name")}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p id="name-error" className="text-xs font-medium text-destructive">
              {errors.name}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">{dict.email}</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder={dict.emailPlaceholder}
            dir="ltr"
            className="rtl:text-end"
            value={values.email}
            onChange={update("email")}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p id="email-error" className="text-xs font-medium text-destructive">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5 space-y-2">
        <Label htmlFor="phone">
          {dict.phone}{" "}
          <span className="font-normal text-muted-foreground">({dict.phoneOptional})</span>
        </Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          placeholder={dict.phonePlaceholder}
          dir="ltr"
          className="rtl:text-end"
          value={values.phone}
          onChange={update("phone")}
          aria-invalid={errors.phone ? true : undefined}
          aria-describedby={errors.phone ? "phone-error" : "phone-hint"}
        />
        {errors.phone ? (
          <p id="phone-error" className="text-xs font-medium text-destructive">
            {errors.phone}
          </p>
        ) : (
          <p id="phone-hint" className="text-xs text-muted-foreground">
            {dict.phoneHint}
          </p>
        )}
      </div>

      <div className="mt-5 space-y-2">
        <Label htmlFor="message">{dict.message}</Label>
        <Textarea
          id="message"
          name="message"
          rows={6}
          placeholder={dict.messagePlaceholder}
          value={values.message}
          onChange={update("message")}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p id="message-error" className="text-xs font-medium text-destructive">
            {errors.message}
          </p>
        )}
      </div>

      <div aria-hidden="true" className="absolute -start-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" && (
        <p role="alert" className="mt-5 text-sm font-medium text-destructive">
          {dict.sendError}
        </p>
      )}

      <div className="mt-6 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-end">
        <Button
          type="submit"
          size="lg"
          className="h-10 w-full px-5 sm:w-auto"
          disabled={status === "sending"}
        >
          {status === "sending" ? (
            <>
              <LoaderCircle aria-hidden="true" className="animate-spin" />
              {dict.sending}
            </>
          ) : (
            <>
              {dict.submit}
              <Send aria-hidden="true" className="rtl:-scale-x-100" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
