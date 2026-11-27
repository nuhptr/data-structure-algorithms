/**
 * Kontrak untuk pencarian siswa berdasarkan nama atau nama parsial.
 */
export interface IStudentSearcher {
    /**
     * Mencari nama atau nama parsial dalam daftar siswa.
     * Perbandingan tidak membedakan huruf besar/kecil.
     *
     * @param studentName - Nama lengkap atau sebagian nama siswa yang dicari.
     * @returns Pesan hasil pencarian beserta indeks jika ditemukan, atau pesan tidak ditemukan.
     */
    search(studentName: string): string
}
