"use client";

import { useState, FormEvent } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const subjects = [
  "General Inquiry",
  "Android App Development",
  "Web Development Project",
  "AI Solution",
  "Business Software",
  "Partnership Opportunity",
  "Support Request",
  "Other",
];

export default function ContactForm() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.subject) newErrors.subject = "Please select a subject.";
    if (!formData.message.trim()) {
      newErrors.message = "Message is required.";
    } else if (formData.message.trim().length < 20) {
      newErrors.message = "Message must be at least 20 characters.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setFormState("submitting");
    // Simulate async submission (replace with real API call / Formspree / etc.)
    await new Promise((res) => setTimeout(res, 1500));
    setFormState("success");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const inputClass = (field: keyof FormData) =>
    `w-full px-4 py-3 rounded-xl border text-slate-800 bg-white text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-colors duration-200 ${
      errors[field]
        ? "border-red-400 bg-red-50/30"
        : "border-slate-200 hover:border-slate-300"
    }`;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 lg:p-10">
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Send Us a Message</h2>
      <p className="text-slate-500 text-sm mb-8">
        Fill in the form below and we&apos;ll respond as soon as possible.
      </p>

      {formState === "success" ? (
        <div id="contact-success" className="flex flex-col items-center text-center py-10" role="status" aria-live="polite">
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-5">
            <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M21 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s9 4.477 9 10z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Message Sent!</h3>
          <p className="text-slate-500 mb-6 max-w-sm">
            Thank you for reaching out. We&apos;ve received your message and will
            be in touch shortly.
          </p>
          <button
            id="contact-send-another"
            onClick={() => setFormState("idle")}
            className="px-6 py-2.5 rounded-full border border-slate-300 text-slate-600 text-sm font-medium hover:border-blue-400 hover:text-blue-700 transition-colors duration-200"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            {/* Name */}
            <div>
              <label htmlFor="contact-name" className="block text-sm font-medium text-slate-700 mb-1.5">
                Full Name <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                autoComplete="name"
                suppressHydrationWarning
                placeholder="Your full name"
                value={formData.name}
                onChange={handleChange}
                className={inputClass("name")}
                aria-required="true"
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <p id="name-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1" role="alert">
                  <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="contact-email" className="block text-sm font-medium text-slate-700 mb-1.5">
                Email Address <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                autoComplete="email"
                suppressHydrationWarning
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className={inputClass("email")}
                aria-required="true"
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p id="email-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1" role="alert">
                  <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          {/* Subject */}
          <div className="mb-5">
            <label htmlFor="contact-subject" className="block text-sm font-medium text-slate-700 mb-1.5">
              Subject <span className="text-red-500" aria-hidden="true">*</span>
            </label>
            <div className="relative">
              <select
                id="contact-subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={`${inputClass("subject")} appearance-none pr-10 cursor-pointer`}
                aria-required="true"
                aria-describedby={errors.subject ? "subject-error" : undefined}
              >
                <option value="">Select a subject…</option>
                {subjects.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {errors.subject && (
              <p id="subject-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1" role="alert">
                <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.subject}
              </p>
            )}
          </div>

          {/* Message */}
          <div className="mb-7">
            <label htmlFor="contact-message" className="block text-sm font-medium text-slate-700 mb-1.5">
              Message <span className="text-red-500" aria-hidden="true">*</span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              suppressHydrationWarning
              placeholder="Tell us about your project, question, or how we can help…"
              value={formData.message}
              onChange={handleChange}
              className={`${inputClass("message")} resize-none`}
              aria-required="true"
              aria-describedby={errors.message ? "message-error" : undefined}
            />
            <div className="flex items-start justify-between mt-1.5">
              {errors.message ? (
                <p id="message-error" className="text-xs text-red-600 flex items-center gap-1" role="alert">
                  <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.message}
                </p>
              ) : (
                <span />
              )}
              <span className="text-xs text-slate-400 ml-auto">
                {formData.message.length} chars
              </span>
            </div>
          </div>

          {/* Submit */}
          <button
            id="contact-submit"
            type="submit"
            disabled={formState === "submitting"}
            className="w-full flex items-center justify-center gap-2 py-4 px-8 rounded-xl bg-blue-800 hover:bg-blue-700 disabled:bg-blue-800/60 text-white font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 disabled:translate-y-0 disabled:cursor-not-allowed"
            aria-busy={formState === "submitting"}
          >
            {formState === "submitting" ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Sending…
              </>
            ) : (
              <>
                Send Message
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </>
            )}
          </button>

          <p className="text-xs text-slate-400 text-center mt-4">
            By submitting this form, you agree to our{" "}
            <a href="/privacy-policy" className="underline hover:text-slate-600 transition-colors">Privacy Policy</a>.
          </p>
        </form>
      )}
    </div>
  );
}
