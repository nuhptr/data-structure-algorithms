import { IStudentSearcher } from "./interfaces"

/** Daftar nama siswa bawaan untuk demonstrasi. */
export const DEFAULT_STUDENTS: string[] = [
    "John Doe",
    "Jane Smith",
    "Alice Johnson",
    "Bob Brown",
    "Charlie Davis",
]

/**
 * Student Searcher — mencari nama atau nama parsial dalam daftar siswa.
 *
 * Perbandingan mengabaikan huruf besar/kecil dan spasi di sekitar
 * masukan. Kompleksitas waktu O(n) karena setiap elemen diperiksa
 * satu per satu.
 *
 * @example
 * const searcher = new StudentSearcher();
 * searcher.search("Alice"); // => "Student Alice found at index 2."
 * searcher.search("Zoe");   // => "Student Zoe not found."
 */
export class StudentSearcher implements IStudentSearcher {
    /** Daftar siswa yang diperiksa; dapat disuntikkan lewat konstruktor. */
    private readonly students: string[]

    constructor(students: string[] = DEFAULT_STUDENTS) {
        this.students = students
    }

    search(studentName: string): string {
        const query = studentName.toLowerCase().trim()

        for (let i = 0; i < this.students.length; i++) {
            if (this.students[i].toLowerCase().includes(query)) {
                return `Student ${studentName} found at index ${i}.`
            }
        }

        return `Student ${studentName} not found.`
    }
}
