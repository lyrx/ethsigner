const signatures = require( '../scripts/signatures')
const assert = require('assert');


assert(signatures.signAndVerifyMessage('dokument.txt'))
