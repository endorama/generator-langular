/**
 * grunt-processhtml customBlock
 *
 * Include png file base64 encoded in a <img> tag
 *
 * Example:
 *   <!-- build:pngEncode path/to/image.png -->
 *   <img alt="" src="image.png" />
 *   <!-- /build -->
 */
module.exports = function(processor) {
  processor.registerBlockType('pngEncode', function(content, block, blockLine, blockContent) {
    var grunt = require('grunt');
    var log = grunt.verbose;
    var cheerio = require('cheerio');

    log.subhead('Processing customBlock');
    log.writeflags(block);

    log.write('Encoding content as base64...');

    // encoding is null otherwise would encode the stream as utf-8
    var src = grunt.file.read(block.asset, {encoding: null});
    var base64src = src.toString('base64');

    log.ok();
    log.debug(base64src);

    log.write('Replacing src with encoded string...');

    var $ = cheerio.load(blockContent);
    $('img').attr('src', 'data:image/png;base64,' + base64src);
    var result = content.replace(blockLine, $.html());

    log.ok();

    return result;
  });
};
