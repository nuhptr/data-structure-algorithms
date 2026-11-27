import { ITopologicalSort } from "./interfaces"

/**
 * Topological Sort (Kahn's Algorithm / BFS-based) — mengurutkan vertex
 * dalam Directed Acyclic Graph (DAG) sehingga setiap edge u→v menempatkan
 * u sebelum v. Mengembalikan null jika graf mengandung cycle.
 *
 * Kompleksitas Waktu : O(V + E)
 * Kompleksitas Ruang : O(V)
 *
 * @example
 * const sorter = new TopologicalSort();
 * const graph = { 0: [1, 2], 1: [3], 2: [3], 3: [4, 5], 4: [], 5: [] };
 * sorter.sort(graph); // => [0, 1, 2, 3, 4, 5]
 */
export class TopologicalSort implements ITopologicalSort {
    /**
     * Mengurutkan node pada Directed Acyclic Graph (DAG) menggunakan algoritma Kahn.
     *
     * @param graph - Adjacency list graf berarah dengan kunci dan tetangga bertipe angka
     * @returns Array urutan topologi node, atau `null` jika graf mengandung siklus
     */
    sort(graph: Record<number, number[]>): number[] | null {
        const inDegree: Record<number, number> = {}

        // Inisialisasi semua node dengan indegree 0 lalu hitung jumlah edge masuk tiap node
        for (const node of Object.keys(graph).map(Number)) {
            if (inDegree[node] === undefined) inDegree[node] = 0

            for (const neighbor of graph[node]) {
                inDegree[neighbor] = (inDegree[neighbor] ?? 0) + 1
            }
        }

        // Mulai dengan semua node yang tidak memiliki ketergantungan masuk
        const queue: number[] = Object.keys(inDegree)
            .map(Number)
            .filter((node) => inDegree[node] === 0)

        const sortedOrder: number[] = []

        // Proses node bebas ketergantungan lalu kurangi in-degree setiap tetangganya
        while (queue.length > 0) {
            const currentNode = queue.shift()!
            sortedOrder.push(currentNode)

            for (const neighbor of graph[currentNode] ?? []) {
                inDegree[neighbor]--
                if (inDegree[neighbor] === 0) {
                    queue.push(neighbor)
                }
            }
        }

        // Jika jumlah node terurut lebih sedikit dari total node, berarti terdapat cycle
        const totalNodes = Object.keys(graph).length
        const hasCycle = sortedOrder.length !== totalNodes

        return hasCycle ? null : sortedOrder
    }
}
