# A Digital Printing Machine

- Treat ebooks like books, limiting them to a specific  number of copies
- There will be a script automatically editing each book by adding a signature based on 
  an Ethereum address alongside the epub, plus injecting a unique serial number directly into the epub.
    - That will make the hash value of each copy unique.
    - Each copy can subsequently be uploaded to IPFS, maintaining uniqueness
- Finally this project will contain scripts providing a process similar to a signing and printing 
  machine. 
    - Sign each copy automatically and individually
    - Upload each copy to IPFS automatically
- Another repo will be used to provide a shop frontend based on Next.JS / Vercel


# Road Map

Basically I am creating a unique edition of the same ebook by injecting
a serial number into each copy. In a second step I create an NFT ERC721 smart contract representing
the eBook and ownership of each copy. You buy the NFT, you buy exactly one unique copy of
the ebook. You have the right to download exactly that copy.

**Remark** I started this project with a simple signature verification function. But this
will be redundant of course, as signatures will be dealed with internally by the NFT.




# Further reading:

- [An Open Market For Words](https://www.alexanderweinmann.com/blog/lyrxbooks)
- [eBooks On The Blockchain](https://www.alexanderweinmann.com/blog/ebooks)



