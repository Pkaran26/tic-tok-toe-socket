import React, { useState } from 'react'

const UserForm = ({ setUser })=>{
  const [username, setUsername] = useState('')

  const formSubmit = (e)=>{
    e.preventDefault()
    setUsername(username)
    setUser(username)
  }

  return(
    <div className="card bg-light">
      <div className="card-header">Login</div>
      <div className="card-body">
        <form onSubmit={ formSubmit }>
          <div className="form-group">
            <label>Username</label>
            <input type="text" className="form-control" value={ username } onChange={(e)=> setUsername(e.target.value)} />
          </div>
          <div className="form-group">
            <input type="submit" className="btn btn-primary" value="Submit" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserForm
