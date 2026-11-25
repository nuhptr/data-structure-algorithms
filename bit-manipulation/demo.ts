import { BitOperations, BitmaskDP, XORAlgorithms } from "./index"
import { show, section } from "../demo-utils"

export function runDemo(): void {
    section("bit-manipulation — BitOperations")
    const bits = new BitOperations()
    show("countSetBits(7)", bits.countSetBits(7))
    show("isPowerOfTwo(8)", bits.isPowerOfTwo(8))
    show("reverse via get/set demo: setBit(0,2)", bits.setBit(0, 2))

    section("bit-manipulation — XORAlgorithms")
    const xor = new XORAlgorithms()
    show("singleNumber [2,2,1]", xor.singleNumber([2, 2, 1]))
    show("findMissingNumber [0,1,3]", xor.findMissingNumber([0, 1, 3]))
    show("reverseBits(1)", xor.reverseBits(1))
    show("hammingDistance(1,2)", xor.hammingDistance(1, 2))

    section("bit-manipulation — BitmaskDP")
    const dp = new BitmaskDP()
    show("minimumXORSum [1,2] [2,3]", dp.minimumXORSum([1, 2], [2, 3]))
}
