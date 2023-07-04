import SlideInput from "./slideInput";

interface Props {
	index: number;
	value: {
		context: string;
		prompt: string;
	};
	handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>, index: number) => void;
}

export default function SlideInputGroup({ index, value, handleChange }: Props) {

	const firstInputDescription = index === 0 ? "This section should include meta-data (Title, author, institution...)" : "Include the context of the slide here.";
	const secondInputDescription = index === 0 ? "This section should include the overall subject being discussed in the presentation." : "Include any custom GPT prompts here.";

	return (
		<div className="w-full p-4 flex flex-row justify-around items-center">
			<SlideInput
				description={firstInputDescription}
				index={index}
				name="context"
				value={value?.context}
				onChange={e => handleChange(e, index)}
			/>
			<SlideInput
				description={secondInputDescription}
				index={index}
				name="prompt"
				value={value?.prompt}
				onChange={e => handleChange(e, index)}
			/>
		</div>
	)
};
