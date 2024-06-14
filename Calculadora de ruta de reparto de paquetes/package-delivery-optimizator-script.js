function nearestNeighbor(graph, start) {
    let visited = [start];
    let pathLength = 0;

    while (visited.length < graph.length) {
        let currentNode = visited[visited.length - 1];
        let nearestNeighbor = graph[currentNode]
            .map((weight, node) => [node, weight])
            .filter(([node]) => !visited.includes(node))
            .reduce((min, current) => (min[1] < current[1] ? min : current));

        visited.push(nearestNeighbor[0]);
        pathLength += nearestNeighbor[1];
    }

    // Regresar al inicio
    pathLength += graph[visited[visited.length - 1]][start];
    visited.push(start);

    return { path: visited, length: pathLength };
}

// Ejemplo de uso
const locations = [
    "Tienda A",
    "Cliente 1",
    "Cliente 2",
    "Tienda B"
];

// Matriz de distancias entre ubicaciones
const distances = [
    [0, 5, 8, 12],  // Distancias desde Tienda A
    [5, 0, 6, 10],  // Distancias desde Cliente 1
    [8, 6, 0, 4],   // Distancias desde Cliente 2
    [12, 10, 4, 0]  // Distancias desde Tienda B
];

const startLocationIndex = 0; // Índice de la ubicación inicial, en este caso, "Tienda A"
const { path, length } = nearestNeighbor(distances, startLocationIndex);

console.log("Ruta óptima de reparto:");
path.forEach((locationIndex, index) => {
    const location = locations[locationIndex];
    console.log(`${index + 1}. ${location}`);
});
console.log("Longitud total de la ruta:", length);
