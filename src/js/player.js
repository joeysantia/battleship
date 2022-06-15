import { gameboard } from './gameboard.js'
import { ship } from './ship.js'

export const player = (name) => {

    const board = gameboard(name)

    function move(opponent, target) {
        if (this.name === 'computer') {
            let xArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'K']
            let yArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

            opponent.board.receiveAttack({
                xAxis: random(xArr),
                yAxis: random(yArr)
            })

            function random(arr) {
                return arr[Math.floor(Math.random() * arr.length)]
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
