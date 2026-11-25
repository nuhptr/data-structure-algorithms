/**
 * Kontrak untuk pencarian siswa berdasarkan nama atau nama parsial.
 */
export interface IStudentSearcher {
    /**
     * Mencari nama atau nama parsial dalam daftar siswa.
     * Perbandingan tidak membedakan huruf besar/kecil.
     * Mengembalikan pesan hasil beserta indeks jika ditemukan.
     */
    search(studentName: string): string
}
