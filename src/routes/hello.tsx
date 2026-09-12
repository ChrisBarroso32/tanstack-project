import {createFileRoute} from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/hello')({
    server: {
        handlers: {
            POST: async ({ request }) => {
                console.log('Someone hit our public API!');

                const body = await request.json();

                return Response.json({ message: `Hello ${body.name}`}, {
                    headers: {
                        "Cache-Control": "public, s-maxage=60",
                        "Access-Control-Allow-Origin": "*"
                    }
                });
            }
        }
    },
    component: HelloComponent,
});

function HelloComponent() {
    const [reply, setReply] = useState('');

    return (
        <main className="p-10">
            <button
            className="bg-blue-500 text-white p-2 rounded"
            onClick={() => {
                fetch('/hello', {
                    method: 'POST',
                    headers: {'Content-Type': 'applicaction/json'},
                    body: JSON.stringify({ name: 'TanStacker' }),
                })
                .then((res) => res.json())
                .then((data) => setReply(data.message))
            }}
        >
            Say Hello {reply && `- ${reply}`}
            </button>
        </main>
    )
};
