"use client";

// Contact — layout khớp bản gốc:
// contact-grid: 1fr / 1.5fr
// Cột trái (glass-card): Contact Information + contact-item (icon + label + link) + green-dot status
// Cột phải (glass-card form): inputs dark style, focus border tím, btn-primary gradient

import { useActionState, useRef, useEffect, useState } from "react";
import { FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { sendContactEmail } from "@/app/actions/contact";
import { personal } from "@/data/personal";
import ScrollAnimation from "@/components/ui/ScrollAnimation";
import type { ContactFormState } from "@/types";

const initialState: ContactFormState = { status: "idle" };

function Spinner() {
  return (
    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

// Style dùng chung cho label
const labelStyle: React.CSSProperties = {
  display: "block",
  color: "var(--text-primary)",
  fontSize: "0.875rem",
  fontWeight: 500,
  marginBottom: "0.4rem",
};

// Style dùng chung cho input/textarea — khớp hoàn toàn bản gốc
const inputStyle = (hasError: boolean): React.CSSProperties => ({
  width: "100%",
  padding: "0.75rem 1rem",
  backgroundColor: "var(--bg-dark)",
  border: `1px solid ${hasError ? "#f87171" : "var(--border-color)"}`,
  borderRadius: "0.5rem",
  color: "var(--text-primary)",
  fontFamily: "inherit",
  fontSize: "0.9rem",
  transition: "border-color 0.3s, box-shadow 0.3s",
  outline: "none",
  background: "var(--bg-dark)",
});

export default function Contact() {
  const [state, formAction, isPending] = useActionState(sendContactEmail, initialState);
  const [showToast, setShowToast] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success" || (state.status === "error" && state.message && !state.errors)) {
      if (state.status === "success") {
        formRef.current?.reset();
      }
      const showTimer = setTimeout(() => setShowToast(true), 0);
      const hideTimer = setTimeout(() => setShowToast(false), 5000);
      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [state.timestamp, state.status, state.message, state.errors]);

  return (
    <>
      {/* ── Top-Center Animated Toast Notification — outside section to avoid stacking context ── */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -40, x: "-50%", scale: 0.9 }}
            animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
            exit={{ opacity: 0, y: -30, x: "-50%", scale: 0.9 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`toast-notification ${state.status === "error" ? "toast-error" : ""}`}
          >
            <span className="toast-icon">
              {state.status === "error" ? "⚠️" : "✓"}
            </span>
            <span>
              {state.message ?? "Thank you for your message! Your message has been received."}
            </span>
            <button
              onClick={() => setShowToast(false)}
              aria-label="Close notification"
              className="toast-close-btn"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <section id="contact" className="content-section">

      <div className="container">

        {/* Section header */}
        <div className="section-header animate-on-scroll">
          <div className="section-badge">Let&apos;s work together</div>
          <h2 className="section-title">Get In Touch</h2>
          <div className="title-underline" />
        </div>

        {/* Contact grid: 1fr / 1.5fr */}
        <div className="contact-grid">
          {/* Cột trái: Contact Information */}
          <ScrollAnimation direction="left">
            <div className="glass-card" style={{ padding: "1.5rem" }}>
              <h3 style={{ color: "var(--text-primary)", marginBottom: "1.5rem", fontSize: "1.2rem", fontWeight: 600 }}>
                Contact Information
              </h3>

              {/* Email */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", marginBottom: "1.5rem" }}>
                <span style={{ background: "linear-gradient(135deg, var(--accent-purple), var(--accent-blue))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginTop: 2, flexShrink: 0, fontSize: "1.25rem", display: "inline-flex" }}>
                  <FaEnvelope />
                </span>
                <div>
                  <span style={{ display: "block", color: "var(--text-secondary)", fontSize: "0.875rem" }}>Email</span>
                  <a
                    href={`mailto:${personal.email}`}
                    style={{ color: "var(--text-primary)", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-blue)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                  >
                    {personal.email}
                  </a>
                </div>
              </div>

              {/* LinkedIn */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", marginBottom: "1.5rem" }}>
                <span style={{ background: "linear-gradient(135deg, var(--accent-purple), var(--accent-blue))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginTop: 2, flexShrink: 0, fontSize: "1.25rem", display: "inline-flex" }}>
                  <FaLinkedin />
                </span>
                <div>
                  <span style={{ display: "block", color: "var(--text-secondary)", fontSize: "0.875rem" }}>LinkedIn</span>
                  <a
                    href={personal.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--text-primary)", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-blue)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                  >
                    {personal.linkedin.replace("https://", "")}
                  </a>
                </div>
              </div>

              {/* GitHub */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", marginBottom: "1.5rem" }}>
                <span style={{ background: "linear-gradient(135deg, var(--accent-purple), var(--accent-blue))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginTop: 2, flexShrink: 0, fontSize: "1.25rem", display: "inline-flex" }}>
                  <FaGithub />
                </span>
                <div>
                  <span style={{ display: "block", color: "var(--text-secondary)", fontSize: "0.875rem" }}>GitHub</span>
                  <a
                    href={personal.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--text-primary)", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-blue)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                  >
                    {personal.github.replace("https://", "")}
                  </a>
                </div>
              </div>

              {/* Current Status */}
              <h3 style={{ color: "var(--text-primary)", marginTop: "2rem", marginBottom: "0.75rem", fontSize: "1.1rem", fontWeight: 600 }}>
                Current Status
              </h3>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.9rem", color: "var(--text-primary)" }}>
                <span className="green-dot" />
                Open for Web Developer Internship opportunities
              </div>
            </div>
          </ScrollAnimation>

          {/* Cột phải: Form */}
          <ScrollAnimation direction="right">
            <form ref={formRef} action={formAction} className="glass-card" style={{ padding: "1.5rem" }}>
              <h3 style={{ color: "var(--text-primary)", marginBottom: "1.5rem", fontSize: "1.2rem", fontWeight: 600 }}>
                Send Me a Message
              </h3>

              {/* Lỗi tổng quát */}
              {state.status === "error" && !state.errors && state.message && (
                <div role="alert" style={{ marginBottom: "1rem", padding: "0.75rem 1rem", borderRadius: "0.5rem", background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.3)", color: "#f87171", fontSize: "0.9rem" }}>
                  {state.message}
                </div>
              )}

              {/* Row 1: Name & Email on 1 row */}
              <div className="contact-form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                {/* Name */}
                <div>
                  <label htmlFor="name" style={labelStyle}>
                    Your Name <span style={{ color: "#f87171" }}>*</span>
                  </label>
                  <input
                    id="name" name="name" type="text" maxLength={100} required
                    placeholder="e.g. John Doe"
                    aria-required="true"
                    aria-describedby={state.errors?.name ? "name-error" : undefined}
                    aria-invalid={!!state.errors?.name}
                    style={inputStyle(!!state.errors?.name)}
                  />
                  {state.errors?.name && <p id="name-error" role="alert" style={{ marginTop: "0.25rem", fontSize: "0.8rem", color: "#f87171" }}>{state.errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" style={labelStyle}>
                    Your Email <span style={{ color: "#f87171" }}>*</span>
                  </label>
                  <input
                    id="email" name="email" type="email" required
                    placeholder="e.g. john@example.com"
                    aria-required="true"
                    aria-describedby={state.errors?.email ? "email-error" : undefined}
                    aria-invalid={!!state.errors?.email}
                    style={inputStyle(!!state.errors?.email)}
                  />
                  {state.errors?.email && <p id="email-error" role="alert" style={{ marginTop: "0.25rem", fontSize: "0.8rem", color: "#f87171" }}>{state.errors.email}</p>}
                </div>
              </div>

              {/* Subject */}
              <div style={{ marginBottom: "1rem" }}>
                <label htmlFor="subject" style={labelStyle}>
                  Subject <span style={{ color: "#f87171" }}>*</span>
                </label>
                <input
                  id="subject" name="subject" type="text" maxLength={200} required
                  placeholder="e.g. Project Inquiry"
                  aria-required="true"
                  aria-describedby={state.errors?.subject ? "subject-error" : undefined}
                  aria-invalid={!!state.errors?.subject}
                  style={inputStyle(!!state.errors?.subject)}
                />
                {state.errors?.subject && <p id="subject-error" role="alert" style={{ marginTop: "0.25rem", fontSize: "0.8rem", color: "#f87171" }}>{state.errors.subject}</p>}
              </div>

              {/* Message */}
              <div style={{ marginBottom: "1rem" }}>
                <label htmlFor="message" style={labelStyle}>
                  Your Message <span style={{ color: "#f87171" }}>*</span>
                </label>
                <textarea
                  id="message" name="message" rows={5} required
                  placeholder="Write your message here..."
                  aria-required="true"
                  aria-describedby={state.errors?.message ? "message-error" : undefined}
                  aria-invalid={!!state.errors?.message}
                  style={{ ...inputStyle(!!state.errors?.message), resize: "vertical" }}
                />
                {state.errors?.message && <p id="message-error" role="alert" style={{ marginTop: "0.25rem", fontSize: "0.8rem", color: "#f87171" }}>{state.errors.message}</p>}
              </div>

              {/* Submit — btn btn-primary full width */}
              <button
                type="submit"
                disabled={isPending}
                aria-disabled={isPending}
                className="btn btn-primary"
                style={{ width: "100%", justifyContent: "center", opacity: isPending ? 0.7 : 1, cursor: isPending ? "not-allowed" : "pointer" }}
              >
                {isPending ? (
                  <><Spinner /> Sending...</>
                ) : (
                  "Send Message ✉"
                )}
              </button>
            </form>
          </ScrollAnimation>
        </div>
      </div>
    </section>
    </>
  );
}
