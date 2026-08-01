"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { Search } from "lucide-react";

export function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      let current = "";
      
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop <= window.innerHeight / 3) {
          current = section.id;
        }
      });
      
      setActiveSection(current);
    };

    // Run once on mount to set initial state
    setTimeout(handleScroll, 100);

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 inset-x-0 z-40 flex justify-center pt-6 px-4"
    >
      <nav className="glass px-6 py-3 rounded-full flex items-center justify-between w-full max-w-5xl">
        <div className="flex items-center gap-2">
          <Link href="/" className="font-heading font-bold text-xl tracking-tighter text-white">
            HARSH<span className="text-[#00E5FF]">.</span>
          </Link>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="#about" className={`transition-colors ${activeSection === 'about' ? 'text-[#00E5FF]' : 'text-white/70 hover:text-white'}`}>About</Link>
          <Link href="#skills" className={`transition-colors ${activeSection === 'skills' ? 'text-[#00E5FF]' : 'text-white/70 hover:text-white'}`}>Skills</Link>
          <Link href="#projects" className={`transition-colors ${activeSection === 'projects' ? 'text-[#00E5FF]' : 'text-white/70 hover:text-white'}`}>Projects</Link>
        </div>

        <div className="flex items-center gap-4">

          <Link 
            href="#contact" 
            className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#00E5FF] transition-colors"
          >
            Contact
          </Link>
        </div>
      </nav>
    </motion.header>
  );
}
