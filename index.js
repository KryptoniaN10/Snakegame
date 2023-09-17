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
    {x:unitsize,y:0},
    
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
        ,150)
    }
    else{
        displayGameover()
    }
}
function clearBoard(){
    ctx.fillStyle=backgroundcolor
    ctx.fillRect(0,0,gameHeight,gameWidth)
}
function createFood(){
    function randomFood(min,max){
        const randNum=Math.round(((Math.random()*(max-min))+min)/unitsize)*unitsize
        return randNum
    }
    foodX=randomFood(0,(gameWidth-unitsize))
    foodY=randomFood(0,(gameWidth-unitsize))
    
}   
function drawFood(){
    ctx.fillStyle=foodColor;
    ctx.fillRect(foodX,foodY,unitsize,unitsize)
}
function moveSnake(){
    const head={x:snake[0].x+xVelocity,
    y:snake[0].y+yVelocity}
    console.log("before pop"+snake)
    
    
    if(snake[0].x===foodX && snake[0].y===foodY){
       score++
       scoreText.textContent=score
       snake.unshift(head)
       createFood()
       drawFood()
    }
    else{
        snake.pop()
        
        snake.unshift(head);
        
    }console.log("after pop"+snake)
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
    if(snake[0].x<0 || snake[0].x>=gameWidth){
        running=false
    }
    else if(snake[0].y>=gameHeight|| snake[0].y<0){
        running=false
    }
    for (let i =1;i<snake.length;i++){
       if( snake[i].x==snake[0].x && snake[i].y==snake[0].y ) {
         running=false
         break
       } 
 }
      
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
function resetGame(){
    snake=[
        {x:unitsize*3,y:0},
        {x:unitsize*2,y:0},
        {x:unitsize,y:0},
        
    ]
    score=0
    xVelocity=unitsize
    yVelocity=0
    scoreText.textContent=0
    startGame()
}
function displayGameover(){
    ctx.font="50px MV Boli"
    ctx.fillStyle="red"
    ctx.strokeStyle="black"
    ctx.textAlign="center"
    ctx.fillText("Game Over!!!!!!!",gameHeight/2,gameWidth/2)
    running=false
}
