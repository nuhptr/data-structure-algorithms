// Node tunggal untuk menyimpan nilai dan referensi ke node berikutnya.
// Struktur ini digunakan untuk membangun stack dengan pendekatan linked list.
class StackNode<T> {
   // Nilai yang disimpan di dalam node.
   value: T
   // Referensi ke node yang berada di bawahnya dalam stack.
   next: StackNode<T> | null

   constructor(value: T) {
      this.value = value
      this.next = null
   }
}

// Stack yang menggunakan linked list untuk operasi push/pop yang efisien.
// `first` menunjuk ke node paling atas (top of stack).
class StackValue<T> {
   // Node paling atas stack, atau null jika stack kosong.
   first: StackNode<T> | null
   // Jumlah elemen yang saat ini tersimpan di stack.
   length: number

   constructor(value?: T) {
      // Inisialisasi stack baru dalam kondisi kosong.
      this.first = null
      this.length = 0

      // Jika nilai awal diberikan, langsung masukkan ke stack.
      if (value !== undefined) this.push(value)
   }

   // Menambahkan elemen baru ke bagian atas stack.
   // Operasi ini bersifat O(1) karena node baru selalu ditambahkan di depan.
   push(value: T): this {
      const newNode = new StackNode(value)
      // Node baru menunjuk ke node paling atas lama.
      newNode.next = this.first
      // Node baru menjadi node paling atas.
      this.first = newNode
      this.length++

      return this
   }

   // Menghapus dan mengembalikan elemen paling atas stack.
   // Jika stack kosong, kembalikan undefined.
   pop(): StackNode<T> | undefined {
      if (!this.first) return undefined

      const temp = this.first
      // Pindahkan pointer first ke node berikutnya.
      this.first = temp.next
      temp.next = null
      this.length--

      return temp
   }

   // Mengambil elemen paling atas tanpa menghapusnya.
   // Jika stack kosong, kembalikan undefined.
   top(): StackNode<T> | undefined {
      return this.first ?? undefined
   }
}

// Contoh penggunaan stack.
let theStack = new StackValue(0)
theStack.push(1)
theStack.push(2)
// theStack.pop()

console.log(theStack)
