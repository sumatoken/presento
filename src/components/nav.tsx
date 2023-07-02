import Link from 'next/link'
import React from 'react'

export default function Nav() {
    return (
        <div className="w-full h-[72px] bg-stone-900">
            <div className="h-full w-full flex flex-row justify-between items-center p-6">
                <div className="flex flex-row gap-10 pl-24">
                    <Link href="#" className='text-center text-red-400 text-[16px] font-normal'>Home</Link>
                    <Link href="/generate" className='text-center text-red-400 text-[16px] font-normal'>Create</Link>
                </div>
                <div className="flex flex-row">
                    <Link href="#" className="w-[75px] h-9 p-1 text-center text-red-400 text-[16px] font-normal bg-stone-700 rounded">
                        Log in
                    </Link>
                </div>
            </div>
        </div>
    )
}


{/* <div className="left-[189px] top-[27px] absolute text-center text-red-400 text-[16px] font-normal">Home</div>
            <div className="left-[323px] top-[27px] absolute text-center text-red-400 text-[16px] font-normal">Create</div>
            <div className="w-[75px] h-9 left-[1300px] top-[19px] absolute">
                <div className="w-[75px] h-9 left-0 top-0 absolute bg-stone-700 rounded" />
                <div className="left-[14px] top-[8px] absolute text-center text-red-400 text-[16px] font-normal">Log in</div>
            </div> */}