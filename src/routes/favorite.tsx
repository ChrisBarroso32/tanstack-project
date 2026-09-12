import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useServerFn} from '@tanstack/react-start'
import { saveFavoritePokemon } from '#/server/pokemon.ts'

export const Route = createFileRoute('/favorite')({
    component: FavoritePage,
})

function FavoritePage() {
    const [name, setName] = useState('');
    const [status, setStatus] = useState('');

    const savePokemon = useServerFn(saveFavoritePokemon);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setStatus('Saving...');

        await savePokemon({data: name});
        setStatus(`Successfully saved! ${name}`);
        setName('');
    };

    return <main className="page-wrap px-4 py-8 pt 14">
        <h1>Save a Pokemon</h1>
        <form onSubmit={handleSubmit} className="mt-6 space-x-4">
            <input 
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="border p-2 rounded"
            placeholder="Enter Pokemon name"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Save Pokemon</button>
        </form>
        <p className="mt-4">{status}</p>
    </main>
};
