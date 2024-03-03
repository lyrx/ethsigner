# The Galactic Library Of Intellectual Property
![](library.webp)

## Summary

Hi everyone, I am Alex. I am going to launch the "Galactic Library of Intellectual Property" (GLIP) in 20+ days.

GLIP introduces a Web3 based approach to redefining the business model of intellectual property. 

Ebooks and also other textual content  is being "dissolved" into the GLIP. That content will be offered on an "all-you-can-read" basis, not as "monolithic" entities. 

I am shifting the paradigm from ownership of entire texts to access to portions of content.

## Overview 

There is a misconception that has not been overcome since we can
send and store information digitally.

It is mistakenly believed that **books** can exist as **ebooks**  in the internet,
just as their physical cousins
can on a book shelf.

For this wrongful purpose, the **electronic book**  was invented.

But in the internet,  **ebook** is merely a metaphor -- and a false one at that.
There is no *analogue* to books in the digital world.
The metaphor of the **ebook** just makes no sense.

Storage and transmission of information have become much simpler today,
but some valuable benefits of the printed book have been lost:

- A printed book can be easily traded as a commodity. With digital information,
  however, we have a completely different situation. Why should one pay for something
  that cannot be touched or carried away?
- Intellectual property could be clearly defined and protected through books or
  documents. On the internet, however, any information can be copied or altered
  much more easily than has been the case before. 

However, today we have a technology available that can clearly define intellectual
property even in the digital realm: **The Blockchain**

This project will apply the concepts of the Web3 world to text as intellectual property.
Intellectual property can be a business again: **The Galactic Library
Of Intellectual Property** has come to the rescue.

This library will **dissolve** ebooks and make them accessable and tradable in slices, using
a database: **Sell content, not ebooks.**

## Concept + Roadmap

- New ERC20 token contract for **GLIP** tokens.  
- **GLIP** tokens will be used to track reads. 
  -  Amount of **GLIP** tokens spent is tracked in a MongoDB
  -  Amount of **GLIP** tokens available for an ETH address is
     tracked in token contract 

There can be muliple content providers. One **GLIP** token contract per organization (content provider). 
Each content provider will track used tokens individually. Available tokens will be tracked
in the smart contract.


## Roadmap

- **Dissolve Dickens' novel** *"Great Expectations"*: Extract the epub and add it to MongoDB
- Write a viewer for the book in the Next.js frontend
- Place access restrictions on the frontend in such a way, that the book can only be 
  accessed by registered users
- Add reading tracker to MongoDB: Each read is tracked and an amount of GLIP tokens is calculated
  



## Protocols

### Kickoff  26.02.2024

- Keep tags updated and mark partners you're interested in. Maintaining current tags and identifying potential partners can significantly enhance network engagement and opportunities.





## Case Study: A Novel by Charles Dickens.

The novel *Great Expectations* by Charles Dickens is available as a free **ebook**. The author's copyright has
expired. This makes this classic a suitable case study
for the **GLIP** (*Galactic Library
Of Intellectual Property*).

The *ebook* is extracted and its components are transferred to a MongoDB database. At appropriate points,
metadata about the content is added. This metadata
enables the novel to be linked with an **NFT**.

## Further reading:

- [An Open Market For Words](https://www.alexanderweinmann.com/blog/lyrxbooks)
- [eBooks On The Blockchain](https://www.alexanderweinmann.com/blog/ebooks)

## Status

###  2024/03/26

I am currently developing a roadmap that outlines key milestones for both the backend and frontend components of our project.

**Backend**: The focus is on deconstructing EPUB ebooks to upload their content into MongoDB, while also enhancing
their structure. This process is designed to be adaptable, allowing for the method to be applied to various text
formats in the future.

**Frontend**: This will leverage Next.js/Vercel, building upon my blog's existing framework. I've integrated 
MetaMask authentication into the blog as a foundational step. Once the backend setup is in progress,
I will shift focus to the frontend to introduce an NFT-powered subscription service for reading. The service aims to 
be content-agnostic, potentially encompassing news, novels, literature, and even video. Although the architecture is
intended to be flexible, a decision on the specific content for the Proof of Concept (POC) will be made shortly.

###  2024/02/26

I wrote a tool that unpacks an EPUB file and writes all of its contents into MongoDB. Since the actual text is in XHTML format, it is simultaneously converted into Markdown format and also written into the database. This is because the reader in the frontend expects texts in Markdown format. Initially, a single EPUB was written into the database to serve as a basis for the client's development. Next, the Vercel app needs to be adjusted so that MongoDB can be connected. Afterwards, a service will be written (as a "distributed function") that provides data for the frontend.

Developing a tool to seamlessly convert and store EPUB content in MongoDB marks a pivotal step in streamlining digital content management. By facilitating the conversion of XHTML to Markdown, this approach not only enhances the compatibility with frontend readers but also simplifies the development process of client applications. The integration with MongoDB and subsequent adaptation of the Vercel app are crucial for providing a robust service that efficiently serves content to users.


###  2024/02/27
###  2024/02/28

- We deployed a new ERC20 token 'WRT' to polygon mumbai testnet
- We deployed a new  ERC721 NFT to polygon mumbai testnet
- We started implementing the frontend based on Next.JS/Vercel


###  2024/02/29
###  2024/03/01
###  2024/03/02
###  2024/03/03

I started seeding the ebook database. For this project it is essential to have a large collection
of ebooks that can be legally turned into NFTs and whose contents can legally be accessed. I believe
this is the case with the books on Project Gutenberg. This project has a collection of around
72943 ebooks, and I a very basic catalogue in various formats, freely available. I downloaded that
catalog and started seeding our database with it. If everything goes well, I can be ready tomorrow.

Second step will be to populate our frontend with these books and make them tradable on a 2nd layer testnet.

I am very happy I found Krystian who can help me with the frontend.



###  2024/03/04
###  2024/03/05
###  2024/03/06
###  2024/03/07
###  2024/03/08
###  2024/03/09
###  2024/03/10
###  2024/03/11
###  2024/03/12
###  2024/03/13
###  2024/03/14
###  2024/03/15
###  2024/03/16
###  2024/03/17
###  2024/03/18

DELIVERY DAY  !!!!!!!

###  2024/03/19
###  2024/03/20


# I am learning MongoDB

```

{"_id": {"$oid" : "65ddee2c438fd0582a4b965c"}}
{"author": "Charles Dickens"}
{"_id": {"$oid" : "65ddee2c438fd0582a4b965c"}, "author" : "Charles Dickens" }

{"_id": {"$oid" : "65ddee2c438fd0582a4b965c"}, "author" : "Charles Dickens", "epub":{"EPUB/content.opf":1} }


```
