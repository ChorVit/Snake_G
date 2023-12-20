const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")
//import direction from "../keylistener/keyboard"
const ground = new Image()
ground.src = "image/field.png"

const foodImg = new Image()
foodImg.src = "image/food/carrot.png"

const foodC = new Image()
foodC.src = "image/food/cheese.png"

const foodPi = new Image()
foodPi.src = "image/food/pizza.png"

let arrFood = [foodImg, foodC, foodPi]
let someFoodImg = arrFood[Math.floor(Math.random() * arrFood.length)]

let box = 32

let score = 0

let food = {
    x: Math.floor((Math.random() * 17 + 1)) * box, 
    y: Math.floor((Math.random() * 15 + 3)) * box,
}

let snake =[]
snake[0] = {
    x: 9 * box,
    y: 10 * box 
}

document.addEventListener("keydown", direction)
let dir;
function direction(event){
    if(event.keyCode == 37 && dir != 'right' || event.keyCode == 65 && dir != 'right')
    dir = 'left'
    else if(event.keyCode == 38 && dir != 'down' || event.keyCode == 87 && dir != 'down')
    dir = 'up'
    else if(event.keyCode == 39 && dir != 'left' || event.keyCode == 68 && dir != 'left')
    dir = 'right'
    else if(event.keyCode == 40 && dir != 'up' || event.keyCode == 83 && dir != 'up')
    dir = 'down'
}

function eatTail(head, arr){
    for(let i = 0; i < arr.length; i++){
        if(head.x == arr[i].x && head.y == arr[i].y)
        clearInterval(game)
    } 
}
let gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
gradient.addColorStop(0, "red");
gradient.addColorStop(0.14, "orange");
gradient.addColorStop(0.28, "yellow");
gradient.addColorStop(0.42, "green");
gradient.addColorStop(0.56, "blue");
gradient.addColorStop(0.7, "indigo");
gradient.addColorStop(1, "violet");

function drawG(){
    ctx.drawImage(ground, 0, 0 )
    ctx.drawImage(someFoodImg, food.x, food.y )

    for(let i = 0; i < snake.length; i++){
        //ctx.fillRect(snake[i].x, snake[i].y, box, box )
        //ctx.fillStyle = i == 0 ? 'black' : 'grey'
        ctx.beginPath();
        ctx.arc(snake[i].x + box / 2, snake[i].y + box / 2, box / 2, 0, 2 * Math.PI);
        ctx.fillStyle = i === 0 ? 'black' : gradient;
        ctx.fill();
        ctx.closePath();
    }

    ctx.fillStyle = "white"
    ctx.font = "50px Arial"
    ctx.fillText(score, box * 2, box * 1.75) 

    let snakeX = snake[0].x
    let snakeY = snake[0].y

    if(snakeX == food.x && snakeY == food.y){
        score++
        food = {
            x: Math.floor((Math.random() * 17 + 1)) * box, 
            y: Math.floor((Math.random() * 15 + 3)) * box,
        } 
        someFoodImg = arrFood[Math.floor(Math.random() * arrFood.length)]
    }else{
        snake.pop();
    }

    if(snakeX < box || snakeX > box * 17 || snakeY < 3 * box || snakeY > box * 17)
        clearInterval(game)

    if(dir == 'left') snakeX -= box;
    if(dir == 'right') snakeX += box;
    if(dir == 'up') snakeY -= box;
    if(dir == 'down') snakeY += box;

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    eatTail(newHead, snake)
    snake.unshift(newHead)

    changeInterval()
}

let interval = 200
let game = setInterval(drawG, interval)


function changeInterval(){
    if(score === 2){
        interval = 100
        clearInterval(game)
        game = setInterval(drawG, interval)
    }
}



