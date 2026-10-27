// Setiap node menyimpan nilai serta tautan ke node sebelum dan sesudahnya.
class DoublyLinkedListNode<T> {
   value: T
   next: DoublyLinkedListNode<T> | null
   prev: DoublyLinkedListNode<T> | null

   constructor(value: T) {
      this.value = value
      // Node baru belum terhubung dengan node lain.
      this.next = null
      this.prev = null
   }
}

// Doubly linked list dapat ditelusuri ke depan maupun ke belakang.
class DoublyLinkedList<T> {
   // head dan tail menunjuk node pertama dan terakhir.
   head: DoublyLinkedListNode<T> | null
   tail: DoublyLinkedListNode<T> | null
   // Simpan jumlah node agar panjang list selalu diketahui.
   length: number

   constructor(value: T) {
      // Node awal menjadi head sekaligus tail.
      const newNode = new DoublyLinkedListNode(value)
      this.head = newNode
      this.tail = newNode
      this.length = 1
   }

   // Tambahkan node di akhir list dalam waktu O(1).
   push(value: T): this {
      const newNode = new DoublyLinkedListNode(value)

      if (this.tail) {
         // Hubungkan node baru dengan tail lama pada kedua arah.
         newNode.prev = this.tail
         this.tail.next = newNode
      } else {
         // Jika list kosong, node baru juga menjadi head.
         this.head = newNode
      }

      this.tail = newNode
      this.length++
      // Kembalikan list agar pemanggilan metode dapat dirangkai.
      return this
   }

   // Hapus dan kembalikan node terakhir dalam waktu O(1).
   pop(): DoublyLinkedListNode<T> | undefined {
      const removed = this.tail
      if (!removed) return undefined

      // Node sebelum tail menjadi tail baru.
      this.tail = removed.prev
      if (this.tail) {
         this.tail.next = null
      } else {
         // Jika tidak ada tail baru, list kini kosong.
         this.head = null
      }

      // Lepaskan node yang dihapus dari list.
      removed.prev = null
      removed.next = null
      this.length--

      return removed
   }

   // Tambahkan node di awal list dalam waktu O(1).
   unshift(value: T): this {
      const newNode = new DoublyLinkedListNode(value)

      if (this.head) {
         // Hubungkan node baru dengan head lama pada kedua arah.
         newNode.next = this.head
         this.head.prev = newNode
      } else {
         // Jika list kosong, node baru juga menjadi tail.
         this.tail = newNode
      }

      this.head = newNode
      this.length++
      return this
   }

   // Hapus dan kembalikan node pertama dalam waktu O(1).
   shift(): DoublyLinkedListNode<T> | undefined {
      const removed = this.head
      if (!removed) return undefined

      // Node kedua menjadi head baru.
      this.head = removed.next
      if (this.head) {
         this.head.prev = null
      } else {
         // Jika tidak ada head baru, list kini kosong.
         this.tail = null
      }

      // Lepaskan node yang dihapus dari list.
      removed.next = null
      removed.prev = null
      this.length--

      return removed
   }
}

// Buat list angka yang dimulai dengan node bernilai 0.
const myDoublyLinkedList = new DoublyLinkedList<number>(0)
// Tambahkan 1 di akhir, sehingga urutannya menjadi 0 <-> 1.
myDoublyLinkedList.push(1)
// Gunakan pop() untuk menghapus node terakhir.
// myDoublyLinkedList.pop()
// Gunakan shift() untuk menghapus node pertama.
// myDoublyLinkedList.shift()
// Cetak struktur list agar tautan next dan prev dapat diperiksa.
console.log(myDoublyLinkedList)
