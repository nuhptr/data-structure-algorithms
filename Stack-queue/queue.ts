// Node untuk queue menyimpan data dan referensi ke node berikutnya.
// Setiap node hanya menunjuk ke elemen setelahnya, mirip dengan linked list.
class QueueNode<T> {
   // Nilai yang disimpan di dalam node.
   value: T
   // Referensi ke node berikutnya dalam antrian.
   next: QueueNode<T> | null

   constructor(value: T) {
      this.value = value
      this.next = null
   }
}

// Queue menggunakan linked list dengan pointer first dan last.
// first adalah elemen paling depan (yang akan keluar lebih dulu),
// last adalah elemen paling belakang (yang baru masuk terakhir).
class Queue<T> {
   // Elemen paling depan dalam queue.
   first: QueueNode<T> | null
   // Elemen paling belakang dalam queue.
   last: QueueNode<T> | null
   // Jumlah elemen yang sedang berada di queue.
   length: number

   constructor(value?: T) {
      // Inisialisasi queue dalam keadaan kosong.
      this.first = null
      this.last = null
      this.length = 0

      // Jika ada nilai awal, langsung masukkan ke queue.
      if (value !== undefined) {
         this.enqueue(value)
      }
   }

   // Menambahkan elemen di bagian belakang queue.
   // Operasi ini berjalan O(1) karena kita selalu menambah di last.
   enqueue(value: T): this {
      const newNode = new QueueNode(value)

      // Jika queue kosong, node baru menjadi first sekaligus last.
      if (!this.first) {
         this.first = newNode
         this.last = newNode
         this.length = 1

         return this
      }

      // Hubungkan last lama ke node baru, lalu jadikan node baru sebagai last.
      this.last!.next = newNode
      this.last = newNode
      this.length++

      return this
   }

   // Menghapus elemen paling depan queue.
   // Operasi ini juga O(1) karena first selalu menjadi node yang siap dikeluarkan.
   dequeue(): QueueNode<T> | undefined {
      // Jika queue kosong, tidak ada yang bisa dihapus.
      if (!this.first) return undefined

      const temp = this.first

      // Jika hanya ada satu elemen, maka queue menjadi kosong setelah dequeue.
      if (this.length === 1) {
         this.first = null
         this.last = null
      } else {
         // Pindahkan first ke elemen berikutnya.
         this.first = this.first.next
      }

      // Lepaskan hubungan node yang dikeluarkan agar tidak tersambung lagi.
      temp.next = null
      this.length--

      return temp
   }
}

// Contoh penggunaan queue.
let myQueue = new Queue(0)
myQueue.enqueue(1)
myQueue.enqueue(2)
myQueue.enqueue(5)
myQueue.dequeue()

console.log(myQueue)
