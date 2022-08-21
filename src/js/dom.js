/* 
THE DOM


*/


const cells = document.querySelectorAll('.grid')
const player1Cells = document.querySelectorAll('.player-1.grid')
const player2Cells = document.querySelectorAll('.player-2.grid')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')
const message3 = document.querySelector('#message-3')
const player2Board = document.querySelector('.player-2')

async function messageUpdate(header, text, action, element, newClass) {
    if (action === 'add') {
        header.textContent += text
    } else {
        header.textContent = text
    }
    if (element && newClass) {
        element.classList.add(newClass)
    }
    await wait(1000)
}

function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

function toggleDisabled() {
    player2Cells.forEach((cell) => {
        cell.classList.toggle("disabled");
      });
}

function createResetButton() {
    const button = document.createElement('button')
    button.textContent = 'Play Again ?'
    button.addEventListener('pointerdown', () => {
        window.location.reload()
    })
    document.body.appendChild(button)
    
}

export {
    message1,
    message2,
    message3,
    cells,
    player2Board,
    player1Cells,
    player2Cells,
    messageUpdate, 
    toggleDisabled,
    createResetButton
}