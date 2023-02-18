var ctx;
var bctx;

var snake = [];
var direction = 3;
var prevDirection = 3;
const squareWidth = 20;

var appleLoc = [2];
var grow = false;
const interval = 70;

function init() 
{

    setInterval(gameLoop, interval);

    window.addEventListener("touchstart", handleTouchStart, false);
    window.addEventListener("touchmove", handleTouchMove, false);

    window.addEventListener("keydown", function (event) 
    {
        if (event.defaultPrevented) 
        {
          return;
        }
      
        if (event.key == "ArrowRight" || event.key == "d")
        {
            direction = 0;
        } else if (event.key == "ArrowDown" || event.key == "s")
        {
            direction = 1;
        } else if (event.key == "ArrowLeft" || event.key == "a")
        {
            direction = 2;
        } else if (event.key == "ArrowUp" || event.key == "w")
        {
            direction = 3;
        } 
        
    }, true);

    initCanvas();
    initSnake();
    placeApple();
    
};

var xOn = null;                                                        
var yOn = null;

function getTouches(event) {
  return event.touches ||             // browser API
         event.originalEvent.touches; // jQuery
}                                                     

function handleTouchStart(event) {
    const firstTouch = getTouches(event)[0];                                      
    xOn = firstTouch.clientX;                                      
    yOn = firstTouch.clientY;                                      
};                                                

function handleTouchMove(evt) {
    if ( ! xOn || ! yOn ) {
        return;
    }

    var xOff = evt.touches[0].clientX;                                    
    var yOff = evt.touches[0].clientY;

    var xDiff = xOn - xOff;
    var yDiff = yOn - yOff;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            direction = 2;
        } else {
            direction = 0;
        }                       
    } else {
        if ( yDiff > 0 ) {
            direction = 3;
        } else { 
            direction = 1;
        }                                                                 
    }
    
    xDown = null;
    yDown = null;                                             
};

function initCanvas()
{
    const canvas = document.getElementById("canvas");
    const width = canvas.width = window.innerWidth;
    const height = canvas.height = window.innerHeight;

    const bufferCanvas = document.createElement('canvas');
    bufferCanvas.width = width;
    bufferCanvas.height = height;
    bctx = bufferCanvas.getContext('2d');
    bctx.fillStyle = 'rgb(0, 0, 0)';
    bctx.fillRect(0, 0, width, height);


    ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillRect(0, 0, width, height);
};

function setScore( newScore )
{
    document.getElementById("score").innerHTML = newScore;
}

function initSnake()
{
    snake.push(new snakeSegment(17,20));
    snake.push(new snakeSegment(17,21));
    snake.push(new snakeSegment(17,22));
    snake.push(new snakeSegment(17,23));
};

function reset()
{
    snake = [];
    initSnake();
    placeApple();
    direction = 3;
    prevDirection = 3;
}

function snakeSegment(x, y)
{
    this.xPos = x * squareWidth;
    this.yPos = y * squareWidth;
}

function validateDirection(input)
{
    var direction;

    if (input != (prevDirection + 2) % 4)
    {
        direction = input;
    } else 
    {
        direction = prevDirection;
    }

    return direction
}

function moveSnake(input)
{

    var x;
    var y;

    var direction = validateDirection(input);

    switch (direction)
    {
        case 0:
            x = (snake[0].xPos/squareWidth) + 1;
            y = (snake[0].yPos/squareWidth);
            break;
        case 1:
            x = (snake[0].xPos/squareWidth);
            y = (snake[0].yPos/squareWidth) + 1;
            break;
        case 2:
            x = (snake[0].xPos/squareWidth) - 1;
            y = (snake[0].yPos/squareWidth);
            break;
        case 3:
            x = (snake[0].xPos/squareWidth);
            y = (snake[0].yPos/squareWidth) - 1;
            break;
        default:

    }
    
    prevDirection = direction;
    snake.unshift(new snakeSegment(x, y));

    if (!grow) 
    {
        snake.pop();
    } else {
        console.log("Growing");
        grow = false;
    }
    
}

function placeApple()
{
    x = Math.floor(Math.random() * Math.floor(ctx.canvas.width / 20));
    y = Math.floor(Math.random() * Math.floor(ctx.canvas.height / 20));

    appleLoc[0] = x*20;
    appleLoc[1] = y*20;
}

function collision()
{
    var x = snake[0].xPos;
    var y = snake[0].yPos;

    if (x < 0 || y < 0 || x >= ctx.canvas.width || y >= ctx.canvas.height)
    {
        reset();
    }

    if (x == appleLoc[0] && y == appleLoc[1]){
        placeApple();
        grow = true;
    }

    for (xx = 1; xx < snake.length; xx++)
    {
        if (snake[0].xPos == snake[xx].xPos && snake[0].yPos == snake[xx].yPos)
        {
            reset();
        }
    }
    snake.forEach(s => {
        
    });

}

function draw()
{

    bctx.clearRect(0, 0, bctx.canvas.width, bctx.canvas.height);

    bctx.fillStyle = 'rgb(0, 0, 0)';
    bctx.fillRect(0, 0, bctx.canvas.width, bctx.canvas.height);

    bctx.fillStyle = 'rgb(255, 255, 255)';

    
    snake.forEach(s => bctx.fillRect(s.xPos,s.yPos,squareWidth,squareWidth));

    bctx.fillStyle = 'rgb(255, 0, 0)';

    bctx.fillRect(appleLoc[0], appleLoc[1], squareWidth, squareWidth);

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.drawImage(bctx.canvas, 0, 0);
    
}

function gameLoop()
{
    moveSnake(direction);
    collision();
    setScore(snake.length);
    draw();
}

init();

