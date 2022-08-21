const drag = document.querySelector('#drag')

drag.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', e.target.id)
    e.dataTransfer.dropEffect = 'move'
})

const drop = document.querySelector('#drop')

drop.addEventListener('drop', (e) => {
    e.preventDefault()

    const data = e.dataTransfer.getData('text/plain')
    e.target.appendChild(document.getElementById(data))
})

drop.addEventListener('dragover', (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
})