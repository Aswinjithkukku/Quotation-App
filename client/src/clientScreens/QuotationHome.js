import React from 'react'
import { Link } from 'react-router-dom'

function QuotationHome() {
  return (
    <div className='flex justify-center items-center h-screen'>
        <div className='flex justify-center items-center w-1/3 h-1/3 border-2 border-purple-800  shadow-xl'>
            <a href="/transfer" target="_blank">
            <button className='py-10 px-20 bg-slate-700 text-white text-2xl font-bold shadow-xl hover:bg-slate-600'>quotation</button>
            </a>
            <Link to="/register">
            <button className='py-10 px-20 bg-slate-700 text-white text-2xl font-bold shadow-xl hover:bg-slate-600'>register</button>
            </Link>
            <Link to='/login'>
            <button className='py-10 px-20 bg-slate-700 text-white text-2xl font-bold shadow-xl hover:bg-slate-600'>login</button>
            </Link>
        </div>
    </div>
  )
}

export default QuotationHome