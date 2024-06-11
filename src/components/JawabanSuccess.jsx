import React from 'react'
import success from '../assets/success.svg'
import { Link } from 'react-router-dom'

const JawabanSuccess = () => {
  return (
    <div>
        <div className='flex flex-col justify-center items-center py-12'>
            <div className='bg-white border-2 rounded-md w-[500px] min-w-[500px] max-w-[750px] shadow-md py-5 px-10'>
              <h1 className='text-xl py-4 text-center font-bold'>Selamat kamu sudah berhasil menyelesaikan ujian</h1>
                <div className='justify-center items-center flex mt-10'>
                   <img src={success} alt="success img" className='w-36' />
                </div>
                <div className='pb-2 pt-12'>
                  <Link to={'/home'} className='btn w-full bg-black text-white hover:bg-black'>Kembali Beranda</Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default JawabanSuccess