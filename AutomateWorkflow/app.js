import domUtils from "./utils/domUtils.js";
import { createNode, drawNodeRelation, enableNodeEditing } from "./utils/nodeUtils.js";
const workflowCanvas = domUtils.$('#canvas-workflow');
const draggableItems = domUtils.$$('.node');

draggableItems.forEach(node => {
    domUtils.makeDraggable(node);
    node.addEventListener('dragstart', domUtils.handleDragStart);
});
workflowCanvas.addEventListener('dragover', domUtils.handleDragOver);
workflowCanvas.addEventListener('drop', (event) => domUtils.handleDrop(event, workflowCanvas));

domUtils.handleNodeConnection(workflowCanvas, drawNodeRelation);

/* node Elements Tree */
const node1 = createNode(45, 2, 'Node 1');
const node2 = createNode(35, 25, 'Node 2');
const node3 = createNode(55, 25, 'Node 3');
const node4 = createNode(25, 45, 'Node 4')
const node5 = createNode(65, 45, 'Node 5');
const nodes = [node1, node2, node3, node4, node5];
nodes.forEach(node => workflowCanvas.appendChild(node))