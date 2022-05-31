import React from 'react'

const ArrowIcon = ({onClick, id}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" 
    id={id}
    onClick={onClick} 
    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  )
}

export default ArrowIcon