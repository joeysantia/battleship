import { 
    player1,
    player2,
    game, 
    gameStart} from './game'
import { player } from './player'


test('gameStart sets player1 and player2', () => {

    gameStart('Jeremy', 'Paul')

    expect(JSON.stringify(player1)).toEqual(JSON.stringify(player('Jeremy')))
    expect(JSON.stringify(player2)).toEqual(JSON.stringify(player('Paul')))
})