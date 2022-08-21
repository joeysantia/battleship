import { message1, player2Board } from "./dom";

function togglePlayer2() {
    if (document.querySelector('.player-2')) {
        document.body.querySelector('main').removeChild(player2Board)
    } else {
        document.querySelector('main').appendChild(player2Board)
    }
}