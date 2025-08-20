import React from 'react'

const SvgButton = ({modal,setModal}) => {
  return (
    <svg
          className="svg"
          width="3rem"
          height="3rem"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={()=>setModal(!modal)}
        >
          <rect width="24" height="24" />
          <path
            d="M12 6V18"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6 12H18"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
  )
}

export default SvgButton