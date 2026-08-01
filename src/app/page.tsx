import { Hero } from "@/components/sections/Hero";
import { AboutTimeline } from "@/components/sections/AboutTimeline";
import { SkillsGalaxy } from "@/components/sections/SkillsGalaxy";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between overflow-hidden">
      <Hero />
      <AboutTimeline />
      <SkillsGalaxy />
      <Projects />
      <Contact />
    </main>
  );
}
