import Nav from "@/components/nav";
import Button from "@/components/ui/Button";
import SlideInput from "@/components/ui/slideInput";
import { trpc } from "@/utils/trpc";

export default function GeneratePage() {
    const latex = trpc.latex.generatePDF.useMutation()

    return (
        <div>
            <Nav />
            <div className="w-full h-[175px] p-4 flex justify-center items-center bg-[#922815]">
                <span className="text-center text-orange-50 text-[32px] font-bold">
                    Effortlessly craft each slide of your presentation, and watch your ideas come to life!
                </span>
            </div>
            <div className="w-full p-4 flex justify-center items-center">
                <span className="text-center text-stone-700 text-[32px] font-bold">
                    Starting of with the context of the presentation:
                </span>
            </div>
            <div className="w-full p-4 flex flex-row justify-around items-center">
                <SlideInput description="This section should include meta-data (Title, author, institution...)" />
                <SlideInput description="This section should include the overall subject being discussed in the presentation. " />
            </div>
            <div className="flex flex-row justify-center items-center gap-12 p-4">
                <Button value="Back" variant="back" />
                <Button value="Next" variant="next" />
            </div>
        </div>
    );
}