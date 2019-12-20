import React, { Component } from 'react';
import socketIOClient from 'socket.io-client'
import './App.css';
import TikTokToe from './Components/Games/TikTokToe/TikTokToe'
import { CONNECTION, DISCONNECT } from './SocketEvents'

class App extends Component {
  constructor(){
    super()
    this.state = {
      socket_id: ''
    }
    this.socket = null
  }

  componentDidMount(){
    this.socket = socketIOClient('http://localhost:3005');
    this.socket.on(CONNECTION, ()=>{
      this.setState({
        socket_id: this.socket.id
      })
    })



    this.socket.on(DISCONNECT, ()=>{
      this.setState({
        socket_id: ''
      })
    })
  }

  render(){
    return (
      <div className="App">
        {this.state.socket_id?
          <TikTokToe
            socket={this.socket}
            socket_id={this.state.socket_id}
          />
        :null}
      </div>
    );
  }
}

export default App;
