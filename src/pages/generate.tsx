import Nav from "@/components/nav";
import { trpc } from "@/utils/trpc";

export default function GeneratePage() {
    const latex = trpc.latex.generatePDF.useMutation()

    return (
        <div>
            <Nav />

        </div>
    );
}