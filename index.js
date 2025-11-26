class cNode {
    constructor(position, parent) {
        this.position = position;
        this.parent = parent;
    }
}

class Queue {
    constructor() {
        this.queueArray = [];
    }

    enqueue(node) {
        this.queueArray.push(node);
    }

    dequeue() {
        return this.queueArray.shift();
    }

    isEmpty() {
        return this.queueArray.length === 0;

    }
}


function singleKnightMove(node) {
    const position = node.position;

    // All possible knight move deltas
    const moveDeltas = [
        [1, 2], [1, -2], [-1, 2], [-1, -2],
        [2, 1], [2, -1], [-2, 1], [-2, -1]
    ];

    // Generate moves using deltas
    const movesArray = moveDeltas
        .map(delta => [position[0] + delta[0], position[1] + delta[1]])
        .filter(positionValidator);

    return movesArray;
}


function positionValidator(position) {
    return position[0] >= 0 && position[0] <= 7 &&
        position[1] >= 0 && position[1] <= 7;
}

function samePos(a, b) {
    return a[0] === b[0] && a[1] === b[1];
}

function isVisited(visited, pos) {
    return visited.some(v => v[0] === pos[0] && v[1] === pos[1]);
}

function knightMove(startLocation, destination) {
    let startNode = new cNode(startLocation, null);
    let visitedLocations = [];

    const queueArray = new Queue();
    queueArray.enqueue(startNode);
    visitedLocations.push(startNode.position);

    while (!queueArray.isEmpty()) {
        let currentNode = queueArray.dequeue();
        if (samePos(currentNode.position, destination)) return currentNode;
        else {
            let validMovesArray = singleKnightMove(currentNode);
            validMovesArray.forEach(function (value) {
                if (!isVisited(visitedLocations, value)) {
                    let newNode = new cNode(value, currentNode);
                    queueArray.enqueue(newNode);
                    visitedLocations.push(value)
                }
            })
        }
    }
}

function cNodeToString(cNode) {
    let pathArray = [];
    let current = cNode;
    while (current) {
        pathArray.push(current.position);
        current = current.parent;
    }

    return pathArray.reverse().map(p => `[${p[0]},${p[1]}]`).join(" ");
}

let randomPath = knightMove([0, 0], [3, 3]);
console.log(cNodeToString(randomPath));

