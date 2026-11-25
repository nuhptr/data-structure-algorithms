import { AhoCorasick } from "./aho-corasick"
import { BoyerMoore } from "./boyer-moore"
import { KMP } from "./kmp"
import { RabinKarp } from "./rabin-karp"
import { SuffixArray } from "./suffix-array"
import { ZAlgorithm } from "./z-algorithm"
import { show, section } from "../demo-utils"

const text = "abracadabra"
const pattern = "abra"

export function runDemo(): void {
    section("strings — KMP")
    show("findAll", new KMP().findAll(text, pattern))

    section("strings — BoyerMoore")
    show("findAll", new BoyerMoore().findAll(text, pattern))

    section("strings — RabinKarp")
    show("contains", new RabinKarp().contains(text, pattern))

    section("strings — ZAlgorithm")
    show("findAll", new ZAlgorithm().findAll(text, pattern))
    show("buildZArray", new ZAlgorithm().buildZArray("abacaba"))

    section("strings — AhoCorasick")
    const ac = new AhoCorasick()
    ac.addPattern("he").addPattern("she").addPattern("his").addPattern("hers")
    ac.build()
    show("search 'ushers'", ac.search("ushers"))

    section("strings — SuffixArray")
    const sa = new SuffixArray()
    const s = "banana"
    show("build('banana')", sa.build(s))
    show("search 'ana'", sa.search(s, "ana"))
}
