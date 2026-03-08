"use client";

import React, { useState } from "react";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconLetterK,
} from "@tabler/icons-react";
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
      className="relative w-full min-h-screen flex items-center justify-center p-6 md:p-8 font-sans"
      style={{ background: "#F9E7C9" }}
    >
      <div
        className="w-full max-w-[900px] rounded-xl overflow-hidden border-2 border-[#2a2a2a]"
        style={{
          background: "#F9E7C9",
          boxShadow: "6px 6px 0px #1a1a1a, 0 20px 60px rgba(0,0,0,0.15)",
        }}
      >
        {/* Title Bar */}
        <div
          className="border-b-2 border-[#2a2a2a] px-4 py-2.5 flex items-center gap-3"
          style={{ background: "#F9E7C9" }}
        >
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#2a2a2a] border border-[#1a1a1a]" />
            <div className="w-3 h-3 rounded-full bg-[#2a2a2a] border border-[#1a1a1a]" />
            <div className="w-3 h-3 rounded-full bg-[#2a2a2a] border border-[#1a1a1a]" />
          </div>
          <span
            className="flex-1 text-center text-[12px] font-bold tracking-widest uppercase"
            style={{ color: "#280B0B" }}
          >
            We Must Discuss
          </span>
        </div>

        <div className="flex flex-col md:flex-row" style={{ minHeight: "520px" }}>
          {/* Sidebar — contact buttons */}
          <div
            className="w-full md:w-[240px] border-b md:border-b-0 md:border-r-2 border-[#2a2a2a] flex flex-col"
            style={{ background: "#F9E7C9" }}
          >
            <div className="flex-1 overflow-y-auto py-3 px-3 no-visible-scrollbar flex flex-col gap-2">
              <span
                className="text-[10px] font-bold tracking-widest uppercase pb-1"
                style={{ color: "#6A0610" }}
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
                      background: "#F9E7C9",
                      boxShadow: "2px 2px 0 #1a1a1a",
                      color: "#280B0B",
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
              style={{ background: "#F9E7C9" }}
            >
              <form onSubmit={handleSubmit} className="space-y-3 w-full">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-[10px] font-bold tracking-widest uppercase mb-1"
                    style={{ color: "#6A0610" }}
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
                      background: "#F9E7C9",
                      color: "#280B0B",
                      boxShadow: "2px 2px 0 #1a1a1a",
                    }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-[10px] font-bold tracking-widest uppercase mb-1"
                    style={{ color: "#6A0610" }}
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
                      background: "#F9E7C9",
                      color: "#280B0B",
                      boxShadow: "2px 2px 0 #1a1a1a",
                    }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-[10px] font-bold tracking-widest uppercase mb-1"
                    style={{ color: "#6A0610" }}
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
                      background: "#F9E7C9",
                      color: "#280B0B",
                      boxShadow: "2px 2px 0 #1a1a1a",
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 text-[11px] font-bold font-sans rounded-sm border-2 border-[#1a1a1a] transition-colors hover:opacity-90"
                  style={{
                    background: "#280B0B",
                    color: "#F9E7C9",
                    boxShadow: "2px 2px 0 #1a1a1a",
                  }}
                >
                  Send email
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
