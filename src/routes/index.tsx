import { useRouter } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import SkillCard from '../components/SkillCard';
import { getPokemon } from "#/server/pokemon.ts";

export const Route = createFileRoute('/') ({ 
  component: App,
  pendingComponent: () => (
    <div>Loading...</div>
  ),
  pendingMs: 300,
  loader: async () => {
    const data = await getPokemon();

    return data;
  },
  errorComponent: ({ error }) => {
    const router = useRouter();

    return (
    <div className="p-14">
      <p>Oops! {error.message}</p>
      <button onClick={() => router.invalidate()}>
        Try Again
      </button>
    </div>
    )
  },
  notFoundComponent: () => {
    return <div className="p-14">Nothing found here!</div>
  }
});
    

function App() {
  const data = Route.useLoaderData();

  return (
    <main className="page-wrap px-4 py-8 pt 14">
      <h1>Welcome to TanStack Start</h1>

      <ul className="mt-6 list-none p-0 space-y-5">
        {data.results.map((pokemon: {name: string}) => (
          <li key={pokemon.name}>
            <SkillCard name={pokemon.name} />
          </li>
        ))}
      </ul>

      {/*<ul className="mt-6 list-none p-0 space-y-5">
        <li><SkillCard name="TanStack" /></li>
        <li><SkillCard name="React" /></li>
        <li><SkillCard name="TypeScript" /></li>
      </ul> */}
    </main>
  )
};
