import React, { useEffect, useRef, useState } from 'react'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';

const Expandable = ({ title, children }) => {

    const contentRef = useRef(null);
    const [expanded, setExpanded] = useState(false);
    const [height, setHeight] = useState('0px')

    useEffect(() => {
        if(contentRef.current) {
            setHeight(expanded ? `${contentRef.current.scrollHeight}px` : '0px');
        }
    }, [expanded, children])
    
    return (
        <div className="border border-gray-300 rounded mb-4 overflow-hidden p-2 flex flex-col items-center justify-center">
            <button onClick={() => setExpanded(prev => !prev)} className='flex flex-row items-center justify-start'>
                {title}
                {expanded ? (
                    <BiChevronUp className="p-2 cursor-pointer" size='3em' />
                ) : (
                    <BiChevronDown className="p-2 cursor-pointer" size='3em' />
                )}
            </button>
            <div
                ref={contentRef}
                style={{
                maxHeight: height,
                transition: 'max-height 0.3s ease',
                }}
                className="overflow-hidden"
            >
                <div className="p-4 bg-white flex flex-col items-center justify-center gap-2">{children}</div>
            </div>
        </div>
    )
}

export default Expandable