import { trpc } from '../utils/trpc';
async function fetchPDF(latex: string) {
    try {
        const response = await fetch('/api/latex', {
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

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        // Open the PDF in a new window
        window.open(url, '_blank');

    } catch (error) {
        console.error('Error fetching PDF:', error);
    }
}

export default function GeneratePage() {
    const hello = fetchPDF("Hello World");
    if (!hello) {
        return <div>Loading...</div>;
    }
    console.log(hello)
    return (
        <div>
            <h1>Hello from generate</h1>
        </div>
    );
}