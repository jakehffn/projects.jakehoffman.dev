var links = document.getElementsByClassName("link");
var selector = null;
var selectorPos = null;
var movingFuncFlag = false;

for (var i = 0; i < links.length; i++) {

    links[i].addEventListener('mouseover', e => {
        
        var link = e.target;
        position = link.getBoundingClientRect();
        selectorPos = position
        
        if (selector == null) {
            selector = document.createElement('div')
            document.body.appendChild(selector)

            selector.style.position = 'absolute'
            selector.style.backgroundColor = 'red'
            selector.style.borderRadius = '8px'
            selector.style.zIndex = 1
            // selector.style.padding = '8px'
        }

        // if (!movingFuncFlag) {

            // movingFuncFlag = true;
        moveSelector();
        // }
    });
}

function moveSelector() {

    // selector.style.width = selector.style.width + (selectorPos.width - selector.style.width)/2 + 'px'
    // selector.style.height = selector.style.height + (selectorPos.height - selector.style.height)/2 + 'px'
    // selector.style.left = selector.style.left + (selectorPos.x - selector.style.left)/2 + 'px'
    // selector.style.top = selector.style.top + (selectorPos.y - selector.style.top)/2 + 'px'

    selector.style.width =  selectorPos.width + 'px'
    selector.style.height = selectorPos.height + 'px'
    selector.style.left = selectorPos.x + 'px'
    selector.style.top = selectorPos.y + 'px'

    // movingFuncFlag = false
}