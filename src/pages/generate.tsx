import Nav from "@/components/nav";
import Button from "@/components/ui/Button";
import SlideInputGroup from "@/components/ui/SlideInputGroup";
import { trpc } from "@/utils/trpc";
import { useState } from "react";

export default function GeneratePage() {
    const latex = trpc.latex.generatePDF.useMutation()
    const [numberOfSlides, setNumberOfSlides] = useState(3) // because counting starts at 0
    const [inputs, setInputs] = useState<{
        context: string,
        prompt: string,
    }[]>([])
    const [[slide, direction], setSlide] = useState([0, 0])
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>, index: number) => {
        const { value } = e.target;
        const name = e.target.name as "context" | "prompt";

        setInputs((prevInputs) => {
            const newInputs = [...(prevInputs)];
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
    const goToNextSlide = () => {
        if (slide + 1 > numberOfSlides) {
            return;
        }
        setSlide([slide + 1, 1])
    }
    const goToPreviousSlide = () => {
        if (slide <= 0) {
            return;
        }
        setSlide([slide - 1, -1])
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
            <SlideInputGroup key={slide} index={slide} value={inputs[slide] || { context: "", prompt: "" }} handleChange={handleChange} />

            <div className="p-4 flex flex-row gap-12 justify-center items-center  ">
                <Button value="Back" variant="back" onClick={goToPreviousSlide} />
                <Button value="Next" variant="next" onClick={goToNextSlide} />
            </div>
        </div>
    );
}