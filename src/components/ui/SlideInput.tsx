import React from 'react'

interface Props {
    description: string
}

export default function SlideInput({ description }: Props) {
    return (
        <div className="w-1/3 h-[255px] flex flex-col bg-[#E7D4C0] p-4 rounded">
            <span className="text-center text-stone-900 text-[12px] font-bold p-2">
                {description}
            </span>
            <textarea className="p-2.5 w-full h-[200px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 " placeholder="Write meta-data here..." />
        </div>
    )
}
