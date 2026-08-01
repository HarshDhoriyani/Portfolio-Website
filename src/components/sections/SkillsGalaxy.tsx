"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const skillCategories = [
  {
    name: "Languages",
    radius: 100,
    speed: 20,
    skills: ["TypeScript", "Python", "Java", "C++"],
    color: "#00E5FF"
  },
  {
    name: "Frontend",
    radius: 170,
    speed: 25,
    skills: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
    color: "#3b82f6" // blue-500
  },
  {
    name: "Backend & Cloud",
    radius: 240,
    speed: 30,
    skills: ["Node.js", "Spring Boot", "AWS", "Docker", "PostgreSQL"],
    color: "#8b5cf6" // violet-500
  },
  {
    name: "AI & ML",
    radius: 310,
    speed: 35,
    skills: ["PyTorch", "TensorFlow", "Scikit-Learn", "LLMs"],
    color: "#ec4899" // pink-500
  }
];

export function SkillsGalaxy() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <section id="skills" className="relative py-32 overflow-hidden min-h-[900px] flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-noise mix-blend-overlay opacity-30 pointer-events-none" />
      
      <div className="text-center relative z-20 mb-20 px-4">
        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-white tracking-tight">
          Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-blue-500">Arsenal</span>.
        </h2>
        <p className="text-lg text-white/60 max-w-xl mx-auto">
          An orbital ecosystem of my skills, revolving around core engineering principles.
        </p>
      </div>

      <div className="relative w-full max-w-[800px] h-[720px] flex items-center justify-center scale-75 md:scale-100">
        {/* Core */}
        <div className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-[#00E5FF] to-blue-600 blur-[20px] opacity-50 animate-pulse" />
        <div className="absolute w-16 h-16 rounded-full glass border border-white/20 flex items-center justify-center z-10 shadow-[0_0_30px_#00E5FF]">
          <span className="font-heading font-bold text-white text-xl">HD</span>
        </div>

        {/* Orbits */}
        {skillCategories.map((category, i) => (
          <div key={category.name} className="absolute flex items-center justify-center">
            {/* Ring */}
            <div 
              className="absolute rounded-full border border-white/5"
              style={{
                width: category.radius * 2,
                height: category.radius * 2,
              }}
            />
            
            {/* Orbiting Container */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: category.speed,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute"
              style={{
                width: category.radius * 2,
                height: category.radius * 2,
              }}
            >
              {category.skills.map((skill, index) => {
                const angle = (index / category.skills.length) * 360;
                return (
                  <div
                    key={skill}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{
                      transform: `rotate(${angle}deg) translateX(${category.radius}px) rotate(-${angle}deg)`,
                    }}
                  >
                    <motion.div 
                      className="glass px-4 py-2 rounded-full border whitespace-nowrap flex items-center gap-2 group hover:bg-white/10 transition-colors"
                      style={{ borderColor: `${category.color}40` }}
                      animate={{ rotate: -360 }}
                      transition={{
                        duration: category.speed,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <div className="w-2 h-2 rounded-full shadow-[0_0_10px_currentColor]" style={{ backgroundColor: category.color }} />
                      <span className="text-sm font-medium text-white group-hover:text-white transition-colors">{skill}</span>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
