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
        moves: [],
      },
      loggedIn: false,
      gameId: '',
      opponent: '',
      gameHistory: [],
      moves: [],
      gamePass: false,
      onlineUsers: 0,
      userLeft: '',
      winner: ''
    }
    this.socket = null
  }

  setter = (key, value)=>{
    this.setState({
      sender: {
        ...this.state.sender,
        [key]: value
      }
    })
  }

  componentDidMount(){
    this.setSender()
    if(this.socket){
      this.socket.on(ONLINE_USERS, (data)=>{
        this.setState({
          onlineUsers: data
        })
      })
      this.socket.on(AVAIABLE_USERS, (data)=>{

      })
      this.socket.on(OPPONENT_LEFT, (data)=>{
        console.log(data.message);
        this.setState({
          userLeft: data.message,
          opponent: '',
          winner: ''
        })
      })
      this.socket.on(OPPONENT_MATCHED, (data)=>{
        if(data && data.status && !this.state.opponent){
          this.setOpponent(data.opponent, data.gameId)
        }
      })
      this.socket.on(GAME_HISTORY, (data)=>{
        this.setState({
          gameHistory: data.gameHistory,
          moves: data.moves
        })
      })
      this.socket.on(MOVE_TOKEN, (data)=>{
        this.setState({
          gamePass: data.moveToken
        })
      })
      this.socket.on(GAME_WINNER, (data)=>{
        console.log(data);
        if(data && data.reset){
          this.setState({
            winner: data,
            gameId: '',
            opponent: '',
            gamePass: false,
            onlineUsers: 0,
            userLeft: ''
          })
          setTimeout(()=>{
            this.setState({
              gameHistory: [],
              moves: [],
            })
            console.log('matching started');
            this.checkOpponent()
          }, 2000);
        }
      })
    }
  }

  checkOpponent = ()=>{
    this.socket.emit(CHECK_OPPONENT, this.state.sender, (data)=>{
      if(data && data.status && !this.state.opponent){
        this.setOpponent(data.opponent, data.gameId)
        this.setState({
          gamePass: true,
          userLeft: '',
          winner: ''
        })
      }else {
        if(!this.state.gamePass && !this.state.opponent){
          this.checkOpponent()
        }
      }
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
    this.setState({
      sender: {
        ...this.state.sender,
        uuid: uuid,
        socket_id: socket_id
      }
    })
  }

  setUser = (username)=>{
    this.setter("username", username)
    const sender = {
      ...this.state.sender,
      username: username
    }
    this.socket.emit(NEW_USER, sender, (data)=>{
      if(data){
        this.setState({
          loggedIn: true
        })
        this.checkOpponent()
      }
    })
  }

  setOpponent = (opponent, gameId)=>{
    if(opponent){
      this.setState({
        gameId: gameId,
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
      gamePass: false
    })
    const payload = {
      your: this.state.sender,
      opponent: this.state.opponent,
      move: squreId,
      gameId: this.state.gameId
    }
    this.socket.emit(ON_MOVE, payload, (data)=>{

    })
  }

  render(){
    return(
      <React.Fragment>
        {this.props.socket_id?
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
                    opponent={ this.state.opponent }
                    gamePass={ this.state.gamePass }
                    gameHistory={ this.state.gameHistory }
                    userLeft={ this.state.userLeft }
                    winner={ this.state.winner }
                  />
                </div>
                <div className="col-lg-4">
                  <Detail
                    gameHistory={ this.state.gameHistory }
                    onlineUsers={ this.state.onlineUsers }
                  />
                </div>
              </React.Fragment>
            }
          </div>
        :null}
      </React.Fragment>

    )
  }
}
export default TikTokToe
