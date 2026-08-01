import { Hero } from "@/components/sections/Hero";
import { AboutTimeline } from "@/components/sections/AboutTimeline";
import { SkillsGalaxy } from "@/components/sections/SkillsGalaxy";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";

async function getGithubStats() {
  try {
    const userRes = await fetch("https://api.github.com/users/HarshDhoriyani", { next: { revalidate: 3600 } });
    const userData = await userRes.json();
    
    let commits = 0;
    try {
      const contribRes = await fetch("https://github-contributions-api.jogruber.de/v4/HarshDhoriyani", { next: { revalidate: 3600 } });
      const contribData = await contribRes.json();
      if (contribData?.total) {
        commits = Object.values(contribData.total).reduce((acc: number, val: any) => acc + (typeof val === 'number' ? val : 0), 0) as number;
      }
    } catch (e) {
      console.error("Failed to fetch GitHub contributions:", e);
    }

    return {
      repos: userData.public_repos || 0,
      followers: userData.followers || 0,
      commits: commits
    };
  } catch (error) {
    console.error("Failed to fetch Github stats:", error);
    return { repos: 0, followers: 0, commits: 0 };
  }
}

export default async function Home() {
  const stats = await getGithubStats();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between overflow-hidden">
      <Hero initialStats={stats} />
      <AboutTimeline />
      <SkillsGalaxy />
      <Projects />
      <Contact />
    </main>
  );
}
