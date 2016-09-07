/**
 * insert page title at the top of the html
 */

var pageTitleDiv = $('<div id="pageTitle"></div>');
pageTitleDiv.append("<h1>Webpage Title</h1>")
$("body").prepend(pageTitleDiv);