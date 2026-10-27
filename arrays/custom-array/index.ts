class MyArray<T> {
   length: number
   data: Record<number, T>

   constructor() {
      this.length = 0
      this.data = {}
   }

   // TO ADD NEW ITEM
   push(item: T): number {
      this.data[this.length] = item
      this.length++

      return this.length
   }

   // TO GET SPECIFIC NUMBER
   get(index: number): T | undefined {
      return this.data[index]
   }

   // TO REMOVE LAST INDEX
   pop(): T | undefined {
      if (this.length === 0) return undefined

      const lastIndex = this.length - 1
      const lastItem = this.data[lastIndex]

      delete this.data[lastIndex]

      this.length = lastIndex

      return lastItem
   }

   // TO
   shift(): T | undefined {
      if (this.length === 0) return undefined

      const firstItem = this.data[0]

      for (let i = 0; i < this.length - 1; i++) {
         this.data[i] = this.data[i + 1]
      }

      delete this.data[this.length - 1]
      this.length--

      return firstItem
   }

   delete(index: number): T | undefined {
      if (!Number.isInteger(index) || index < 0 || index >= this.length) return undefined

      const item = this.data[index]

      for (let i = index; i < this.length - 1; i++) {
         this.data[i] = this.data[i + 1]
      }

      delete this.data[this.length - 1]
      this.length--

      return item
   }
}

const myNewArray = new MyArray<string>()

myNewArray.push("one")
myNewArray.push("two")
myNewArray.push("three")
// myNewArray.pop()
// myNewArray.shift()
myNewArray.delete(1)
// console.log(myNewArray.get(0));
console.log(myNewArray)
console.log("===============")

console.log(myNewArray.get(0))
