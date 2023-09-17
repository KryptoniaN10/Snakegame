const gameBoard=document.querySelector("#gameBoard")
const scoreText=document.querySelector("#score")
const resetBtn=document.querySelector("#resetButton")
const unitsize=25
const ctx=gameBoard.getContext("2d")
const gameWidth=gameBoard.width;
const gameHeight=gameBoard.height;
const backgroundcolor="white";
const snakeColor="lightgreen"
const snakeBorder="blue"
const foodColor="red"

let running=false
let xVelocity=unitsize;
let yVelocity=0
let foodX;
let foodY
let score=0;
let snake=[
    {x:unitsize*3,y:0},
    {x:unitsize*2,y:0},
    {x:unitsize*1,y:0},
    {x:0,y:0}
]
startGame()
window.addEventListener("keydown",changeDirection)
resetBtn.addEventListener("click",resetGame)
function startGame(){
    running=true
    createFood()
    nextTick()
}
function nextTick(){
    if(running){
        setTimeout(()=>{
        clearBoard()
        drawFood()
        drawsnake()
        moveSnake()
        checkgameover()
        nextTick()
        }
        ,100)
    }
    
}
function clearBoard(){
    ctx.fillStyle=backgroundcolor
}
function createFood(){
    function randomFood(min,max){
        const randNum=Math.round(((Math.random()*(max-min))+min)/unitsize)*unitsize
        return randNum
    }
    foodX=randomFood(0,(gameWidth-unitsize))
    foodY=randomFood(0,(gameWidth-unitsize))
    drawFood()
}   
function drawFood(){
    ctx.fillStyle=foodColor;
    ctx.fillRect(foodX,foodY,unitsize,unitsize)
}
function moveSnake(){
    const head={x:snake[0].x+xVelocity,
    y:snake[0].y+yVelocity}
    snake.unshift(head);
    if(false){

    }
    else{
        snake.pop()
    }
    
}
function drawsnake(){
    ctx.fillStyle=snakeColor
    ctx.strokeStyle=snakeBorder
    snake.forEach(snakepart=>{
        ctx.fillRect(snakepart.x,snakepart.y,unitsize,unitsize)
        ctx.strokeRect(snakepart.x,snakepart.y,unitsize,unitsize)
    })
}
function checkgameover(){
    
}
function changeDirection(event){
      const keypressed=event.keyCode;
      console.log(keypressed)
      LEFT=37
      UP=38
      RIGHT=39
      DOWN=40
     const moveup=(yVelocity==-unitsize)
     const movedown=(yVelocity==unitsize)
     const moveright=(xVelocity==unitsize)
     const moveleft=(xVelocity==-unitsize)
     switch(true){
        case(keypressed==LEFT && !moveright):
            xVelocity=-unitsize
            yVelocity=0
            break;
        
        case(keypressed==RIGHT && !moveleft):
            xVelocity=unitsize
            yVelocity=0
            break;
        
        case(keypressed==DOWN && !moveup):
            xVelocity=0
            yVelocity=unitsize
            break;
        case(keypressed==UP && !movedown):
            xVelocity=0
            yVelocity=-unitsize
            break;
        
     }
}
function resetGame(){}