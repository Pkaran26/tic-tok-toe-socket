import React, { useState, useEffect } from 'react'
import x_img from '../../../images/x.png'
import o_img from '../../../images/o.png'
import { NEW_USER, ONLINE_USERS, ON_MOVE, GAME_HISTORY, UNLOCK, OPPONENT, LOGGEDIN } from '../../../SocketEvents'

import Squre from './Squre'

const tabs = [
  { tabNumber: 0 },
  { tabNumber: 1 },
  { tabNumber: 2 },
  { tabNumber: 3 },
  { tabNumber: 4 },
  { tabNumber: 5 },
  { tabNumber: 6 },
  { tabNumber: 7 },
  { tabNumber: 8 },
]


const TikTokToe = ({ socket })=>{
  const [sender, setSender] = useState({
    socket_id: '',
    username: '',
    logo: x_img,
    history: []
  })
  const [receiver, setReceiver] = useState('')
  const [gameHistory, setGameHistory] = useState([])
  const [moves, setMoves] = useState([])
  const [gamePass, setGamePass] = useState(true)

  useEffect(()=>{
    if(socket){
      socket.on(OPPONENT, (user)=>{
        if(user.opponent && !receiver){
          let temp = user.opponent
          setReceiver({
            ...temp,
            logo: o_img
          })
        }
      })

      socket.on(GAME_HISTORY, (data)=>{
        console.log(data);
        setGameHistory(data.gameHistory)
        setMoves(data.moves)
        console.log(data.gamePass, sender.username, data.gamePass === sender.username);
        setGamePass(data.gamePass === sender.username? true : false)
      })

      if(sender && sender.username){
        socket.on('ONLINE_USERS', (users)=>{
          socket.emit('CHECK_OPPONENT', sender)
        })
      }
    }
  }, [socket, sender])

  const addUser = (e)=>{
    e.preventDefault()
    socket.emit(NEW_USER, sender)
    socket.emit(LOGGEDIN, sender)
  }

  const setValue = (squreId, user)=>{
    if(gamePass){
      setGamePass(false)
      if(!moves.includes(squreId)){
        socket.emit(ON_MOVE, {
          user,
          move: squreId,
          receiver,
          history: `${ user.username } is click ${ squreId + 1 }`
        }, (data)=>{

        })
        setSender({
          ...sender,
          history: [...sender.history, squreId]
        })
      }
    }
  }

  return(
    <div>
      <form onSubmit={addUser}>
        <div className="form-group">
          <label>Username</label>
          <input type="text" className="from-control" value={sender.username} onChange={(e)=> setSender({
              ...sender,
              socket_id: socket.id,
              username: e.target.value
            })} />
        </div>
        <div className="form-group"></div>
      </form>
      {receiver && receiver.username? receiver.username : ''}
      {sender && sender.username && receiver && receiver.username?
        <table className="table-bordered">
        <tbody>
          <tr>
            <Squre
              returnFunc={setValue}
              squreId={tabs[0].tabNumber}
              user={sender}
              moves={moves}
              gamePass={gamePass}
            />
            <Squre
              returnFunc={setValue}
              squreId={tabs[1].tabNumber}
              user={sender}
              moves={moves}
              gamePass={gamePass}
            />
            <Squre
              returnFunc={setValue}
              squreId={tabs[2].tabNumber}
              user={sender}
              moves={moves}
              gamePass={gamePass}
            />
          </tr>
          <tr>
            <Squre
              returnFunc={setValue}
              squreId={tabs[3].tabNumber}
              user={sender}
              moves={moves}
              gamePass={gamePass}
            />
            <Squre
              returnFunc={setValue}
              squreId={tabs[4].tabNumber}
              user={sender}
              moves={moves}
            />
            <Squre
              returnFunc={setValue}
              squreId={tabs[5].tabNumber}
              user={sender}
              moves={moves}
              gamePass={gamePass}
            />
          </tr>
          <tr>
            <Squre
              returnFunc={setValue}
              squreId={tabs[6].tabNumber}
              user={sender}
              moves={moves}
              gamePass={gamePass}
            />
            <Squre
              returnFunc={setValue}
              squreId={tabs[7].tabNumber}
              user={sender}
              moves={moves}
              gamePass={gamePass}
            />
            <Squre
              returnFunc={setValue}
              squreId={tabs[8].tabNumber}
              user={sender}
              moves={moves}
              gamePass={gamePass}
            />
          </tr>
        </tbody>
      </table>
      :null}
      <ol>
        {gameHistory && gameHistory.length>0?
          gameHistory.map((e, i)=>(
            <li key={ i }>{ e }</li>
          ))
        :null}
      </ol>
    </div>
  )
}
export default TikTokToe
