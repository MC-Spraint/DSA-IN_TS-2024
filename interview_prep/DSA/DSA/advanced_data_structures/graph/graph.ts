import { PriorityQueue } from "./../priority_queue/priority-queue";
interface WithToString {
  toString(): string;
}
//https://www.youtube.com/watch?v=EFg3u_E6eHU
export class Graph<V extends WithToString> {
  private adjacencyList: Map<V, [V, number][]>;
  private indexes: Map<V, number>;
  private index: number = -1;
  private fieldName: string;
  private static DEFAULT_FIELD_NAME: string = "Computer_Network";

  getTotalEntries(): number {
    return this.index + 1;
  }

  getFieldName(): string {
    return this.fieldName;
  }

  setFieldName(fieldName: string): void {
    this.fieldName = fieldName;
  }
  constructor(vertices?: V[], fieldName?: string) {
    this.adjacencyList = new Map();
    this.indexes = new Map();
    this.fieldName = fieldName || Graph.DEFAULT_FIELD_NAME;

    if (vertices) {
      for (const v of vertices) {
        if (v !== null) {
          const vertex: V = v;
          const list: [V, number][] = [];
          this.adjacencyList.set(vertex, list);
          this.indexes.set(vertex, ++this.index);
        }
      }
    }
  }

  addEdge(
    source: V,
    destination: V,
    distance: number,
    isBidirectional: boolean
  ) {
    if (distance < 0) {
      throw new Error("Edge weight cannot be negative");
    }

    const addEdgeHelper = (key: V, value: V, dist: number) => {
      if (this.adjacencyList.has(key)) {
        if (!this.adjacencyList.get(key)?.find(([node, _]) => node === value)) {
          this.adjacencyList.get(key)?.push([value, dist]);
        } else {
          throw new Error("Edge already exists");
        }
      } else {
        const list: [V, number][] = [[value, dist]];
        this.adjacencyList.set(key, list);
        this.indexes.set(key, ++this.index);
      }
    };

    addEdgeHelper(source, destination, distance);

    if (isBidirectional) {
      addEdgeHelper(destination, source, distance);
    }
  }

  toString() {
    let graph = "";
    for (const [vertex, neighbors] of this.adjacencyList.entries()) {
      let output: string = vertex.toString() + " => ";
      for (let i = 0; i < neighbors.length; i++) {
        output += `${neighbors[i][0]} (${neighbors[i][1]})`; // Node (Distance)
        if (i < neighbors.length - 1) {
          output += " --> ";
        }
      }
      graph += `${output}` + "\n";
    }

    const finalGraph =
      `Graph (${this.getTotalEntries()}){` +
      "\n" +
      "adjacencyList:" +
      "\n" +
      graph + "," +
      "\n" +
      "indexes:" +
      "\n" +
      JSON.stringify(Array.from(this.indexes.entries())) +
      ",\n" +
      "totalEntries: " +
      this.getTotalEntries() +
      ",\n" +
      "fieldName: " +
      this.fieldName +
      "\n" +
      "}";
    return finalGraph;
  }

  equals(other: Graph<V>): boolean {
    if (this === other) return true;
    if (!(other instanceof Graph)) return false;
    return (
      this.index === other.index &&
      JSON.stringify(Array.from(this.adjacencyList.entries())) ===
        JSON.stringify(Array.from(other.adjacencyList.entries())) &&
      JSON.stringify(Array.from(this.indexes.entries())) ===
        JSON.stringify(Array.from(other.indexes.entries())) &&
      this.fieldName === other.fieldName
    );
  }

  dijkstra(source: V): Map<V, { distance: number; path: V[] }> {
    const distances = new Map<V, { distance: number; path: V[] }>();
    const visited = new Set<V>();

    // Initialize distances for all vertices
    for (const vertex of this.adjacencyList.keys()) {
      distances.set(vertex, { distance: Infinity, path: [] });
    }

    // Set distance for the source vertex to 0
    distances.set(source, { distance: 0, path: [source] });

    // Main loop of Dijkstra's algorithm
    while (visited.size < this.adjacencyList.size) {
      const current = this.getMinDistanceVertex(distances, visited);
      visited.add(current);

      // Check if current vertex has neighbors
      if (this.adjacencyList.has(current)) {
        for (const [neighbor, weight] of this.adjacencyList.get(current)!) {
          if (!visited.has(neighbor)) {
            const distanceThroughCurrent =
              distances.get(current)!.distance + weight;
            if (
              distances.has(neighbor) &&
              distanceThroughCurrent < distances.get(neighbor)!.distance
            ) {
              // Update distance and path for neighbor
              distances.set(neighbor, {
                distance: distanceThroughCurrent,
                path: distances.get(current)!.path.concat(neighbor),
              });
            }
          }
        }
      }
    }

    return distances;
  }

  private getMinDistanceVertex(
    distances: Map<V, { distance: number; path: V[] }>,
    visited: Set<V>
  ): V {
    let minDistance = Infinity;
    let minVertex: V | undefined;

    for (const [vertex, { distance }] of distances.entries()) {
      if (!visited.has(vertex) && distance < minDistance) {
        minDistance = distance;
        minVertex = vertex;
      }
    }

    return minVertex!;
  }
  breadthFirstSearch(startVertex: V): V[] {
    const visited: Map<V, boolean> = new Map<V, boolean>();
    const result: V[] = [];
    const queue: V[] = [];

    visited.set(startVertex, true);
    queue.push(startVertex);

    while (queue.length > 0) {
        const currentVertex = queue.shift()!;
        result.push(currentVertex);

        const neighbors = this.adjacencyList.get(currentVertex)!;
        for (const [neighbor, _] of neighbors) {
            if (!visited.get(neighbor)) {
                visited.set(neighbor, true);
                queue.push(neighbor);
            }
        }
    }

    return result;
}
}

const graph = new Graph<string>();
graph.addEdge("A", "B", 2, true);
graph.addEdge("C", "B", 1, true);
graph.addEdge("A", "C", 4, true);
graph.addEdge("B", "D", 1, false);
graph.addEdge("C", "E", 4, false);
graph.addEdge("D", "E", 2, false);

console.log(graph.toString());

console.log(graph.dijkstra("A"));
