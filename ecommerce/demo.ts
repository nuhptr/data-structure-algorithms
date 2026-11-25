import {
    BinPacking,
    BloomFilter,
    CollaborativeFiltering,
    CosineSimilarity,
    InvertedIndex,
    Levenshtein,
    TfIdf,
} from "./index"
import { show, section } from "../demo-utils"

const docs = [
    { id: "d1", content: "typescript adalah bahasa pemrograman" },
    { id: "d2", content: "javascript juga bahasa pemrograman" },
    { id: "d3", content: "algoritma dan struktur data penting" },
]

export function runDemo(): void {
    section("ecommerce — InvertedIndex")
    const index = new InvertedIndex()
    docs.forEach((doc) => index.addDocument(doc))
    show("search 'pemrograman'", index.search("pemrograman"))

    section("ecommerce — TfIdf")
    const tfidf = new TfIdf()
    docs.forEach((doc) => tfidf.addDocument(doc))
    show("score d1 'bahasa'", tfidf.score("d1", "bahasa"))
    show("search 'struktur'", tfidf.search("struktur", 2))

    section("ecommerce — Levenshtein")
    const lev = new Levenshtein()
    show("distance 'kitten' vs 'sitting'", lev.distance("kitten", "sitting"))
    show("closestMatch 'apl'", lev.closestMatch("apl", ["apple", "apply", "banana"]))

    section("ecommerce — CosineSimilarity")
    const cos = new CosineSimilarity()
    show("similarity [1,0] vs [1,1]", cos.similarity([1, 0], [1, 1]))
    show(
        "mostSimilar",
        cos.mostSimilar(
            [1, 0],
            [
                [1, 1],
                [0, 1],
                [1, 0],
            ],
        ),
    )

    section("ecommerce — CollaborativeFiltering")
    const cf = new CollaborativeFiltering()
    const matrix = {
        alice: { item1: 5, item2: 3, item3: 4 },
        bob: { item1: 4, item3: 5 },
        carol: { item2: 2, item3: 5, item4: 4 },
    }
    show("recommend untuk alice", cf.recommend(matrix, "alice", 2))

    section("ecommerce — BloomFilter")
    const bloom = new BloomFilter(100)
    bloom.add("iphone")
    bloom.add("laptop")
    show("mightContain 'iphone'", bloom.mightContain("iphone"))
    show("mightContain 'tablet'", bloom.mightContain("tablet"))
    show("falsePositiveRate", bloom.getFalsePositiveRate())

    section("ecommerce — BinPacking")
    const packer = new BinPacking()
    const bins = packer.pack(
        [
            { id: "a", size: 30 },
            { id: "b", size: 40 },
            { id: "c", size: 20 },
        ],
        50,
    )
    show("bins", bins)
}
