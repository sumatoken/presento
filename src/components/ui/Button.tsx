import React from 'react'

interface Props {
    value: string
    variant: 'next' | 'back' | 'add' | 'delete'
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export default function Button({ value, variant, onClick }: Props) {
    let styles = "w-[75px] h-9 p-1 text-center text-white text-[16px] rounded font-normal ";

    switch (variant) {
        case "next":
            styles += "bg-[#3D5B59]";
            break;
        case "back":
            styles += "bg-[#B99095]";
            break;
        case "add":
            styles += "bg-[#66D37A]"; // green color for add
            break;
        case "delete":
            styles += "bg-[#D4273A]"; // red color for delete
            break;
    }

    return (
        <button className={styles} onClick={onClick}>
            {value}
        </button>
    );
}
