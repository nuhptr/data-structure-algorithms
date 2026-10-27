// DATA STRUCTURES
const studentDatabases = ["John Doe", "Jane Smith", "Alice Johnson", "Bob Brown", "Charlie Davis"]

// ALGORITHMS FOR SEARCHING SPECIFIC STUDENTS
function searchStudent(studentName: string) {
   for (let i = 0; i < studentDatabases.length; i++) {
      // IF USING REGULAR EXPRESSION
      if (studentDatabases[i].toLowerCase().includes(studentName.toLowerCase().trim())) {
         return `Student ${studentName} found at index ${i}.`
      }
   }

   return `Student ${studentName} not found.`
}

// CALL FUNCTIONS
console.log(searchStudent("Alice")) // Student Alice Johnson found at index 2.
console.log(searchStudent("John")) // Student John Doe found at index 0.
console.log(searchStudent("Zoe")) // Student Zoe not found.
