import Nav from "@/components/nav";
import Button from "@/components/ui/Button";
import SlideInput from "@/components/ui/slideInput";
import { trpc } from "@/utils/trpc";
import { useState } from "react";
import { late } from "zod";

export default function GeneratePage() {
    const latex = trpc.latex.generatePDF.useMutation()
    const [inputs, setInputs] = useState<{
        context: string,
        prompt: string,
    }[]>([])
    const [numberOfSlides, setNumberOfSlides] = useState(3)
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>, index: number) => {
        const { value } = e.target;
        const name = e.target.name as "context" | "prompt";

        setInputs((prevInputs) => {
            const newInputs = [...(prevInputs || [])];
            if (!newInputs[index]) {
                newInputs[index] = { context: "", prompt: "" };
            }
            newInputs[index][name] = value;
            return newInputs;
        });
        console.log(inputs);
    }
    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        //latex.mutate({ slides: inputs })
        console.log(inputs)
    }

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
            {
                [...Array(numberOfSlides)].map((_, index) =>
                    <div className="w-full p-4 flex flex-row justify-around items-center" key={index}>
                        <SlideInput description="This section should include meta-data (Title, author, institution...)"
                            name="context"
                            value={inputs[index]?.context}
                            onChange={e => handleChange(e, index)} />
                        <SlideInput description="This section should include the overall subject being discussed in the presentation."
                            name="prompt"
                            value={inputs[index]?.prompt}
                            onChange={e => handleChange(e, index)} />
                    </div>
                )
            }
            <div className="p-4 flex flex-row gap-12 justify-center items-center  ">
                <Button value="Back" variant="back" />
                <Button value="Next" variant="next" onClick={e => handleSubmit(e)} />
            </div>
        </div>
    );
}