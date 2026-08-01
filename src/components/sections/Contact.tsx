"use client";

import { motion } from "framer-motion";
import { Send, Code, Users, Mail, FileText } from "lucide-react";
import { useState } from "react";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData(e.target as HTMLFormElement);
    // Replace with your Web3Forms access key or use environment variables
    formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "YOUR_ACCESS_KEY_HERE");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus("sent");
        (e.target as HTMLFormElement).reset();
      } else {
        console.error("Error", data);
        setStatus("idle");
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setStatus("idle");
      alert("Something went wrong! Please try again.");
    }
  };

  return (
    <section id="contact" className="py-32 px-6 max-w-4xl mx-auto relative">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-white">
          Let's <span className="text-[#00E5FF]">Talk</span>.
        </h2>
        <p className="text-lg text-white/60">
          Have an exciting project or want to collaborate? Get in touch.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-8"
        >
          <div className="glass p-8 rounded-2xl border border-white/10">
            <h3 className="text-xl font-bold text-white mb-6">Contact Details</h3>
            <div className="flex flex-col gap-4">
              <a href="mailto:harshdhoriyani03@gmail.com" className="flex items-center gap-3 text-white/70 hover:text-[#00E5FF] transition-colors group">
                <div className="p-3 rounded-full bg-white/5 group-hover:bg-[#00E5FF]/10 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <span>harshdhoriyani03@gmail.com</span>
              </a>
              <a href="https://www.linkedin.com/in/harshdhoriyani/" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-white/70 hover:text-[#00E5FF] transition-colors group">
                <div className="p-3 rounded-full bg-white/5 group-hover:bg-[#00E5FF]/10 transition-colors">
                  <Users className="w-5 h-5" />
                </div>
                <span>LinkedIn</span>
              </a>
              <a href="https://github.com/HarshDhoriyani" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-white/70 hover:text-[#00E5FF] transition-colors group">
                <div className="p-3 rounded-full bg-white/5 group-hover:bg-[#00E5FF]/10 transition-colors">
                  <Code className="w-5 h-5" />
                </div>
                <span>GitHub</span>
              </a>
              <a href="https://drive.google.com/file/d/11sL6fDjQMVazLgnjEksT4W-YtRGr3fPg/view?usp=sharing" target="_blank" className="flex items-center gap-3 text-white/70 hover:text-[#00E5FF] transition-colors group">
                <div className="p-3 rounded-full bg-white/5 group-hover:bg-[#00E5FF]/10 transition-colors">
                  <FileText className="w-5 h-5" />
                </div>
                <span>Resume</span>
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm text-white/70">Name</label>
              <input 
                suppressHydrationWarning
                required
                type="text" 
                id="name" 
                name="name"
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#00E5FF] transition-colors"
                placeholder="John Doe"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm text-white/70">Email</label>
              <input 
                suppressHydrationWarning
                required
                type="email" 
                id="email" 
                name="email"
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#00E5FF] transition-colors"
                placeholder="john@example.com"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm text-white/70">Message</label>
              <textarea 
                suppressHydrationWarning
                required
                id="message" 
                name="message"
                rows={4}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#00E5FF] transition-colors resize-none"
                placeholder="Tell me about your project..."
              />
            </div>
            
            <button 
              suppressHydrationWarning
              disabled={status !== "idle"}
              className="mt-4 w-full bg-white text-black py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#00E5FF] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "idle" && (
                <>
                  <span>Send Message</span>
                  <Send className="w-4 h-4" />
                </>
              )}
              {status === "sending" && <span>Sending...</span>}
              {status === "sent" && <span>Message Sent!</span>}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
