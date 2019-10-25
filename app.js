let orgboard;
const hum = "O";
const com ="X";
const winCombos =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [6,4,2]
    
]


const cells = document.querySelectorAll(".cell");

init()

function init(){
    document.querySelector(".endgame").style.display="none";
    orgboard = Array.from(Array(9).keys());
    // console.log(orgboard)
    for(let i = 0; i< cells.length; i++){
        cells[i].innerText ="";
        cells[i].style.removeProperty('background-color')
        cells[i].addEventListener('click', turnClick, false)
    }


}

function turnClick(sq) {
    console.log(sq.target.id)

    if(typeof orgboard[sq.target.id] == 'number'){
        turn(sq.target.id, hum)
        if (!checkTie()) turn(bestSpot(), com)
    }
    
}

function emptySquares(){
    return orgboard.filter(s=> typeof s == 'number')
}

function bestSpot(){
    return emptySquares()[0];
}

function checkTie(){
    if(emptySquares().length === 0){
        for (var i =0; i< cells.length; i++){
            cells[i].style.backgroundColor='green';
            cells[i].removeEventListener('click', turnClick, false);
        }
        declareWinner('Tie Game!')
        return true;
    }
    return false
}


function declareWinner(who){
    document.querySelector('.endgame').style.display="block";
    document.querySelector('.endgame').innerText = who
}

function turn(sqId, player){
    orgboard[sqId] = player
    document.getElementById(sqId).innerText = player;

    let gameWon = checkWIn( orgboard, player)
    if(gameWon) gameOver(gameWon)
}

function checkWIn(board , player){
    let plays = board.reduce((a, e, i)=>
        (e=== player) ? a.concat(i) : a, []);
        let gameWon = null;
        for (let [index, win] of winCombos.entries()){
            if(win.every(elem => plays.indexOf(elem ) >-1)){
                gameWon = {index: index, player: player};
                break;
            }
        }
        return gameWon;
}


function gameOver(gameWon){
    for (let index of winCombos[gameWon.index]){
        document.getElementById(index).style.backgroundColor=
        gameWon.player === hum? 'blue' : 'red';
    }

    for (let i = 0; i<cells.length; i++){
        cells[i].removeEventListener('click', turnClick, false)
    }

    declareWinner(gameWon.player == hum ? 'You win!' : 'You Lose!' )
}