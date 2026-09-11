import { createFileRoute } from "@tanstack/react-router";
import SkillCard from '../components/SkillCard';

export const Route = createFileRoute('/') ({ component: App });

function App() {
  return (
    <main className="page-wrap px-4 py-8 pt 14">
      <h1>Welcome to TanStack Start</h1>

      <ul className="mt-6 list-none p-0 space-y-5">
        <li><SkillCard name="TanStack" /></li>
        <li><SkillCard name="React" /></li>
        <li><SkillCard name="TypeScript" /></li>
      </ul>
    </main>
  )
};
