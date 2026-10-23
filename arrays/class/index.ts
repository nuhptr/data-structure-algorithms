class myArray {
   public length: number
   public data: { [key: number]: any }

   constructor() {
      this.length = 0
      this.data = {}
   }

   get(index: number) {
      const value = this.data[index]
      const length = this.length

      // VALIDATE INDEX
      if (index < 0 || index >= length) {
         throw new Error("Index out of bounds")
      }

      return value
   }

   push(item: any) {
      this.data[this.length] = item // Add the item to the end of the array
      this.length++
      return item
   }

   pop() {
      const lastItem = this.data[this.length - 1] // Get the last item in the array
      delete this.data[this.length - 1]
      this.length--
      return lastItem
   }
}

const newArray = new myArray()
newArray.push("hello")
newArray.push("world")
newArray.push("foo")
newArray.push("bar")

console.log(newArray.data) // Output: myArray { length: 4, data: { '0': 'hello', '1': 'world', '2': 'foo', '3': 'bar' } }
console.log(newArray.get(0)) // Output: "hello"
console.log(newArray.get(1)) // Output: "world"

console.log(newArray.pop()) // Output: "bar"
console.log(newArray.data) // Output: myArray { length: 3, data: { '0': 'hello', '1': 'world', '2': 'foo' } }
