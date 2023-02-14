let atoms = Array();
let atomContainers = Array();

let atomText = 'hello.';

let rotation = 0.0;

let mouseX = 0.0;
let mouseY = 0.0;

let blinkerOn = false;
let skipBlink = false;

window.onload = function () {
    initAtoms();
    setInterval(blinker, 530);
}

window.addEventListener('resize', initAtoms);

window.addEventListener('click', setFocus);
window.addEventListener('input', setAtomValue);

window.addEventListener('mousemove', function(e){ 

    mouseX = e.clientX;
    mouseY = e.clientY;

    rotateAtoms();
});

window.addEventListener('touchmove', function(e){ 

    e.preventDefault();
    
    mouseX = e.changedTouches[0].clientX;
    mouseY = e.changedTouches[0].clientY;

    rotateAtoms();
}, { passive: false});

const waves = document.getElementById("waves"); 
const userInput = document.getElementById("userInput");

waves.addEventListener('click', function () {
    userInput.focus();
});


function initAtoms() {

    let pixelPerAtom = Math.max((window.innerHeight*window.innerWidth)/(100*100), 60);

    atoms = Array();
    atomContainers = Array();
    
    waves.innerHTML = '';

    let numWaves = (window.innerHeight - 40) / pixelPerAtom;
    let numAtomsPerWave = (window.innerWidth - 40) / pixelPerAtom;

    for (let xx = 0; xx < numWaves; xx++) {

        const waveElem = document.createElement("div");
        waveElem.className = "wave";

        let wave = Array();
        let containerWave = Array();

        for (let yy = 0; yy < numAtomsPerWave; yy++) {

            const atomContainer = document.createElement("div");
            atomContainer.className = "text-container";

            const atomElem = document.createElement("p");
            atomElem.className = "atom";
            atomElem.innerText = atomText;

            wave.push(atomElem);
            atomContainer.appendChild(atomElem);
            containerWave.push(atomContainer);
            waveElem.appendChild(atomContainer);
        }

        atoms.push(wave);
        atomContainers.push(containerWave);
        waves.appendChild(waveElem);
    }
}

function updateAtoms(fn) {

    for (let xx = 0; xx < atoms.length; xx++) {

        for (let yy = 0; yy < atoms[0].length; yy++) {

            fn(atoms[xx][yy]);
        }
    }
}

function updateAtomContainers(fn) {

    for (let xx = 0; xx < atoms.length; xx++) {

        for (let yy = 0; yy < atoms[0].length; yy++) {

            fn(atomContainers[xx][yy]);
        }
    }
}

// function setFocus() {
//     userInput.focus();
// }

// hacky solution to focus on offscreen form from:
// https://stackoverflow.com/questions/12204571/mobile-safari-javascript-focus-method-on-inputfield-only-works-with-click
function setFocus() {

    // create invisible dummy input to receive the focus first
    const fakeInput = document.createElement('input')
    fakeInput.setAttribute('type', 'text')
    fakeInput.style.position = 'absolute'
    fakeInput.style.opacity = 0
    fakeInput.style.height = 0
    fakeInput.style.fontSize = '16px' // disable auto zoom
  
    // you may need to append to another element depending on the browser's auto 
    // zoom/scroll behavior
    document.body.prepend(fakeInput)
  
    // focus so that subsequent async focus will work
    fakeInput.focus()
  
    userInput.setSelectionRange(10, 10);
    setTimeout(() => {
  
      // now we can focus on the target input
      userInput.focus()
      
      // cleanup
      fakeInput.remove()
      
    }, 1000)
  }

function setAtomValue() {
  
    document.title = userInput.value;
    atomText = userInput.value + '|';

    blinkerOn = true;
    skipBlink = true;

    updateAtoms( function (atom) {
        atom.innerText = atomText;
    });
}

async function rotateAtoms() {

    rotation += 0.8;

    updateAtomContainers( function (container) {

        // tan((mousex - xx)/(mousey - yy))
        let pos = container.getBoundingClientRect();

        

        // angle = Math.abs(Math.atan2((pos.top - mouseY),(pos.left - mouseX)));
        angle = Math.atan2((pos.top - mouseY),(pos.left - mouseX)) - Math.PI/2;


        container.style.transform = "rotate(" + angle + "rad)";
    });
}

async function blinker() {

    if (!skipBlink) {
        if (!blinkerOn) {
            atomText += '|';
        } else {
            atomText = atomText.slice(0, -1);
        }
        blinkerOn = !blinkerOn;
        updateAtoms( function (atom) {
            atom.innerText = atomText;
        });
    }

    skipBlink = false;
    
}