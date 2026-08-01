"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Terminal as TerminalIcon } from "lucide-react";

const KONAMI_CODE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a"
];

export function TerminalEasterEgg() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputSequence, setInputSequence] = useState<string[]>([]);
  const [history, setHistory] = useState<{ type: "user" | "system", text: string }[]>([
    { type: "system", text: "Welcome to HARSH_OS v1.0.0" },
    { type: "system", text: "Type 'help' for available commands." }
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen) return;
      
      const key = e.key;
      setInputSequence((prev) => {
        const newSequence = [...prev, key].slice(-10);
        if (newSequence.join(",") === KONAMI_CODE.join(",")) {
          setIsOpen(true);
          return [];
        }
        return newSequence;
      });
    };

    const handleOpen = () => setIsOpen(true);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-terminal", handleOpen as EventListener);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-terminal", handleOpen as EventListener);
    };
  }, [isOpen]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newHistory = [...history, { type: "user" as const, text: input }];
    
    const cmd = input.trim().toLowerCase();
    let response = "";
    if (cmd === "help") {
      response = "Available commands: help, about, skills, clear, exit";
    } else if (cmd === "about") {
      response = "Harsh Dhoriyani. Software Engineer, AI builder, problem solver.";
    } else if (cmd === "skills") {
      response = "React, Next.js, Python, PyTorch, Node.js, Spring Boot, etc.";
    } else if (cmd === "clear") {
      setHistory([]);
      setInput("");
      return;
    } else if (cmd === "exit") {
      setIsOpen(false);
      setInput("");
      return;
    } else {
      response = `Command not found: ${cmd}. Type 'help' for available commands.`;
    }

    setHistory([...newHistory, { type: "system", text: response }]);
    setInput("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-black/80 backdrop-blur-md"
        >
          <div className="w-full max-w-4xl h-[60vh] bg-black border border-[#00E5FF]/30 rounded-xl shadow-2xl flex flex-col overflow-hidden font-mono text-sm">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-2 text-white/50">
                <TerminalIcon className="w-4 h-4" />
                <span>root@harsh-portfolio:~</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/50 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto custom-scrollbar flex flex-col gap-2 text-[#00E5FF]">
              {history.map((msg, i) => (
                <div key={i} className={msg.type === "user" ? "text-white" : ""}>
                  {msg.type === "user" ? <span className="text-green-400 mr-2">➜</span> : null}
                  {msg.text}
                </div>
              ))}
              <div ref={endRef} />
            </div>

            <form onSubmit={handleSubmit} className="px-4 py-3 border-t border-white/10 flex items-center gap-2">
              <span className="text-green-400">➜</span>
              <input
                autoFocus
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-white font-mono"
                placeholder="Type a command..."
              />
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
