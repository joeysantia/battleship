import './style.css'
import { ship } from './js/ship'
window.onload = function() {
    const testShip = ship(3, 'x-axis', {
        xAxis: 'C',
        yAxis: 4
    })

    console.log(testShip)

    for (const coordinate of testShip.coordinates) {
        console.log(coordinate)
        let givenCell = self.page.evaluate(coordinate => {
            return document.querySelector(`.player-one .grid .${coordinate.xAxis}-${coordinate.yAxis}`)
        })
        console.log(givenCell)
        givenCell.addEventListener('pointerdown', (e) => {
            alert('success!')
        })
    }
}