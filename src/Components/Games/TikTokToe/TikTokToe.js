import React, { Component } from 'react'
import x_img from '../../../images/x.png'
import o_img from '../../../images/o.png'
import UserForm from '../../User/UserForm'
import Container from './Container'
import Detail from './Detail'
import {
  ONLINE_USERS, AVAIABLE_USERS, NEW_USER, OPPONENT_LEFT,
  CHECK_OPPONENT, OPPONENT_MATCHED, ON_MOVE,
  GAME_HISTORY, MOVE_TOKEN, GAME_WINNER
} from '../../../SocketEvents'


class TikTokToe extends Component{
  constructor(props){
    super(props)
    this.state = {
      sender: {
        uuid: '',
        socket_id: '',
        username: '',
        logo: x_img,
      },
      loggedIn: false,
      opponent: '',
      gameHistory: [],
      moves: [],
      gamePass: false,

      onlineUsers: 0,
    }
    this.socket = null
  }

  setter = (key, value)=>{
    const sender = {
      ...this.state.sender,
      [key]: value
    }
    this.setState({
      sender: sender
    })
  }

  componentDidMount(){
    this.setSender()
    if(this.socket){
      this.socket.on('ONLINE_USERS', (data)=>{
        this.setState({
          onlineUsers: data
        })
      })
      this.socket.on('AVAIABLE_USERS', (data)=>{

      })
      this.socket.on('OPPONENT_LEFT', (data)=>{

      })
      this.socket.on('OPPONENT_MATCHED', (data)=>{

      })
      this.socket.on('GAME_HISTORY', (data)=>{

      })
      this.socket.on('MOVE_TOKEN', (data)=>{

      })
      this.socket.on('GAME_WINNER', (data)=>{

      })
    }
  }

  checkOpponent = ()=>{
    this.socket.emit(CHECK_OPPONENT, (data)=>{

    })
  }

  generateUUID = ()=>{
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (let i = 0; i < 6; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }

  setSender = ()=>{
    const { socket, socket_id } = this.props
    this.socket = socket
    const uuid = this.generateUUID()
    this.setter("socket_id", socket_id)
    this.setter("uuid", uuid)
  }

  setUser = (username)=>{
    this.setter("username", username)
    this.socket.emit(NEW_USER, this.state.sender, (data)=>{
      if(data){
        this.setState({
          loggedIn: true
        })
      }
    })
  }

  setOpponent = (opponent)=>{
    if(opponent){
      this.setState({
        opponent: {
          ...opponent,
          logo: o_img
        }
      })
    }
  }

  setGameHistory = (data)=>{
    this.setState({
      gameHistory: data.gameHistory,
      moves: data.moves
    })
  }

  setMove = (squreId, user)=>{
    this.setState({
      moves: [...this.state.moves, squreId],
    })
    this.socket.emit(ON_MOVE, (data)=>{

    })
  }

  render(){
    return(
      <div className="row">
        {!this.state.loggedIn?
          <div className="col-lg-4">
            <UserForm
              setUser={ this.setUser }
            />
          </div>
        :
          <React.Fragment>
            <div className="col-lg-4">
              <Container
                setMove={ this.setMove }
                sender={ this.state.sender }
                moves={ this.state.moves }
                gamePass={ this.state.gamePass }
              />
            </div>
            <div className="col-lg-4">
              <Detail
                gameHistory={ this.state.gameHistory }
              />
            </div>
          </React.Fragment>
        }
      </div>
    )
  }
}
export default TikTokToe
