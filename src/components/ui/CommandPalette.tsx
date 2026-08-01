"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { Search, Home, User, Briefcase, Mail, Terminal, Settings } from "lucide-react";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    
    const handleOpen = () => setOpen(true);

    document.addEventListener("keydown", down);
    window.addEventListener("open-command-palette", handleOpen as EventListener);
    return () => {
      document.removeEventListener("keydown", down);
      window.removeEventListener("open-command-palette", handleOpen as EventListener);
    };
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label="Global Command Menu"
        className="w-full max-w-xl bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95"
      >
        <div className="flex items-center border-b border-white/10 px-3">
          <Search className="w-5 h-5 text-white/50" />
          <Command.Input 
            autoFocus
            placeholder="Type a command or search..." 
            className="w-full bg-transparent border-none p-4 outline-none text-white placeholder:text-white/30 font-sans"
          />
        </div>

        <Command.List className="max-h-[300px] overflow-y-auto p-2">
          <Command.Empty className="p-4 text-center text-white/50 font-sans text-sm">No results found.</Command.Empty>

          <Command.Group heading="Navigation" className="text-white/50 text-xs px-2 py-2 font-sans">
            <Command.Item 
              value="home"
              onSelect={() => { 
                setOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 p-2 mt-1 rounded-md cursor-pointer text-white text-sm data-[selected=true]:bg-white/10 data-[selected=true]:text-cyan-400 transition-colors"
            >
              <Home className="w-4 h-4" /> Home
            </Command.Item>
            <Command.Item 
              value="about"
              onSelect={() => { 
                setOpen(false);
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-2 p-2 mt-1 rounded-md cursor-pointer text-white text-sm data-[selected=true]:bg-white/10 data-[selected=true]:text-cyan-400 transition-colors"
            >
              <User className="w-4 h-4" /> About
            </Command.Item>
            <Command.Item 
              value="skills"
              onSelect={() => { 
                setOpen(false);
                document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-2 p-2 mt-1 rounded-md cursor-pointer text-white text-sm data-[selected=true]:bg-white/10 data-[selected=true]:text-cyan-400 transition-colors"
            >
              <Briefcase className="w-4 h-4" /> Skills
            </Command.Item>
            <Command.Item 
              value="projects"
              onSelect={() => { 
                setOpen(false);
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-2 p-2 mt-1 rounded-md cursor-pointer text-white text-sm data-[selected=true]:bg-white/10 data-[selected=true]:text-cyan-400 transition-colors"
            >
              <Briefcase className="w-4 h-4" /> Projects
            </Command.Item>
            <Command.Item 
              value="contact"
              onSelect={() => { 
                setOpen(false);
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-2 p-2 mt-1 rounded-md cursor-pointer text-white text-sm data-[selected=true]:bg-white/10 data-[selected=true]:text-cyan-400 transition-colors"
            >
              <Mail className="w-4 h-4" /> Contact
            </Command.Item>
          </Command.Group>
          
          <Command.Group heading="Actions" className="text-white/50 text-xs px-2 py-2 font-sans">
            <Command.Item 
              value="toggle theme"
              onSelect={() => { /* Toggle Theme logic */ setOpen(false); }}
              className="flex items-center gap-2 p-2 mt-1 rounded-md cursor-pointer text-white text-sm data-[selected=true]:bg-white/10 data-[selected=true]:text-cyan-400 transition-colors"
            >
              <Settings className="w-4 h-4" /> Toggle Theme
            </Command.Item>
            <Command.Item 
              value="open terminal"
              onSelect={() => { /* Open Terminal */ setOpen(false); window.dispatchEvent(new CustomEvent('open-terminal')); }}
              className="flex items-center gap-2 p-2 mt-1 rounded-md cursor-pointer text-white text-sm data-[selected=true]:bg-white/10 data-[selected=true]:text-cyan-400 transition-colors"
            >
              <Terminal className="w-4 h-4" /> Open Terminal
            </Command.Item>
          </Command.Group>
        </Command.List>
      </Command.Dialog>
    </div>
  );
}
