import React from 'react'
import Squre from './Squre'

const Container = ({ setMove, sender, moves, gamePass })=>{

  return(
    <div className="card bg-light">
      <div className="card-body text-center">
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
