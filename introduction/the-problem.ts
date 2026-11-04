// Data structure: a list of student names to search.
const studentDatabases = ["John Doe", "Jane Smith", "Alice Johnson", "Bob Brown", "Charlie Davis"]

/**
 * Searches the student list for a name or partial name.
 * The comparison ignores letter case and trims whitespace from the search input.
 *
 * @param studentName The full name or part of the name to find.
 * @returns A message indicating whether the student was found and, if so, the index.
 */
function searchStudent(studentName: string) {
    // Check each student name in order until a match is found.
    for (let i = 0; i < studentDatabases.length; i++) {
        // Normalize the strings before checking whether the name contains the query.
        if (studentDatabases[i].toLowerCase().includes(studentName.toLowerCase().trim())) {
            return `Student ${studentName} found at index ${i}.`
        }
    }

    // No match was found after checking the entire list.
    return `Student ${studentName} not found.`
}

// Example calls: partial names can match a full name, while unknown names return not found.
console.log(searchStudent("Alice")) // Student Alice Johnson found at index 2.
console.log(searchStudent("John")) // Student John Doe found at index 0.
console.log(searchStudent("Zoe")) // Student Zoe not found.
