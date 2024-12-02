import domUtils from "./domUtils.js";
import state from "./state.js";
let nodeCount = 0;
export function createNode(x, y, title) {
    try {
        const node = document.createElement('div');
        node.classList.add('node');
        node.style.left = `${x}%`;
        node.style.top = `${y}%`;
        node.id = `node-${nodeCount++}`;
        node.innerHTML = `<div class='title'>${title}</div>`;
        domUtils.makeDraggable(node)
        node.addEventListener('dragstart', domUtils.handleDragStart);
        state.addNode(node.id, x, y, title);
        enableNodeEditing(node)
        return node;
    } catch (err) {
        console.log(err);
    }

}

export function drawNodeRelation(fromNode, toNode, canvas) {
    //setting bouding rects 

    const canvasRect = canvas.getBoundingClientRect();
    const fromRect = fromNode.getBoundingClientRect();
    const toRect = toNode.getBoundingClientRect();

    //settings like positions
    const fromX = fromRect.left + fromRect.width / 2 - canvasRect.left;
    const fromY = fromRect.top + fromRect.height / 2 - canvasRect.top;
    const toX = toRect.left + toRect.width / 2 - canvasRect.left;
    const toY = toRect.top + toRect.height / 2 - canvasRect.top;

    //settings line display
    const svg = document.getElementById('connection-layer');
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', fromX);
    line.setAttribute('y1', fromY);
    line.setAttribute('x2', toX);
    line.setAttribute('y2', toY);
    line.setAttribute('stroke', 'black');
    line.setAttribute('stroke-width', '2');
    svg.appendChild(line);

    //adding the connection nodes to state
    state.addConnection(fromNode.id, toNode.id);
}


export function enableNodeEditing(node) {
    const titleDiv = node.querySelector('.title');
    titleDiv.addEventListener('dblclick', (event) => {
        const currentTitle = titleDiv.textContent;
        titleDiv.contentEditable = true;
        // Save changes
    });
    titleDiv.addEventListener('blur', (event) => {
        const newTitle = event.target.innerText.trim() || currentTitle;
        titleDiv.textContent = newTitle;
        state.nodes[node.id].title = newTitle; // Update state
        titleDiv.contentEditable = false;
        console.log(state.nodes);

    });
}