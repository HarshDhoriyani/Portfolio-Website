"use client";

import { motion, Variants } from "framer-motion";
import { MapPin, Terminal, CircleDot, ArrowRight, Code, Download } from "lucide-react";

interface HeroProps {
  initialStats: {
    repos: number;
    followers: number;
    commits: number;
  }
}

export function Hero({ initialStats }: HeroProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 40, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 10 }
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      
      <div className="max-w-6xl w-full mx-auto px-6 z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <motion.div 
          className="lg:col-span-8 flex flex-col gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-white/10 text-xs font-medium font-mono text-[#00E5FF]">
              <CircleDot className="w-3 h-3 animate-pulse" />
              <span>Available for new opportunities</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass border border-white/10 text-xs font-medium text-white/70">
              <MapPin className="w-3 h-3" />
              <span>Pune, Maharashtra</span>
            </div>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tighter leading-[1.1] text-white"
          >
            I Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-blue-600">Intelligent</span><br />
            Software That<br />
            Solves Problems.
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-white/60 max-w-2xl font-sans"
          >
            Hi, I'm Harsh Dhoriyani. A Full Stack Developer & AI Engineer 
            crafting exceptional, high-performance digital experiences.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 mt-4">
            <button 
              suppressHydrationWarning 
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 rounded-full bg-white text-black font-semibold flex items-center gap-2 hover:scale-105 transition-transform"
            >
              View My Work
              <ArrowRight className="w-4 h-4" />
            </button>
            <a 
              href="https://drive.google.com/file/d/1zw4eEoPxeMwI2JHB1y0mesbvfZkducCx/view?usp=sharing"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-full glass text-[#00E5FF] font-semibold flex items-center gap-2 hover:bg-[#00E5FF]/10 transition-colors border border-[#00E5FF]/30 hover:scale-105"
            >
              <Download className="w-4 h-4" />
              Resume
            </a>
            <button 
              suppressHydrationWarning
              onClick={() => {
                window.dispatchEvent(new CustomEvent('open-terminal'));
              }}
              className="px-6 py-3 rounded-full glass text-white font-semibold flex items-center gap-2 hover:bg-white/10 transition-colors"
            >
              <Terminal className="w-4 h-4" />
              Interactive Terminal
            </button>
          </motion.div>
        </motion.div>

        <motion.div 
          className="lg:col-span-4 flex flex-col gap-4"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.6, type: "spring" }}
        >
          <div className="glass p-5 rounded-2xl border border-white/10 relative overflow-hidden group hover:border-[#00E5FF]/50 transition-colors">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-white" />
                <span className="font-semibold text-white">GitHub Stats</span>
              </div>
              <span className="text-xs text-white/50 font-mono">Real-time</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="text-2xl font-bold text-white">{initialStats.commits > 0 ? initialStats.commits : '1.2k+'}</div>
                <div className="text-xs text-white/50">Commits</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{initialStats.followers}</div>
                <div className="text-xs text-white/50">Followers</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{initialStats.repos}</div>
                <div className="text-xs text-white/50">Repositories</div>
              </div>
            </div>
          </div>

          <div className="glass p-5 rounded-2xl border border-white/10 relative group">
            <div className="flex items-center gap-2 mb-3 border-b border-white/10 pb-3">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
              <span className="text-xs text-white/40 ml-2 font-mono">system_status.rs</span>
            </div>
            <pre className="text-xs font-mono text-cyan-200">
              <code>
                <span className="text-pink-400">fn</span> <span className="text-green-300">initialize_core</span>() {'{'}
                <br />
                &nbsp;&nbsp;engine.start();
                <br />
                &nbsp;&nbsp;ui.render(<span className="text-yellow-300">"flawless"</span>);
                <br />
                {'}'}
              </code>
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
