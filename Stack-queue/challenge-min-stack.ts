// Node untuk stack yang menyimpan nilai dan referensi ke node berikutnya.
// Setiap node memiliki `value` dan `next` yang mengarah ke node sebelumnya.
class MinStackNode<T> {
   // Nilai data yang disimpan di node.
   value: T
   // Referensi ke node berikutnya di bawahnya dalam stack.
   next: MinStackNode<T> | null

   constructor(value: T) {
      this.value = value
      this.next = null
   }
}

// Stack dengan tambahan fitur:
// - `top()` untuk melihat elemen paling atas
// - `min()` untuk mengetahui nilai terkecil di stack
// Struktur ini mengunakan linked list agar operasi push/pop tetap cepat.
class Stack<T extends number> {
   // Node paling atas stack (top of stack).
   first: MinStackNode<T> | null
   // Jumlah elemen yang ada di stack.
   length: number
   // Nilai minimum saat ini di stack.
   private minValue: T | undefined

   constructor(value?: T) {
      // Saat dibuat, stack dalam kondisi kosong.
      this.first = null
      this.length = 0
      this.minValue = undefined

      // Jika ada nilai awal, langsung dimasukkan ke stack.
      if (value !== undefined) this.push(value)
   }

   // Menambahkan elemen baru ke bagian atas stack.
   // Node baru akan dipasang di depan `first`, sehingga push bersifat O(1).
   push(value: T): this {
      const newNode = new MinStackNode(value)

      // Node baru menunjuk ke node paling atas lama.
      newNode.next = this.first
      // Node baru menjadi elemen paling atas.
      this.first = newNode
      this.length++

      // Jika nilai baru lebih kecil dari minimum sebelumnya,
      // maka nilai minimum harus diperbarui.
      if (this.minValue === undefined || value < this.minValue) {
         this.minValue = value
      }

      return this
   }

   // Menghapus elemen paling atas stack.
   // Jika stack kosong, kembalikan `undefined`.
   pop(): MinStackNode<T> | undefined {
      if (!this.first) return undefined

      // Simpan node paling atas sebelum dihapus.
      const temp = this.first
      // Geser `first` ke node di bawahnya.
      this.first = temp.next
      // Putus hubungan node yang dihapus dari stack.
      temp.next = null
      this.length--

      // Jika stack habis, minimum juga harus dihapus/reset.
      if (this.length === 0) {
         this.minValue = undefined
         return temp
      }

      // Jika node yang dihapus adalah nilai minimum saat ini,
      // maka minimum harus dihitung ulang dari sisa stack.
      if (temp.value === this.minValue) {
         let current = this.first
         let newMin = current?.value

         // Lakukan perulangan untuk mencari nilai paling kecil di sisa stack.
         while (current) {
            if (current.value < (newMin ?? current.value)) {
               newMin = current.value
            }

            current = current.next
         }

         this.minValue = newMin
      }

      return temp
   }

   // Mengembalikan elemen paling atas tanpa menghapusnya.
   // Jika stack kosong, hasilnya `undefined`.
   top(): MinStackNode<T> | undefined {
      return this.first ?? undefined
   }

   // Mengembalikan nilai minimum yang saat ini ada di stack.
   // Jika stack kosong, hasilnya `undefined`.
   min(): T | undefined {
      return this.minValue
   }
}

// Contoh penggunaan:
const myStack = new Stack<number>()
myStack.push(5)
myStack.push(2)
myStack.push(7)
myStack.push(1)

// Top stack sekarang adalah 1.
console.log(myStack.top()?.value) // 1
// Nilai minimum di stack adalah 1.
console.log(myStack.min()) // 1

// Setelah pop, elemen 1 dihapus.
myStack.pop()
// Nilai minimum yang tersisa adalah 2.
console.log(myStack.min()) // 2
