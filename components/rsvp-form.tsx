"use client";

import { FormEvent, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  Loader2,
  SendHorizonal,
  TriangleAlert
} from "lucide-react";

type AttendanceStatus = "Attending" | "Not Attending";

type FormState = {
  fullName: string;
  contactNumber: string;
  guests: string;
  attendanceStatus: AttendanceStatus;
  message: string;
};

const initialState: FormState = {
  fullName: "",
  contactNumber: "",
  guests: "1",
  attendanceStatus: "Attending",
  message: ""
};

function normalizeSriLankanPhone(value: string) {
  const cleaned = value.replace(/[^\d+]/g, "");

  if (/^\+947\d{8}$/.test(cleaned)) {
    return cleaned;
  }

  if (/^947\d{8}$/.test(cleaned)) {
    return `+${cleaned}`;
  }

  if (/^07\d{8}$/.test(cleaned)) {
    return `+94${cleaned.slice(1)}`;
  }

  return cleaned;
}

function isValidSriLankanPhone(value: string) {
  return /^\+947\d{8}$/.test(value) || /^07\d{8}$/.test(value);
}

export function RSVPForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({
    type: null,
    message: ""
  });

  const isValid = useMemo(() => {
    return (
      form.fullName.trim().length > 1 &&
      form.contactNumber.trim().length > 0 &&
      Number(form.guests) >= 0
    );
  }, [form]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFeedback({ type: null, message: "" });

    if (!isValid) {
      setFeedback({
        type: "error",
        message: "Please complete all required fields before submitting."
      });
      return;
    }

    if (!isValidSriLankanPhone(form.contactNumber)) {
      setFeedback({
        type: "error",
        message:
          "Contact number must be in the format 0713099406 or +94713099406."
      });
      return;
    }

    const normalizedContactNumber = normalizeSriLankanPhone(form.contactNumber);

    setLoading(true);

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fullName: form.fullName.trim(),
          contactNumber: normalizedContactNumber,
          guests: Number(form.guests),
          attendanceStatus: form.attendanceStatus,
          message: form.message.trim()
        })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Submission failed.");
      }

      setFeedback({
        type: "success",
        message: "Thank you for your RSVP. We’re so excited to celebrate with you."
      });
      setForm(initialState);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong while submitting your RSVP.";

      setFeedback({
        type: "error",
        message
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="card-luxury gradient-ring mx-auto max-w-3xl space-y-5 p-6 sm:p-8 md:p-10"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label
            htmlFor="fullName"
            className="mb-2 block text-sm font-medium text-ink"
          >
            Full Name <span className="text-rose">*</span>
          </label>
          <input
            id="fullName"
            name="fullName"
            value={form.fullName}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, fullName: e.target.value }))
            }
            required
            className="w-full rounded-2xl border border-gold/15 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-gold"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label
            htmlFor="contactNumber"
            className="mb-2 block text-sm font-medium text-ink"
          >
            Contact Number <span className="text-rose">*</span>
          </label>

          <input
            id="contactNumber"
            name="contactNumber"
            type="tel"
            inputMode="numeric"
            value={form.contactNumber}
            onChange={(e) => {
              let value = e.target.value.replace(/[^\d+]/g, "");

              if (value.includes("+")) {
                if (!value.startsWith("+")) {
                  value = value.replace(/\+/g, "");
                } else {
                  value = "+" + value.slice(1).replace(/\+/g, "");
                }
              }

              if (value.startsWith("+")) {
                value = value.slice(0, 12);
              } else {
                value = value.slice(0, 10);
              }

              setForm((prev) => ({
                ...prev,
                contactNumber: value
              }));
            }}
            required
            className="w-full rounded-2xl border border-gold/15 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-gold"
            placeholder="0711234567 or +94711234567"
          />

          <p className="mt-1 text-xs text-muted">
            Accepted: 0711234567 or +94711234567
          </p>
        </div>

        <div>
          <label
            htmlFor="guests"
            className="mb-2 block text-sm font-medium text-ink"
          >
            Number of Guests <span className="text-rose">*</span>
          </label>
          <input
            id="guests"
            name="guests"
            type="number"
            min="0"
            value={form.guests}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, guests: e.target.value }))
            }
            required
            className="w-full rounded-2xl border border-gold/15 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-gold"
          />
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="attendanceStatus"
            className="mb-2 block text-sm font-medium text-ink"
          >
            Attendance Status <span className="text-rose">*</span>
          </label>
          <select
            id="attendanceStatus"
            name="attendanceStatus"
            value={form.attendanceStatus}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                attendanceStatus: e.target.value as AttendanceStatus
              }))
            }
            className="w-full rounded-2xl border border-gold/15 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-gold"
          >
            <option value="Attending">Attending</option>
            <option value="Not Attending">Not Attending</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="message"
            className="mb-2 block text-sm font-medium text-ink"
          >
            Message or Wishes
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={form.message}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, message: e.target.value }))
            }
            className="w-full rounded-2xl border border-gold/15 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-gold"
            placeholder="Share your blessings and wishes..."
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 animate-spin" size={16} />
            Sending RSVP...
          </>
        ) : (
          <>
            <SendHorizonal className="mr-2" size={16} />
            Submit RSVP
          </>
        )}
      </button>

      <AnimatePresence mode="wait">
        {feedback.type ? (
          <motion.div
            key={feedback.type}
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            className={`rounded-2xl p-4 text-sm ${
              feedback.type === "success"
                ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border border-rose-200 bg-rose-50 text-rose-700"
            }`}
          >
            <div className="flex items-start gap-3">
              {feedback.type === "success" ? (
                <CheckCircle2 className="mt-0.5" size={18} />
              ) : (
                <TriangleAlert className="mt-0.5" size={18} />
              )}
              <span>{feedback.message}</span>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </form>
  );
}