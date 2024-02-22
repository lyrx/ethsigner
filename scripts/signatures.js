require('dotenv').config();
const {ethers} = require('ethers');
const crypto = require('crypto');
const fs = require('fs');


function signHash(hash, privateKey) {
    const signature = ethUtil.ecsign(hash, privateKey);
    return ethUtil.bufferToHex(signature.r) + ethUtil.bufferToHex(signature.s).slice(2) + ethUtil.bufferToHex(Buffer.from([signature.v])).slice(2);
}

function readDocument(filePath) {
    try {
        return fs.readFileSync(filePath, 'utf8');
    } catch (error) {
        console.error('Fehler beim Lesen der Datei:', error);
        return null;
    }
}


module.exports = {

    signDocument:  async function (document) {
        return await new ethers.
        Wallet(process.env.PRIVATE_KEY).
        signMessage(crypto.createHash('sha256').update(document).digest('hex'));
    },


    signAndVerifyMessage: async function (document) {
        const privateKey = process.env.PRIVATE_KEY;
        const publicKey = process.env.PUBLIC_KEY;

        const hashedDocument = crypto.createHash('sha256').update(document).digest('hex');
        const wallet = new ethers.Wallet(privateKey);
        const signature = await wallet.signMessage(hashedDocument);
        const recoveredAddress = ethers.verifyMessage(hashedDocument, signature, publicKey);

        if (recoveredAddress === publicKey) {
            return true;
        } else {
           return false;
        }


    }
}

