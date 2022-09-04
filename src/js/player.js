
import { gameboard } from './gameboard.js'

export const player = (name) => {

    const board = gameboard(name)

    function move(opponent, target) { //is it necessary for the opponent to be a parameter? 
        if (this.name === 'computer') {
            let isValid = false 

            while (true) {

                let xArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
                let yArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

                let computerTarget = `${random(xArr)}${random(yArr)}`
                
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
                            return coord.coordinate === target && coord.isHit
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
