// Jadikan file ini modul agar nama kelasnya tidak bentrok dengan file lain.
export {}

// Node menyimpan satu nilai dan referensi ke node berikutnya.
class LinkedListNode<T> {
   value: T
   next: LinkedListNode<T> | null

   constructor(value: T) {
      this.value = value
      // Node baru belum terhubung ke node lain.
      this.next = null
   }
}

// Singly linked list menghubungkan node dalam satu arah: head -> ... -> tail.
class LinkedList<T> {
   // head menunjuk node pertama, sedangkan tail menunjuk node terakhir.
   head: LinkedListNode<T> | null
   tail: LinkedListNode<T> | null
   // Jumlah node disimpan agar size() dapat berjalan dalam O(1).
   length: number

   constructor(value: T) {
      // Pada awalnya, node pertama juga merupakan node terakhir.
      const node = new LinkedListNode(value)
      this.head = node
      this.tail = node
      this.length = 1
   }

   // Tambahkan node di akhir list. Referensi tail membuat operasi ini O(1).
   push(value: T): this {
      const node = new LinkedListNode(value)

      if (this.tail) {
         // Hubungkan tail lama ke node baru.
         this.tail.next = node
      } else {
         // Jika list kosong, node baru menjadi head.
         this.head = node
      }

      this.tail = node
      this.length++
      // Kembalikan list agar pemanggilan seperti push(2).push(3) dapat dilakukan.
      return this
   }

   // Hapus dan kembalikan node terakhir. Operasi ini O(n) karena perlu mencari node sebelumnya.
   pop(): LinkedListNode<T> | undefined {
      if (!this.head) return undefined

      let current = this.head
      let previous: LinkedListNode<T> | null = null

      // Telusuri list sambil menyimpan node sebelum node terakhir.
      while (current.next) {
         previous = current
         current = current.next
      }

      // Node sebelumnya menjadi tail baru; jika tidak ada, list hanya berisi satu node.
      if (previous) {
         previous.next = null
      } else {
         this.head = null
      }

      this.tail = previous
      this.length--
      // Lepaskan node yang dihapus dari list.
      current.next = null
      return current
   }

   // Tambahkan node di awal list dalam waktu O(1).
   unshift(value: T): this {
      const node = new LinkedListNode(value)
      // Node baru menunjuk ke head lama, kemudian menjadi head.
      node.next = this.head
      this.head = node

      // Jika list sebelumnya kosong, node baru juga menjadi tail.
      if (!this.tail) {
         this.tail = node
      }

      this.length++
      return this
   }

   // Hapus dan kembalikan node pertama dalam waktu O(1).
   shift(): LinkedListNode<T> | undefined {
      const removed = this.head
      if (!removed) return undefined

      // Pindahkan head ke node berikutnya, lalu lepaskan node yang dihapus.
      this.head = removed.next
      removed.next = null
      this.length--

      // Jika tidak ada node tersisa, tail juga harus null.
      if (!this.head) {
         this.tail = null
      }

      return removed
   }

   // Kembalikan node pertama, atau null jika list kosong.
   getFirst(): LinkedListNode<T> | null {
      return this.head
   }

   // Kembalikan node terakhir dalam O(1) menggunakan referensi tail.
   getLast(): LinkedListNode<T> | null {
      return this.tail
   }

   // Kembalikan node pada indeks berbasis nol; penelusuran berjalan dalam O(indeks).
   get(index: number): LinkedListNode<T> | null {
      // Indeks harus berupa bilangan bulat yang berada dalam rentang list.
      if (!Number.isInteger(index) || index < 0 || index >= this.length) {
         return null
      }

      let node = this.head
      // Ikuti tautan next sampai mencapai indeks yang diminta.
      for (let currentIndex = 0; currentIndex < index && node; currentIndex++) {
         node = node.next
      }

      return node
   }

   // Ganti nilai pada indeks tertentu; kembalikan false jika indeks tidak valid.
   set(index: number, value: T): boolean {
      const node = this.get(index)
      if (!node) return false

      node.value = value
      return true
   }

   // Sisipkan nilai pada indeks 0 sampai length; kembalikan false jika indeks tidak valid.
   insert(index: number, value: T): boolean {
      if (!Number.isInteger(index) || index < 0 || index > this.length) {
         return false
      }

      // Gunakan metode khusus untuk menyisipkan di awal atau akhir list.
      if (index === 0) {
         this.unshift(value)
         return true
      }

      if (index === this.length) {
         this.push(value)
         return true
      }

      // Cari node sebelum posisi yang dituju, lalu sisipkan node baru setelahnya.
      const previous = this.get(index - 1)
      if (!previous) return false

      const node = new LinkedListNode(value)
      node.next = previous.next
      previous.next = node
      this.length++
      return true
   }

   // Kembalikan jumlah node yang tersimpan dalam waktu O(1).
   size(): number {
      return this.length
   }

   // Kosongkan list dengan menghapus referensi head dan tail.
   clear(): void {
      this.head = null
      this.tail = null
      this.length = 0
   }
}

// Buat list angka dengan nilai awal 1.
const myLinkedList = new LinkedList<number>(1)
// Tambahkan 2 dan 3 ke akhir list.
myLinkedList.push(2).push(3)
// Cetak struktur list: head menunjuk 1 -> 2 -> 3, dan tail menunjuk 3.
console.log(myLinkedList)
