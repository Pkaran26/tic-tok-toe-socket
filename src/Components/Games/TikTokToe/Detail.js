import React from 'react'

const Detail = ({ gameHistory })=>{
  return(
    <div className="card bg-light">
      <div className="card-body">
        <ol>
          {gameHistory && gameHistory.length>0?
            gameHistory.map((e, i)=>(
              <li key={ i }>{ e }</li>
            ))
          :null}
        </ol>
      </div>
    </div>
  )
}
export default Detail
