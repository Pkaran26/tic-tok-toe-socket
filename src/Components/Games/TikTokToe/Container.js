import React from 'react'
import Squre from './Squre'

const Container = ({ setMove, sender, gameHistory: { moves }, gamePass, opponent, userLeft })=>{
  return(
    <div className="card bg-light">
      <div className="card-body">
        <table style={{width: '100%'}}>
          <tbody>
            <tr>
              <td>Welcome { sender.username }</td>
              {!userLeft?
                <td>{ opponent && opponent.username? `Opponent ${ opponent.username }` :
                  <small className="text-danger"> Waiting for opponent</small>}
                </td>
              :
              <td>
                <small className="text-danger">Opponent left</small>
              </td>
              }
            </tr>
          </tbody>
        </table>
        <table>
          <tbody>
          <tr>
            <Squre
              returnFunc={ setMove }
              squreId="0"
              user={ sender }
              moves={ moves }
              gamePass={ gamePass }
            />
            <Squre
              returnFunc={ setMove }
              squreId="1"
              user={ sender }
              moves={ moves }
              gamePass={ gamePass }
            />
            <Squre
              returnFunc={ setMove }
              squreId="2"
              user={ sender }
              moves={ moves }
              gamePass={ gamePass }
            />
          </tr>
          <tr>
            <Squre
              returnFunc={ setMove }
              squreId="3"
              user={ sender }
              moves={ moves }
              gamePass={ gamePass }
            />
            <Squre
              returnFunc={ setMove }
              squreId="4"
              user={ sender }
              moves={ moves }
              gamePass={ gamePass }
            />
            <Squre
              returnFunc={ setMove }
              squreId="5"
              user={ sender }
              moves={ moves }
              gamePass={ gamePass }
            />
          </tr>
          <tr>
            <Squre
              returnFunc={ setMove }
              squreId="6"
              user={ sender }
              moves={ moves }
              gamePass={ gamePass }
            />
            <Squre
              returnFunc={ setMove }
              squreId="7"
              user={ sender }
              moves={ moves }
              gamePass={ gamePass }
            />
            <Squre
              returnFunc={ setMove }
              squreId="8"
              user={ sender }
              moves={ moves }
              gamePass={ gamePass }
            />
          </tr>
        </tbody>
        </table>
      </div>
    </div>
  )
}
export default Container
