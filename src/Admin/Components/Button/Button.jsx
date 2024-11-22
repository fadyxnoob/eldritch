import React from 'react'

const Button = ({ title, style }) => {
  return (
    <>
      <button
        type='submit'
        className={`bg-[#ff5e14b5] hover:bg-primary border-primary-2 px-3 py-2 text-light font-semibold ${style}`}
      >
        {title}
      </button>
    </>
  )
}

export default Button
