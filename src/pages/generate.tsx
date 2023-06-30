import { trpc } from "@/utils/trpc";
import { useEffect } from "react";

async function fetchPDF(latex: string) {
    try {
        const response = await fetch("/api/latex", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                input: {
                    latex: latex,
                },
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const blob = await response.blob(); // process the response as a Blob, not as JSON
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'document.pdf'); // this will make it download automatically, remove if not needed
        document.body.appendChild(link);
        link.click();

    } catch (error) {
        console.error('Error fetching PDF:', error);
    }
}


export default function GeneratePage() {
    const latex = trpc.latex.generatePDF.useMutation()

    return (
        <div>

            <h1>Hello from generate</h1>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={
                () => {
                    latex.mutate({ slides: ["Hello baby", "Hello baby 2"] })
                }
            }>Generate PDF</button>
        </div>
    );
}