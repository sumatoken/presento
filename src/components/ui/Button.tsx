import { type } from 'os'
import React from 'react'

interface Props {
    value: string
    variant: 'next' | 'back'
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export default function Button({ value, variant, onClick }: Props) {
    const styles = variant === "next" ? "w-[75px] h-9 p-1 bg-[#3D5B59] text-center text-white text-[16px rounded font-normal" : "w-[75px] h-9 p-1 bg-[#B99095] text-center text-white text-[16px rounded font-normal"
    return (
        <button className={styles} onClick={onClick}>
            {value}
        </button>)
}
