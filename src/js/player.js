
import { gameboard } from './gameboard.js'

/**
 * IMPROVING COMPUTER AI
 * 
 * 1. If the computer logs a hit, then it should store the cells above, below, and to either side of the hit in an array
 * 2. The computer should randomly choose between those cells for the next attack
 * 3. If the computer logs another attack, it should continue in that direction until it logs a miss, then go in the other direction
 * 
 */

export const player = (name) => {

    const board = gameboard(name)
    

    function move(opponent, target) {
        if (this.name === 'computer') {

            this.nextMoves = []
            
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
