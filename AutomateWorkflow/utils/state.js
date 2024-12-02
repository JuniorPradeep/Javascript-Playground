const state = {
    workflows: [],
    nodes: {},
    connections: [],
    observers: [],
    visualizers: [],
    addWorkflow(workflow) {
        this.workflows.push(workflow);
        this.notify();
    },
    addNode(nodeId, x, y, title) {

        if (!this.nodes[nodeId]) {
            this.nodes[nodeId] = { node: nodeId, x: x, y: y, title: title }
        } else {
            console.log("Node Already exists");
        }

    },
    addConnection(fromNode, toNode) {

        if (!this.connections.find(conn => conn.from === fromNode && conn.to === toNode)) {
            this.connections.push({ from: fromNode, to: toNode });
        }

    },
    notify() {
        this.observers.forEach(observer => observer({
            workflows: this.workflows,
            nodes: this.nodes,
            connections: this.connections
        }));
    },
    subscribe(fn) {
        this.observers.push(this.subscribe);
    }
}
export default state;