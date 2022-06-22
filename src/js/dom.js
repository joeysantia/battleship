/* 
THE DOM


*/


const player1Cells = document.querySelectorAll('.player-one .grid')

const player2Cells = document.querySelectorAll('.player-two .grid')

const cells = document.querySelectorAll('.grid')
cells.forEach(cell => {
    cell.addEventListener('pointerdown', (e) => {
        cell.style.backgroundColor = 'blue'
    })
})