/**
 * Mencetak judul bagian (section header) dengan format konsisten pada output demo.
 *
 * Kompleksitas Waktu : O(1)
 * Kompleksitas Ruang : O(1)
 *
 * @param title - Judul bagian yang akan ditampilkan.
 * @returns Tidak mengembalikan nilai.
 *
 * @example
 * section("arrays — CustomArray")
 */
export function section(title: string): void {
    console.log(`\n=== ${title} ===`)
}

/**
 * Mencetak pasangan label dan nilai ke konsol dengan format seragam untuk kebutuhan demo.
 *
 * Kompleksitas Waktu : O(1)
 * Kompleksitas Ruang : O(1)
 *
 * @param label - Deskripsi singkat dari nilai yang ditampilkan.
 * @param value - Nilai atau hasil eksekusi yang ingin dicetak.
 * @returns Tidak mengembalikan nilai.
 *
 * @example
 * show("hasil", 42)
 */
export function show(label: string, value: unknown): void {
    console.log(`${label}:`, value)
}
