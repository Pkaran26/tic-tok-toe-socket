import React from 'react'

const Detail = ({ gameHistory: { history }, onlineUsers })=>{
  return(
    <div className="card bg-light">
      <div className="card-body">
        <p className="card-text">Online Users <span className="badge badge-pill badge-primary">{ onlineUsers }</span></p>
        <hr/>
        {history && history.length>0?
          <ol>
            {history.map((e, i)=>(
              <li key={ i }>
                <span className="text-primary">{ e.username }</span> clicked <span className="badge badge-pill badge-success">{ e.move }</span>
              </li>
            ))}
          </ol>
        :<p>No game history</p>}
      </div>
    </div>
  )
}
export default Detail
