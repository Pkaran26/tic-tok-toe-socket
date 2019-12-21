import React, { useState, useEffect } from 'react'
import x_img from '../../../images/x.png'
import o_img from '../../../images/o.png'

const Squre = ({ returnFunc, user, squreId, moves, gamePass })=>{
  const [clicked, setClicked] = useState(false)
  const [logo, setLogo] = useState('')
  useEffect(()=>{
    if(moves && moves.includes(squreId) && !clicked){
      setClicked(true)
      setLogo(o_img)
    }
  }, [moves])

  const addMove = ()=>{
    if(gamePass){
      returnFunc(squreId, user)
      setClicked(true)
      setLogo(x_img)
    }
  }

  return(
    <td>
      <button disabled={ clicked } className="squre btn btn-info" onClick={addMove}>
        {clicked?
          <img src={logo} alt={squreId} />
        :null}
      </button>
    </td>
  )
}
export default Squre
