import React, { useEffect, useState } from 'react'
import imgRead from '../assets/img_read.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical, faRetweet } from '@fortawesome/free-solid-svg-icons'
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Kelas = () => {
    const { id } = useParams()
    const [kelas, setKelas] = useState({});

    function getTokens() {
        return localStorage.getItem('token')
    }

    useEffect(() => {
        getDataKelasById()
    }, [])

    const getDataKelasById = async () => {
        try {
            const tokens = getTokens()
            const response = await axios.get(`http://localhost:8000/api/kelas/${id}`, {
                headers: {
                    'Authorization': `Bearer ${tokens}`
                }
            })
            setKelas(response.data.kelas);
        } catch (error) {
            if (error.response) {
                console.log(error.response.data.message);
            }
        }
    }

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
            {kelas && (
                <div className='flex flex-col justify-center items-center py-6'>
                    <div className='relative'>
                        <img src={imgRead} alt="background" className='rounded-md' />
                        <p className='text-gray-100 text-3xl absolute font-medium bottom-5 left-4'>{kelas.nama_kelas}</p>
                    </div>
                    <div className='flex mt-6 gap-8'>
                        <div className='flex flex-col gap-4'>
                            <div className="card w-48 h-26 bg-base-100 border-2">
                                <div className="card-body p-4">
                                    <div className='flex justify-between'>
                                        <span className="card-title text-sm leading-none">Kode kelas</span>
                                        <FontAwesomeIcon icon={faEllipsisVertical} tabIndex={0} role="button" className="text-black text-base" />
                                    </div>
                                    <span clasName='font-medium text-sm leading-none'>{kelas.kode_kelas}</span>
                                </div>
                            </div>
                            <div className="card w-48 h-26 bg-base-100 border-2">
                                <div className="card-body p-4">
                                    <span className="card-title text-base leading-none">Mendatang</span>
                                    <span className='text-gray-400 py-3 text-sm'>Tidak ada tugas yang perlu segera diselesaikan</span>
                                    <div className='card-actions justify-end'>
                                        <button className='btn btn-sm btn-ghost'>Lihat semua</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Left Content */}
                        <div className='flex flex-col items-center'>
                            <div className='bg-base-100 shadow-lg rounded-md w-[450px] h-16 flex justify-between px-5 items-center gap-5'>
                                <div className='flex items-center gap-3'>
                                    <div className="w-10 rounded-full">
                                        <img
                                            alt="Tailwind CSS Navbar component"
                                            src="https://static.vecteezy.com/system/resources/previews/036/280/651/original/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
                                        />
                                    </div>
                                    <div className='text-sm text-gray-400'>
                                        Umumkan sesuatu kepada kelas anda
                                    </div>
                                </div>
                                <div className='btn btn-ghost btn-circle'>
                                    <FontAwesomeIcon icon={faRetweet} className='text-base' />
                                </div>
                            </div>

                            {/* Bottom Content */}
                            <div className='flex flex-col pt-10'>
                                <div className='bg-base-100 card card-compact flex-col flex shadow-lg gap-3 w-auto h-auto min-h-40 min-w-[450px] border-2 rounded-lg py-3 px-3'>
                                    <div className='flex gap-2'>
                                        <div className="w-12 rounded-full">
                                            <img
                                                alt="Tailwind CSS Navbar component"
                                                src="https://static.vecteezy.com/system/resources/previews/036/280/651/original/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
                                            />
                                        </div>
                                        <div className='flex flex-col'>
                                            <p className='font-medium text-base'>Fardan Arbas</p>
                                            <span className='text-sm text-gray-400'>17 Mei</span>
                                        </div>
                                    </div>
                                    <div className='flex items-center pb-4 py-1'>
                                        <p className='text-base'>Tesss post nihh</p>
                                    </div>
                                    <div className='flex flex-col items-center card-actions mt-5'>
                                        <hr className='w-full' />
                                        <div className='flex items-center gap-5'>
                                            <div className='flex items-center gap-2'>
                                                <div className="w-11 rounded-full">
                                                    <img
                                                        alt="Tailwind CSS Navbar component"
                                                        src="https://static.vecteezy.com/system/resources/previews/036/280/651/original/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
                                                    />
                                                </div>
                                                <input type="text" 
                                                placeholder="Tambahkan komentar kelas.." 
                                                className="py-1 px-10 w-full text-sm outline-none border-2 focus:border-4 rounded-full" />
                                            </div>
                                            <FontAwesomeIcon icon={faPaperPlane}
                                             className='text-2xl text-gray-500 cursor-pointer' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Kelas