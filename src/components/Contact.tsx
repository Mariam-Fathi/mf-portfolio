"use client";

import React, { useState } from "react";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
  IconLetterK,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";

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
    id: "email",
    label: "Direct message",
    caption: "Send an email",
    href: "#",
    icon: IconMail,
  },
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

const FolderIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0">
    <path
      d="M1 3.5a.5.5 0 01.5-.5H5l1.5 2H12.5a.5.5 0 01.5.5V11a.5.5 0 01-.5.5h-11A.5.5 0 011 11V3.5z"
      fill="currentColor"
    />
  </svg>
);

function ContactDirItem({
  channel,
  index,
  isSelected,
  onSelect,
}: {
  channel: ContactChannel;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const folderLabel = channel.id;
  return (
    <div
      className={cn(
        "flex items-center gap-1.5 px-2 py-0.5 cursor-pointer rounded-sm transition-all duration-100",
        isSelected ? "bg-[#1a1a1a] text-[#e8e0cc]" : "hover:bg-[#1a1a1a]/40",
      )}
      style={{ paddingLeft: "8px" }}
      onClick={onSelect}
    >
      <span className={isSelected ? "text-[#c8b97a]" : "text-[#8a7a5a]"}>
        <FolderIcon />
      </span>
      <span
        className={cn(
          "text-[11px] font-bold tracking-tight font-sans",
          isSelected ? "text-[#e8e0cc]" : "text-[#2a2a2a]",
        )}
      >
        {folderLabel}
      </span>
    </div>
  );
}

const Contact: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [name, setName] = useState("");
  const [replyTo, setReplyTo] = useState("");
  const [message, setMessage] = useState("");

  const channel = contactChannels[selectedIndex];
  const isEmail = channel?.id === "email";

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
          {/* Sidebar */}
          <div
            className="w-full md:w-[240px] border-b md:border-b-0 md:border-r-2 border-[#2a2a2a] flex flex-col"
            style={{ background: "#F9E7C9" }}
          >
            <div className="flex-1 overflow-y-auto py-2 no-visible-scrollbar">
              <div className="px-3 pb-1">
                <span
                  className="text-[10px] font-bold tracking-widest uppercase"
                  style={{ color: "#6A0610" }}
                >
                  Contacts
                </span>
              </div>
              {contactChannels.map((ch, i) => (
                <ContactDirItem
                  key={ch.id}
                  channel={ch}
                  index={i}
                  isSelected={selectedIndex === i}
                  onSelect={() => setSelectedIndex(i)}
                />
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col min-h-[400px]">
            {channel && (
              <>
                <div
                  className="border-b-2 border-[#2a2a2a] px-4 md:px-5 py-2.5 flex items-center justify-between flex-wrap gap-2"
                  style={{ background: "#F9E7C9" }}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[13px] font-bold tracking-tight"
                      style={{ color: "#280B0B" }}
                    >
                      # {channel.id}
                    </span>
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: "#6A0610" }}
                    />
                  </div>
                  <span className="text-[11px]" style={{ color: "#6A0610" }}>
                    {channel.caption}
                  </span>
                </div>

                <div
                  className="flex-1 overflow-y-auto px-4 md:px-5 py-4 no-visible-scrollbar"
                  style={{ background: "#F9E7C9" }}
                >
                  {isEmail ? (
                    <>
                 

                      <form onSubmit={handleSubmit} className="space-y-3 max-w-md">
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
                    </>
                  ) : (
                    <a
                      href={channel.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border rounded-sm px-2.5 py-1.5 cursor-pointer hover:opacity-90 transition-all duration-150 w-fit"
                      style={{
                        background: "#F9E7C9",
                        borderColor: "#6A0610",
                        boxShadow: "2px 2px 0 #6A0610",
                      }}
                    >
                      <span className="text-[10px] font-sans" style={{ color: "#280B0B" }}>
                        Open {channel.label}
                      </span>
                      <span style={{ color: "#6A0610" }}>↗</span>
                    </a>
                  )}
                </div>

                <div
                  className="border-t-2 border-[#2a2a2a] px-4 py-2.5"
                  style={{ background: "#F9E7C9" }}
                >
                  <span
                    className="text-[10px] font-sans"
                    style={{ color: "#8a7a5a" }}
                  >
                    {channel.label} — {channel.caption}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
