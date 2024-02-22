require('dotenv').config();
const {ethers} = require('ethers');
const crypto = require('crypto');
const fs = require('fs');


function signHash(hash, privateKey) {
    const signature = ethUtil.ecsign(hash, privateKey);
    return ethUtil.bufferToHex(signature.r) + ethUtil.bufferToHex(signature.s).slice(2) + ethUtil.bufferToHex(Buffer.from([signature.v])).slice(2);
}

function readDocument(filePath) {

    return fs.readFileSync(filePath, 'utf8');

}


module.exports = {

    signDocument: async function (document) {
        const hashedDocument = crypto.createHash('sha256').update(document).digest('hex')
        return {
            path: document,
            hash: hashedDocument,
            signature: await new ethers.Wallet(process.env.PRIVATE_KEY).signMessage(hashedDocument)
        };
    },

    verifyDocument: async function (hashedDocument, signature) {
        return ethers.verifyMessage(hashedDocument, signature, process.env.PUBLIC_KEY)
    },

    signAndVerifyMessage: async function (document) {
        const signData = await this.signDocument(document)
        const recoveredAddress = await this.verifyDocument(
            signData.hash, signData.signature
        )
        return  (recoveredAddress === process.env.PUBLIC_KEY ?  true : false)
    }
}

