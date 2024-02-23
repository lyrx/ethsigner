# The Galactic Library Of Intellectual Property

Es gibt einen Denkfehler, der bis heute bei der Vermittlung von
Wissen über das Internet nicht überwunden worden ist.

Man hält fälschlicherweise an dem Irrglauben fest, die über Jahrhunderte
bewährte Methode, wissen zu speichern und weiter zu geben, liesse sich
auf einfache Weise ins Internet übertragen: **Bücher**.

Zu diesem Zweck ist das **elektronische Buch** bzw. das **ebook**
erfunden worden.

Aber im Internet ist das **ebook**
eine blosse Metapher -- und eine falsche noch dazu.
Es gibt kein *Analogon* zu Büchern in der digitalen Welt.
Die Metapher vom **ebook* macht deshalb keinen Sinn.

Während die Speicherung und Übertragung von Informationen heute viel einfacher
geworden sind, gingen gleichzeitig einige wertvolle Vorteile des gedruckten Buchs verloren:

- Ein gedrucktes Buch kann einfach als Ware gehandelt werden. Bei digitaler Information 
  haben wir jedoch eine völlig andere Situation
- Geistiges Eigentum liess sich über Bücher bzw. Dokumente klar definieren und schützen. Im
  Internet dagegen kann jede Information viel leichter kopiert oder verändert werden, als das
  bisher der Fall gewesen ist. Es ist deshalb viel schwerer geworden, mit geistigem Eigentum
  Handel zu betreiben oder es auch nur zu definieren.
  
Allerdings haben wir heute eine Technologie zur Verfügung, über die geistiges Eigentum auch
in der digitalen Wert klar definiert werden kann. Zudem kann damit auch wieder Handel betrieben werden:
**Die Blockchain** 

Dieses Projekt wendet die Konzepte der Web3-Welt auf Text als geistiges Eigentum an. Geistiges
Eigentum wird wieder ein Produkt, mit dem gehandelt werden kann: **The Galactic Library Of Intellectual Property**.


# ebooks

- Limit ebooks  to a specific number of copies
- There will be a script automatically editing each ebook by adding a signature based on
  an Ethereum address alongside the epub, plus injecting a unique serial number directly into the epub.
    - That will make the hash value of each copy unique.
    - Each copy can subsequently be uploaded to IPFS, maintaining uniqueness
- Scripts will provide a process similar to a signing and printing
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



