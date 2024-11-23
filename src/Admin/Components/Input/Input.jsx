import React from 'react'

const Input = () => {
  return (
    <>
      <input 
      type="text" 
      onChange={onchange}
      />
    </>
  )
}

export default React.memo(Input)
