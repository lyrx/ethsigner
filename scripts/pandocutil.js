const {exec} = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);



module.exports = {

    convertToMarkdown: async function (pathToXHTML) {
        const command = `pandoc -f html-native_divs-native_spans -t markdown "${pathToXHTML}"`;
        const {stdout} = await execPromise(command);
        return stdout; // stdout contains the Markdown content


    }
}

