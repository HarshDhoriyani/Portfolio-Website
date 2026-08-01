"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function AboutTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const timelineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  
  const milestones = [
    { 
      year: "Sept 2023 – Present", 
      title: "VIT Bhopal University", 
      desc: "B.Tech in Computer Science, Specialization in AI and ML\n• GPA: 8.98/10.0\n• Coursework: Data Structures and Algorithms, Computer Networks, Operating Systems, Database Management Systems, Natural Language Processing, Computer Vision, Deep Learning, Data Mining" 
    },
    { 
      year: "May 2022 - May 2023", 
      title: "SNBPs International School", 
      desc: "Higher Secondary Education\n• GPA: 8.45/10.0" 
    },
    { 
      year: "May 2020 - May 2021", 
      title: "SNBPs International School", 
      desc: "Secondary Education\n• GPA: 9.45/10.0" 
    },
  ];

  return (
    <section id="about" className="relative py-32 px-6 max-w-5xl mx-auto" ref={containerRef}>
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-20 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-white tracking-tight">
          My <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-blue-500">Education</span>.
        </h2>
        <p className="text-lg text-white/60 max-w-2xl mx-auto">
          A timeline of my academic background and educational milestones.
        </p>
      </motion.div>

      <div className="relative max-w-4xl mx-auto">
        {/* The Timeline Line */}
        <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 md:-translate-x-1/2 rounded-full overflow-hidden">
          <motion.div 
            className="w-full bg-gradient-to-b from-[#00E5FF] to-blue-600 shadow-[0_0_15px_#00E5FF]" 
            style={{ height: timelineHeight }}
          />
        </div>

        <div className="flex flex-col gap-12 md:gap-24">
          {milestones.map((item, i) => (
            <div key={i} className={`relative flex items-center w-full ${i % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"}`}>
              {/* Dot */}
              <div className="absolute left-[20px] md:left-1/2 w-4 h-4 rounded-full bg-[#050505] border-[3px] border-[#00E5FF] -translate-x-[7px] md:-translate-x-1/2 z-10 shadow-[0_0_10px_#00E5FF]" />

              {/* Empty space for alternating layout on desktop */}
              <div className="hidden md:block md:w-1/2" />

              {/* Content */}
              <div className="w-full pl-12 md:pl-0 md:w-1/2">
                <motion.div 
                  initial={{ opacity: 0, x: i % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                  className={`glass p-6 md:p-8 rounded-2xl border border-white/5 hover:border-[#00E5FF]/30 transition-colors group relative overflow-hidden ${i % 2 === 0 ? "md:ml-12" : "md:mr-12"}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="inline-block px-3 py-1 mb-4 text-xs font-mono text-[#00E5FF] bg-[#00E5FF]/10 rounded-full">{item.year}</span>
                  <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-white/60 leading-relaxed whitespace-pre-wrap">{item.desc}</p>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
