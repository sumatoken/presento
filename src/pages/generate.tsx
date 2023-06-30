import { trpc } from "@/utils/trpc";

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