import React from 'react'
import imgRead from '../assets/img_read.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'

const Kelas = () => {
    return (
        <div className='w-full'>
            <div className='flex w-full items-center border-slate-200 border px-5 gap-4 font-medium z-30 shadow-md border-b-2 border-t-0 py-2 text-sm'>
                <div className='hover:bg-slate-100 py-2 px-2 h-full cursor-pointer'>
                    Forum
                </div>
                <div className='hover:bg-slate-100 py-2 px-2 h-full cursor-pointer'>
                    Tugas kelas
                </div>
                <div className='hover:bg-slate-100 py-2 px-2 h-full cursor-pointer'>
                    Orang
                </div>
                <div className='hover:bg-slate-100 py-2 px-2 h-full cursor-pointer'>
                    Nilai
                </div>
            </div>

            {/* Content Kelas */}
            <div className='flex flex-col justify-center items-center py-6'>
                <div className='relative'>
                    <img src={imgRead} alt="background" className='rounded-md' />
                    <p className='text-gray-200 text-3xl absolute bottom-5 left-4'>Contoh Kelas</p>
                </div>
                <div className='flex mt-6 gap-2'>
                    <div className='flex flex-col gap-4'>
                        <div className="card w-48 h-26 bg-base-100 border-2">
                            <div className="card-body p-4">
                                <div className='flex justify-between'>
                                  <span className="card-title text-sm leading-none">Kode kelas</span>
                                    <FontAwesomeIcon icon={faEllipsisVertical} tabIndex={0} role="button" className="text-black text-base" />
                                </div>
                                <span className='font-medium text-xl leading-none'>x2ob43m</span>
                            </div>
                        </div>
                        <div className="card w-56 h-26 bg-base-100 border-2">
                            <div className="card-body p-4">
                                  <span className="card-title text-base leading-none">Mendatang</span>
                                <span className='text-gray-400 py-3 text-sm'>Tidak ada tugas yang perlu segera diselesaikan</span>
                                <div className='card-actions justify-end'>
                                  <button className='btn btn-sm btn-ghost'>Lihat semua</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Kelas