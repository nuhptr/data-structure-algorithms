// Node untuk menyimpan satu nilai dan tautan ke node berikutnya.
class ReverseNode<T> {
   // Nilai yang disimpan di node ini.
   head: T
   // Referensi ke node berikutnya, atau null jika node ini berada di akhir list.
   next: ReverseNode<T> | null

   constructor(value: T) {
      // Simpan nilai dan mulai tanpa terhubung ke node lain.
      this.head = value
      this.next = null
   }
}

// Linked list dengan operasi untuk menambahkan nilai dan membalik urutannya.
class ReverseLinkedList<T> {
   // Node pertama dalam list.
   head: ReverseNode<T>
   // Node terakhir dalam list.
   tail: ReverseNode<T>
   // Jumlah node dalam list.
   length: number

   constructor(value: T) {
      // Buat node pertama; node ini menjadi head sekaligus tail.
      this.head = new ReverseNode(value)
      this.tail = this.head
      this.length = 1
   }

   // Tambahkan node baru di bagian akhir list.
   push(value: T) {
      // Siapkan node baru yang belum terhubung ke node lain.
      let newNode = new ReverseNode(value)

      // Cabang ini disiapkan untuk kondisi list kosong.
      // Konstruktor saat ini selalu membuat node awal, jadi kondisi ini
      // tidak terjadi selama penggunaan normal.
      if (!this.head) {
         this.head = newNode
         this.tail = newNode
      }

      // Sambungkan node terakhir lama ke node baru.
      this.tail.next = newNode
      // Perbarui tail agar menunjuk ke node yang baru ditambahkan.
      this.tail = newNode
      // Perbarui jumlah node setelah penambahan.
      this.length++
   }

   // Balik arah tautan setiap node agar urutan list menjadi terbalik.
   reverse() {
      // Simpan head lama, yang nantinya akan menjadi tail.
      let temp = this.head
      // Tail lama menjadi head baru.
      this.head = this.tail
      // Head lama menjadi tail baru.
      this.tail = temp

      // `next` menyimpan node berikutnya sebelum tautannya dibalik.
      let next = temp
      // `prev` adalah node sebelumnya dalam urutan yang sedang dibalik.
      let prev = null

      // Proses setiap node satu kali, sesuai jumlah node di dalam list.
      for (let i = 0; i < this.length; i++) {
         // Simpan node berikutnya agar tetap dapat dijangkau setelah tautan diubah.
         next = temp.next!
         // Balik tautan node saat ini ke arah node sebelumnya.
         temp.next = prev

         // Geser `prev` ke node saat ini.
         prev = temp
         // Lanjutkan proses ke node berikutnya yang sudah disimpan.
         temp = next
      }

      // Kembalikan list yang sama setelah seluruh tautan dibalik.
      return this
   }
}

// Buat list awal: 1 -> 2 -> 3 -> 4.
const myLinkedList = new ReverseLinkedList(1)
myLinkedList.push(2)
myLinkedList.push(3)
myLinkedList.push(4)
// Balik list; urutannya menjadi 4 -> 3 -> 2 -> 1.
console.log(myLinkedList.reverse())
