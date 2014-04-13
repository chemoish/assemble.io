const cheerio = require('cheerio');

/**
 * Aggregate styles from the body to a single
 * style tag in the head
 */

module.exports = function (params, callback) {

  // Load current page content
  var $ = cheerio.load(params.content);
  var arr = [];

  // Find the style tags in the body
  $('body style').each(function (i, ele) {
    arr.push($(ele).html());
    $(ele).remove();
  });

  // Append them to the head
  $('head').append('\n<style>\n' + arr.join('\n') + '\n</style>\n');
  params.content = $.html();
  callback();
};

module.exports.options = {
  stage: 'render:post:page'
};