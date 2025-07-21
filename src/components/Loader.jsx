import React from 'react'

const Loader = (props) => {
    return (
        <div className='flex flex-col items-center justify-center gap-3'>
            <div className='w-14 h-14 rounded-full border-l-2 border-l-blue-700 border-r-2 border-r-blue-700 border-t-2 border-t-blue-700 border-b-2 border-b-transparent animate-spin'></div>
            <div className='animate-pulse'>{props.children}</div>
        </div>
    )
}

export default Loader