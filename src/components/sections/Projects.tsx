"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { MouseEvent, useState, useRef } from "react";
import { Code, ExternalLink } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { ProjectShape } from "@/components/3d/ProjectShape";

const projects = [
  {
    title: "CivicSpot",
    category: "Full Stack",
    desc: "A full-stack web application that enables citizens to report local issues and helps authorities track and resolve them efficiently.",
    tech: ["React", "Node.js", "MongoDB", "Express"],
    github: "https://github.com/HarshDhoriyani/CivicSpot",
    live: "https://civicspot.vercel.app/"
  },
  {
    title: "SpectraPi PCAM",
    category: "IoT / Hardware",
    desc: "PCAM Precision Steering - Inference-time geometric control for PCAM attractor landscapes using retrieval-aware and geometry-aware precision steering. Improve retrieval stability without retraining.",
    tech: ["Python", "Raspberry Pi", "OpenCV"],
    github: "https://github.com/HarshDhoriyani/SpectraPI"
  },
  {
    title: "Codebase Memory Engine",
    category: "AI / Developer Tools",
    desc: "An AI-powered engine designed to index, understand, and query entire codebases, acting as an intelligent memory assistant for developers.",
    tech: ["Python", "LLMs", "Vector DB", "FastAPI"],
    github: "https://github.com/HarshDhoriyani/Codebase-Memory-Engine"
  },
  {
    title: "Rail Mind",
    category: "AI / Predictive Systems",
    desc: "An intelligent railway tracking and predictive management system designed to optimize scheduling and reduce delays.",
    tech: ["Python", "Machine Learning", "React", "Node.js"],
    github: "https://github.com/HarshDhoriyani/rail-mind",
    live: "https://rail-mind-nine.vercel.app/"
  },
  {
    title: "Swasthya Mitra",
    category: "AI / Healthcare",
    desc: "An intelligent healthcare assistant leveraging LLMs to provide real-time diagnostic support.",
    tech: ["Next.js", "Python", "Transformers", "Tailwind"],
    github: "https://github.com/HarshDhoriyani/Swasthya-Mitra"
  },
  {
    title: "Task Master",
    category: "Full Stack",
    desc: "A comprehensive task management and productivity application built to help users organize daily workflows and collaborate efficiently.",
    tech: ["Next.js", "TypeScript", "TailwindCSS", "PostgreSQL"],
    github: "https://github.com/HarshDhoriyani/Task-Master"
  }
];

function ProjectCard({ project, yOffset }: { project: typeof projects[0], yOffset: any }) {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // For 3D Tilt Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // For Spotlight
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);

    // For Tilt
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;
    const xPct = mouseXPos / width - 0.5;
    const yPct = mouseYPos / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        y: yOffset
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className="group relative h-[450px] rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl flex flex-col justify-end"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <ProjectShape isHovered={isHovered} />
        </Canvas>
      </div>

      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100 z-10"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(0, 229, 255, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      
      {/* Content wrapper with Z-translation for 3D pop effect */}
      <div 
        className="relative z-20 flex flex-col gap-4 bg-black/40 backdrop-blur-md p-6 rounded-xl border border-white/5 transition-transform duration-300"
        style={{ transform: isHovered ? "translateZ(30px)" : "translateZ(0px)" }}
      >
        <span className="text-[#00E5FF] font-mono text-sm">{project.category}</span>
        <h3 className="text-2xl font-bold text-white flex items-center justify-between">
          {project.title}
        </h3>
        <p className="text-white/60 text-sm leading-relaxed">
          {project.desc}
        </p>
        <div className="flex flex-wrap gap-2 mt-2">
          {project.tech.map((t) => (
            <span key={t} className="px-2 py-1 rounded-md bg-white/10 text-xs text-white/80 font-medium">
              {t}
            </span>
          ))}
        </div>
        
        {/* Project Links */}
        <div className="flex items-center gap-4 mt-2">
          {project.github && (
            <a 
              href={project.github} 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
            >
              <Code className="w-4 h-4" />
              <span>Source</span>
            </a>
          )}
          {project.live && (
            <a 
              href={project.live} 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 text-sm text-[#00E5FF]/80 hover:text-[#00E5FF] transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -250]);

  return (
    <section id="projects" ref={containerRef} className="py-32 px-6 max-w-6xl mx-auto relative perspective-1000">
      <motion.div 
        className="text-center mb-20"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
      >
        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-white">
          Selected <span className="text-[#00E5FF]">Works</span>.
        </h2>
        <p className="text-lg text-white/60 max-w-2xl mx-auto">
          A showcase of my recent projects, featuring interactive 3D elements and micro-interactions.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {projects.map((p, i) => (
          <div key={i} className={i % 2 !== 0 ? "md:mt-24" : ""}>
             <ProjectCard project={p} yOffset={i % 2 !== 0 ? y2 : y1} />
          </div>
        ))}
      </div>
    </section>
  );
}
