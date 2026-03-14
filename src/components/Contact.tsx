"use client";

import React, { useState, useEffect } from "react";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconLetterK,
} from "@tabler/icons-react";
import { COLORS } from "@/components/hero/constants";
const EMAIL = "mariam.f.siam@gmail.com";

type ContactChannel = {
  id: string;
  label: string;
  caption: string;
  href: string;
  icon: React.ComponentType<{ className?: string; stroke?: number }>;
};

const contactChannels: ContactChannel[] = [
  {
    id: "github",
    label: "GitHub",
    caption: "github.com/mariamfathi",
    href: "https://github.com/Mariam-Fathi",
    icon: IconBrandGithub,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    caption: "linkedin.com/in/mariamfathi",
    href: "https://www.linkedin.com/in/mariam-fathi-siam",
    icon: IconBrandLinkedin,
  },
  {
    id: "kaggle",
    label: "Kaggle",
    caption: "kaggle.com/mariamfathi",
    href: "https://www.kaggle.com/mariamfathiamin",
    icon: IconLetterK,
  },
];

const Contact: React.FC = () => {
  const [name, setName] = useState("");
  const [replyTo, setReplyTo] = useState("");
  const [message, setMessage] = useState("");
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // Format in visitor's locale and timezone (e.g. Italy → Europe/Rome, Italian format)
  const dateTimeFormatter = new Intl.DateTimeFormat(undefined, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = name ? `Contact from ${name}` : "Contact from portfolio";
    const body = [
      message || "(No message)",
      "",
      "---",
      replyTo ? `Reply to: ${replyTo}` : "",
      name ? `From: ${name}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  };

  return (
    <section
      id="contact"
      className="relative w-full h-full flex flex-col md:flex-row p-0 font-sans min-h-0"
      style={{ background: COLORS.heroBackground }}
    >
      {/* Sidebar + main (frame is in AppWindowLayout) */}
      <div className="flex flex-col md:flex-row flex-1 min-h-0 w-full" style={{ minHeight: "320px" }}>
          {/* Sidebar — contact buttons */}
          <div
            className="w-full md:w-[240px] border-b md:border-b-0 md:border-r-2 border-[#2a2a2a] flex flex-col"
            style={{ background: COLORS.heroBackground }}
          >
            <div className="flex-1 overflow-y-auto py-3 px-3 no-visible-scrollbar flex flex-col gap-2">
              <span
                className="text-[10px] font-bold tracking-widest uppercase pb-1"
                style={{ color: COLORS.accent }}
              >
                Contacts
              </span>
              {contactChannels.map((ch) => {
                const Icon = ch.icon;
                const isExternal = ch.id !== "email";
                const href = ch.id === "email" ? `mailto:${EMAIL}` : ch.href;
                return (
                  <a
                    key={ch.id}
                    href={href}
                    {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="inline-flex items-center gap-2 px-2.5 py-2 rounded-sm border-2 border-[#2a2a2a] transition-colors hover:opacity-90 w-full"
                    style={{
                      background: COLORS.heroBackground,
                      boxShadow: "2px 2px 0 #1a1a1a",
                      color: COLORS.primary,
                    }}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" stroke={2} />
                    <span className="text-[11px] font-sans font-bold">{ch.label}</span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Main Content — email form */}
          <div className="flex-1 flex flex-col min-h-[400px]">
            <div
              className="flex-1 overflow-y-auto px-4 md:px-5 py-4 no-visible-scrollbar"
              style={{ background: COLORS.heroBackground }}
            >
              <form onSubmit={handleSubmit} className="space-y-3 w-full">
                <div className="flex flex-row gap-4">
                  <div className="flex-1 min-w-0">
                    <label
                      htmlFor="contact-name"
                      className="block text-[10px] font-bold tracking-widest uppercase mb-1"
                      style={{ color: COLORS.accent }}
                    >
                      Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="w-full px-3 py-2 text-[12px] font-sans rounded-sm border-2 border-[#2a2a2a] outline-none focus:ring-0"
                      style={{
                        background: COLORS.heroBackground,
                        color: COLORS.primary,
                        boxShadow: "2px 2px 0 #1a1a1a",
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <label
                      htmlFor="contact-email"
                      className="block text-[10px] font-bold tracking-widest uppercase mb-1"
                      style={{ color: COLORS.accent }}
                    >
                      Your email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={replyTo}
                      onChange={(e) => setReplyTo(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full px-3 py-2 text-[12px] font-sans rounded-sm border-2 border-[#2a2a2a] outline-none focus:ring-0"
                      style={{
                        background: COLORS.heroBackground,
                        color: COLORS.primary,
                        boxShadow: "2px 2px 0 #1a1a1a",
                      }}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-[10px] font-bold tracking-widest uppercase mb-1"
                    style={{ color: COLORS.accent }}
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Your message..."
                    rows={5}
                    className="w-full px-3 py-2 text-[12px] font-sans rounded-sm border-2 border-[#2a2a2a] outline-none focus:ring-0 resize-y min-h-[100px]"
                    style={{
                      background: COLORS.heroBackground,
                      color: COLORS.primary,
                      boxShadow: "2px 2px 0 #1a1a1a",
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 text-[11px] font-bold font-sans rounded-sm border-2 border-[#1a1a1a] transition-colors hover:opacity-90"
                  style={{
                    background: COLORS.primary,
                    color: COLORS.heroBackground,
                    boxShadow: "2px 2px 0 #1a1a1a",
                  }}
                >
                  Send email
                </button>
              </form>
            </div>

            {/* Footer — current date & time */}
            <div
              className="border-t-2 border-[#2a2a2a] px-4 md:px-5 py-2.5 min-h-[40px] flex items-center justify-end"
              style={{ background: COLORS.heroBackground }}
            >
              <span className="text-[10px] font-sans tabular-nums" style={{ color: "#8a7a5a" }}>
                {dateTimeFormatter.format(now)}
              </span>
            </div>
          </div>
        </div>
    </section>
  );
};

export default Contact;
