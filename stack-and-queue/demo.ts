import { MinStack } from "./challenge-min-stack"
import { StackStringReverser } from "./challenge-reverse-string-using-stack"
import { ParenthesisValidator } from "./challenge-valid-parenthesis"
import { Queue } from "./queue"
import { Stack } from "./stack"
import { show, section } from "../demo-utils"

export function runDemo(): void {
    section("stack-and-queue — Stack (LIFO)")
    const stack = new Stack<number>(8)
    stack.push(1).push(2)
    show("top()?.value", stack.top()?.value)
    show("pop()?.value", stack.pop()?.value)
    show("length", stack.length)

    section("stack-and-queue — Queue (FIFO)")
    const queue = new Queue<number>(0)
    queue.enqueue(1).enqueue(2).enqueue(5)
    show("dequeue()?.value", queue.dequeue()?.value)
    show("length", queue.length)

    section("stack-and-queue — MinStack")
    const minStack = new MinStack<number>()
    minStack.push(5).push(2).push(7).push(1)
    show("min()", minStack.min())
    minStack.pop()
    show("min() setelah pop", minStack.min())

    section("stack-and-queue — ParenthesisValidator")
    const validator = new ParenthesisValidator()
    show('isValid("(){}[]")', validator.isValid("(){}[]"))
    show('isValid("([)]")', validator.isValid("([)]"))
    show('isValid("(")', validator.isValid("("))

    section("stack-and-queue — StackStringReverser")
    show('reverse("hello world")', new StackStringReverser().reverse("hello world"))
}
