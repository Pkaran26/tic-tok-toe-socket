const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const cors = require('cors');
const moment = require('moment');

app.use(cors());
app.use(express.static('public'))

availableUsers = [];
connections = [];
busyUsers = [];

// user: {
//   uuid: '',
//   username: '',
//   socket_id: '',
//   yourMoves: []
// }
//
// [
//   {
//     player1: user1,
//     player2: user2,
//     gameHistory: {
//       history: [],
//       moves: []
//     },
//     moveToken: player1.uuid
//   }
// ]

server.listen(process.env.PORT || 3005);
console.log('running...');

io.sockets.on('connection', function(socket){
  connections.push(socket);
  console.log('Connected: ', connections.length);

  //disconnected
  socket.on('disconnect', function(data){
    const index = connections.indexOf(socket);
    userLeft(socket.id);
    availableUsers.splice(index, 1);
    connections.splice(index, 1);
    updateUsers();
    console.log('Connected: ', connections.length);
  });

  socket.on('NEW_USER', function(user){
    console.log(user);
    socket.username = user.username;
    availableUsers.push(user)
    updateUsers();
  });

  function userLeft(socket_id){
    const user = returnUser(socket_id)
    if(user && user.length>0){
      if(socket_id == user[0].player1.socket_id){
        freeUser(user[0].player1);
      }else if (socket_id == user[0].player2.socket_id) {
        freeUser(user[0].player2);
      }
      busyUsers.splice(busyUsers.indexOf(user[0]));
    }
  }

  function freeUser(user){
    const message = {
      message: 'opponent left'
    }
    io.to(`${user.socket_id}`).emit('OPPONENT_LEFT', message);
    availableUsers.push(user)
  }

  function returnUser(socket_id){
    const user = busyUsers.filter((e, i)=>{
      return socket_id == e.player1.socket_id || socket_id == e.player2.socket_id;
    })
    return user
  }

  function updateUsers(){
    io.sockets.emit('ONLINE_USERS', connections.length);
  }

  socket.on('CHECK_OPPONENT', function(user, callback){
    const opponent = availableUsers.filter((e, i)=>{
      return e.socket_id != user.socket_id
    })
    if(opponent && opponent.length>0){
      const payload = {
        player1: user,
        player2: opponent[0],
        gameHistory: {
          history: [],
          moves: []
        },
        moveToken: user.uuid
      }
      busyUsers.push(payload)
      const gameId = busyUsers.indexOf(payload)

      const player1 = {
        status: true,
        message: 'success',
        opponent: user,
        gameId: gameId
      }
      io.to(`${opponent[0].socket_id}`).emit('OPPONENT_MATCHED', player1);
      const player2 = {
        status: true,
        message: 'success',
        opponent: user,
        gameId: gameId
      }
      callback(player2)
    }else{
      callback({
        status: false,
        message: 'No opponent'
      });
    }
  })

  // {
  //   your: user,
  //   opponent: user,
  //   move: move,
  //  gameId: gameId
  // }

  socket.on('ON_MOVE', function(data){
    busyUsers[data.gameId].history.push(`${ data.your.username } clicked ${ data.move }`)
    busyUsers[data.gameId].moves.push(data.move);
    if(checkMoves(busyUsers[data.gameId], data.your.uuid)){
      io.to(`${data.your.socket_id}`).emit('GAME_WINNER', {
        message: 'you won',
        reset: true
      });
      io.to(`${data.opponent.socket_id}`).emit('GAME_WINNER', {
        message: `${ data.your.username } won`,
        reset: true
      });
      return null;
    }else {
      io.to(`${data.opponent.socket_id}`).emit('MOVE_TOKEN', {
        moveToken: data.opponent.uuid
      });
    }


    io.to(`${data.opponent.socket_id}`).emit('GAME_HISTORY', {
      gameHistory: busyUsers[data.gameId].gameHistory,
    });

    io.to(`${data.your.socket_id}`).emit('GAME_HISTORY', {
      gameHistory: busyUsers[data.gameId].gameHistory,
    });
  });

  function checkMoves(obj, uuid){
    let flg = false;
    if(obj.player1.uuid == uuid){
      flg = checkWinner(obj.player1)
    }else if(obj.player2.uuid == uuid){
      flg = checkWinner(obj.player2)
    }
    return flg
  }

  function checkWinner(user){
    const possibleCombinations = [
      [ 0,1,2 ],
      [ 3,4,5 ],
      [ 6,7,8 ],
      [ 0,3,6 ],
      [ 1,4,7 ],
      [ 2,5,8 ],
      [ 0,4,8 ],
      [ 2,4,6 ]
    ];

    const moves = user.yourMoves.sort();

    for(let i = 0; i < possibleCombinations.length; i++){
      let match = [];
      let possible = possibleCombinations[i];

      if(possible[0] in moves || possible[1] in moves || possible[2] in moves){
        for(let j = 0; j < moves.length; j++){
          try{
            if(possible[0] == moves[j] && possible[0] == moves[j+1] && possible[0] == moves[j+2]){
              return true
              break;
            }
          }catch(e){

          }
        }
      }
    }
    return false
  }
});
