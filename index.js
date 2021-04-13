const sourceMap = require('source-map');
const { program } = require('commander');
const fs = require('fs');

program
  .option('-f, --file <filename>', 'source map file')
  .option('-l, --line <line>', 'line number')
  .option('-c, --column <column>', 'column number')
  .option('-h, --help', 'help')

program.version('0.0.1', '-v, --version', 'output the current version');

program.parse(process.argv);

const options = program.opts();
// console.log(options)

if(options.help !== undefined) {
    console.log('\n');
    console.log('-f, --file <filename>  |   source map file');
    console.log('-l, --line <line>      |   line number');
    console.log('-c, --column <column>  |   column number');
    console.log('-h, --help             |   help');
    console.log('-v, --version          |   current version');
    console.log('\n\n');

} else if(options.file === undefined) {
    throw Error('file name is required');
} else if(options.line === undefined) {
    throw Error('line number is required');
} else if(options.column === undefined) {
    throw Error('column number is required');
} else {
    const filename = options.file.toString();
    const line = parseInt(options.line);
    const column = parseInt(options.column);

    fs.readFile(filename, (err, data) => {
        if(err) {
            throw Error(err);
        } else {
            data = JSON.parse(data.toString());
            sourceMap.SourceMapConsumer.with(data, null, consumer => {

                console.log(consumer.sources);
            
                console.log(consumer.originalPositionFor({
                    line: line,
                    column: column,
                }));
            });
        }
    })
}