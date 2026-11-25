/** Helper kecil untuk output demo yang konsisten. */
export function section(title: string): void {
    console.log(`\n=== ${title} ===`)
}

export function show(label: string, value: unknown): void {
    console.log(`${label}:`, value)
}
