export default {
    $(selector) {
        /* Single Element Selection */
        return document.querySelector(selector);
    },
    $$(selector) {
        /* Multiple Element Selection */
        return document.querySelectorAll(selector);
    },
    makeDraggable(element) {
        try {
            element.setAttribute('draggable', true);
        } catch (err) { console.log(err); }
    },
    handleDragStart(event) {

        try {
            event.dataTransfer.setData('text/plain', event.target.id);
        } catch (err) { console.log(err); }
    },
    handleDragOver(event) {
        event.preventDefault();
    },
    handleDrop(event, dataTarget) {
        try {
            event.preventDefault();
            const id = event.dataTransfer.getData('text/plain');
            const draggedElement = this.$(`#${id}`);
            const canvasRect = dataTarget.getBoundingClientRect();
            const dropX = event.clientX - canvasRect.left;
            const dropY = event.clientY - canvasRect.top;
            const canvasWidth = canvasRect.width;
            const canvasHeight = canvasRect.height;
            const xPercent = (dropX / canvasWidth) * 100;
            const yPercent = (dropY / canvasHeight) * 100;

            dataTarget.appendChild(draggedElement);
        } catch (err) { console.log(err); }

    },
    handleNodeConnection(nodeElement, onConnectionComplete) {
        let selectedNode = null;
        nodeElement.addEventListener('click', (event) => {
            try {
                const clickedNode = event.target.closest('.node');
                if (clickedNode && clickedNode.classList.contains('node')) {
                    if (selectedNode === null || selectedNode === clickedNode) {
                        selectedNode = clickedNode;
                    } else {
                        onConnectionComplete(selectedNode, clickedNode, nodeElement);
                        selectedNode = null;
                    }

                }
            }
            catch (err) {
                console.log(err);
            }

        });

    }

}