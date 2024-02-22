const signatures = require('../scripts/signatures')
const assert = require('assert');
require('dotenv').config();

async function runTests() {
    const docPath = 'dokument.txt'

    const signature = '0xc16a685a9d7ec9c075ff5309bf440f9bf06e4f5bc03a126061eb4aaa022626911d292c1a4a329124d0c1489694764b324a5ef700bf0ff4c3a4e6e9d72dae47341c'
    const signData = await signatures.signDocument(docPath)
    assert(signData.signature == signature)
    const recoveredAddress = await signatures.verifyDocument(
        signData.hash, signData.signature
    )

    assert(recoveredAddress == process.env.PUBLIC_KEY)
    assert(signatures.signAndVerifyMessage(docPath))
}

runTests()






