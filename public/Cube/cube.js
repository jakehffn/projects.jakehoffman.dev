setInterval(updateCube, 50);
document.onmousemove = getMousePosition;

var mouse = {xPos: 0, yPos: 0};
var cube = document.getElementById('computer');

function getMousePosition(event) {
    mouse.xPos = event.pageX - (window.innerWidth)/2;
    mouse.yPos = - (event.pageY - (window.innerHeight)/2);
}

function updateCube() {

    var distance = 300

    console.log(mouse)

    var xRotation = Math.atan(mouse.yPos/distance);
    var yRotation = Math.atan(mouse.xPos/distance);
    
    cube.style.transform = 'translateZ(-' + distance + 'px) rotateY(' + yRotation + 'rad) rotateX(' + xRotation + 'rad)';
}
