import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({ title, style, path, submit = true }) => {
  return (
    <>
      {
        path ? <Link to={path}>
          <button
            type='submit'
            className={`bg-[#ff5e14b5] hover:bg-primary border-primary-2 px-3 py-2 text-light font-semibold ${style}`}
          >
            {title}
          </button>
        </Link> : (
          <button
            type={submit ? 'submit' : 'button'}
            className={`bg-[#ff5e14b5] hover:bg-primary border-primary-2 px-3 py-2 text-light font-semibold ${style}`}
          >
            {title}
          </button>
        )
      }

    </>
  )
}

export default React.memo(Button)
