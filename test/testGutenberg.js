const gutenberg = require('../scripts/gutenberg')
const assert = require('assert');
const config = require('../scripts/config')
const mongo = require("../scripts/mongoclient");

const sampleEntry = () => {
    return {
        "Text#": "3253",
        "Type": "Text",
        "Issued": "2004-10-01",
        "Title": "The Papers and Writings of Abraham Lincoln, Complete",
        "Language": "en",
        "Authors": "Lincoln, Abraham, 1809-1865; Choate, Joseph Hodges, 1832-1917 [Contributor]; Roosevelt, Theodore, 1858-1919 [Contributor]; Schurz, Carl, 1829-1906 [Contributor]; Lapsley, Arthur Brooks [Editor]",
        "Subjects": "Lincoln, Abraham, 1809-1865; United States -- History -- Civil War, 1861-1865; Illinois -- Politics and government -- To 1865; United States -- Politics and government -- 1861-1865; United States -- Politics and government -- 1837-1841; Lincoln-Douglas Debates, Ill., 1858; Lincoln, Abraham, 1809-1865 -- Correspondence; United States -- Politics and government -- 1829-1837; United States -- Politics and government -- 1841-1845; United States -- Politics and government -- 1845-1861",
        "LoCC": "E456",
        "Bookshelves": "US Civil War; Krieg ; Frieden;Frieden"
    }
}


async function run() {
    const gutenBergCatalog = '/Users/alex/Downloads/pg_catalog.csv'
    const client = await mongo.getClient().connect();
    const books = await gutenberg.parseCSV(gutenBergCatalog)

    console.log(`Number of books: ${books.length}`)


    async function testAddAllShelvesIfNeeded() {
        const res = await gutenberg.addAllShelvesIfNeeded(sampleEntry(), client)
        return res.length == 3
    }

    async function testAddShelveIfNeeded() {
        const shelves = gutenberg.shelves(sampleEntry())
        const shelve = shelves[0]
        await gutenberg.addShelveIfNeeded(shelve, client)
        return true
    }

    async function testBookShelfs() {
        const shelves = await gutenberg.shelves(sampleEntry())
        return shelves.length == 3
    }

    async function testAddAllSubjectsIfNeeded() {
        const res = await gutenberg.addAllSubjectsIfNeeded(sampleEntry(), client)
        return res.length == 11
    }

    async function testAddSubjectIfNeeded() {
        const subjects = gutenberg.subjects(sampleEntry())
        const subject = subjects[0]
        const res = await gutenberg.addSubjectIfNeeded(subject, client)
        return (subject.name == 'Lincoln, Abraham, 1809-1865; United States')
    }


    async function testSubjectStrings() {
        const subjects = gutenberg.subjects(sampleEntry())
        return (subjects.length == 16)
    }


    async function testAddAllAuthorsIfNeeded() {
        const res = await gutenberg.addAllAuthorsIfNeeded(sampleEntry(), client)
        return res.length == 5
    }

    async function testAddAuthorIfNeeded() {
        const authors = gutenberg.authorStrings(sampleEntry())
        const author = authors[1]
        const parsedAuthor = gutenberg.parseAuthorString(author)
        const res = await gutenberg.addAuthorIfNeeded(parsedAuthor, client)
        return res.name == 'Choate'
    }

    async function testParseAuthorString() {
        const authors = gutenberg.authorStrings(sampleEntry())
        const author = authors[1]
        const parsedAuthor = gutenberg.parseAuthorString(author)

        //   console.log(`${author} -> ${JSON.stringify(parsedAuthor,null,2)}`)
        return (
            (parsedAuthor.name == 'Choate')
            &&
            (parsedAuthor.firstNames == 'Joseph Hodges')
            &&
            (parsedAuthor.born == 1832)
            &&
            (parsedAuthor.died == 1917)
        )
    }

    async function testParseAuthorString2() {
        const authors = gutenberg.authorStrings(sampleEntry())
        const author = authors[0]
        const parsedAuthor = gutenberg.parseAuthorString(author)

        //   console.log(`${author} -> ${JSON.stringify(parsedAuthor,null,2)}`)
        return (
            true
        )
    }


    async function testAuthorStrings() {
        const authors = gutenberg.authorStrings(sampleEntry())
        return (
            authors.length == 5
            &&
            authors[1] == 'Choate, Joseph Hodges, 1832-1917 [Contributor]'
        )
    }


    async function testParseCSV() {
        return (books.length == 72943)
    }

    async function bookPageTest() {
        return true
    }


    try {
        assert(await testParseCSV())
        assert(await bookPageTest())
        assert(await testAuthorStrings())
        assert(await testParseAuthorString())
        assert(await testParseAuthorString2())
        assert(await testAddAuthorIfNeeded())
        assert(await testAddAllAuthorsIfNeeded())
        assert(await testSubjectStrings())
        assert(await testAddSubjectIfNeeded())
        assert(await testAddAllSubjectsIfNeeded())
        assert(await testBookShelfs())
        assert(await testAddShelveIfNeeded())
        assert(await testAddAllShelvesIfNeeded())

    } finally {
        // Ensures that the client will close when you finish/error
        client ? await client.close() : console.log(`No client found.`)
    }
}

run().catch(console.dir);
