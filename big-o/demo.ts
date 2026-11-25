import { ConstantTimeExample, LinearTimeExample, QuadraticTimeExample } from "./index"
import { show, section } from "../demo-utils"

export function runDemo(): void {
    section("big-o — ConstantTimeExample O(1)")
    show("getElement([10,20,30], 1)", new ConstantTimeExample().getElement([10, 20, 30], 1))

    section("big-o — LinearTimeExample O(n)")
    const groceries = ["milk", "bread", "eggs", "flour"]
    show("findItems 'eggs'", new LinearTimeExample().findItems(groceries, "eggs"))

    section("big-o — QuadraticTimeExample O(n²)")
    show("pairs dari [1,2,3]", new QuadraticTimeExample().findPairs([1, 2, 3]))
}
