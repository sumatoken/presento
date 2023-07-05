import React from 'react'
import { PlusCircleIcon, TrashIcon, ForwardIcon, BackwardIcon } from '@heroicons/react/24/outline';

interface Props {
    value: string
    variant: 'next' | 'back' | 'add' | 'delete'
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export default function Button({ value, variant, onClick }: Props) {
    let styles = "w-[80px] h-9 flex items-center justify-evenly p-1 text-center text-white text-[16px] rounded font-normal ";
    let icon;

    switch (variant) {
        case "next":
            styles += "bg-[#3D5B59]";
            icon = <ForwardIcon className="h-5 w-5 inline-block" />;
            break;
        case "back":
            styles += "bg-[#B99095]";
            icon = <BackwardIcon className="h-5 w-5 inline-block" />;
            return (
                <button className={styles} onClick={onClick}>
                    {icon}
                    {value}
                </button>
            );
        case "add":
            styles += "bg-[#66D37A]";
            icon = <PlusCircleIcon className="h-5 w-5 inline-block" />;
            break;
        case "delete":
            styles += "bg-[#D4273A]";
            icon = <TrashIcon className="h-5 w-5 inline-block" />;
            break;
    }

    return (
        <button className={styles} onClick={onClick}>
            {value}
            {icon}
        </button>
    );
}