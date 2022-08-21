import { renderOwnShips } from './eventlisteners.js'
import { gameboard } from './gameboard.js'

export const player = (name) => {

    const board = gameboard(name)

    function move(opponent, target) { //is it necessary for the opponent to be a parameter? 
        if (this.name === 'computer') {
            let isValid = false 

            while (true) {
                //i need to wrap all of this so that the computer keeps trying until a valid space is chosen
                let xArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
                let yArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

                let x = random(xArr)
                let y = random(yArr)

                //consider refactoring - you may be able to just store the xAxis and yAxis as random(xArr) and random(yArr) directly
                //which saves you a couple of lines 
                let computerTarget = {
                    xAxis: x,
                    yAxis: y
                }
                console.log(computerTarget)
            if (isValidSpace(computerTarget)) {
                opponent.board.receiveAttack(computerTarget)
                return computerTarget
            }
            
            }

            function random(arr) {
                return arr[Math.floor(Math.random() * arr.length)]
            }
            
            function isValidSpace(target) {
                if (opponent.board.missedAttacks.indexOf(target) > -1 ||
                    opponent.board.ships.find((ship) => {
                        return ship.coordinates.find((coord) => {
                          return coord.xAxis === target.xAxis && coord.yAxis === target.yAxis && target.isHit;
                        });
                      })) {
                          return false
                      }
                return true 
            }
        } else {
            opponent.board.receiveAttack(target)
        }
    }

    return {
        name,
        board,
        move
    }
}
