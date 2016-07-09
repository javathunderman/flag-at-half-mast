var feed = require('feed-read'),
    http = require("http"),
    port = process.env.PORT || 5000,
    urls = [
        "https://www.whitehouse.gov/feed/press"
    ];
var zerofunction = 0; //variable set up in case we don't find any proclamations that relate to the flag being at half-mast
// load css styles
var css = '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/foundation/5.5.0/css/foundation.min.css"> ';
css = css + '<style type="text/css">' +require('fs').readFileSync('./style.css').toString() + '</style>'

http.createServer(function (req, res) {
  // send basic http headers to client
  res.writeHead(200, {
      "Content-Type": "text/html",
      "Transfer-Encoding": "chunked"
  });
  // setup simple html page:
  res.write("<html>\n<head>\n<title>Flag at half mast?</title>\n" +css +"</head>\n<body><center><h1>Is the US flag to be flown at half mast today?</h1></center><br /><br />");

  //could be modified to feed from different places.
  for (var j = 0; j < urls.length; j++) {

    // fetch rss feed for the url:
    feed(urls[j], function(err, statements) {

      // loop through the list of statements returned
      for (var i = 0; i < statements.length; i++) {

        // stream everything to client
        displaystatement(res, statements[i]);

        // check we have reached the end of our list of statements & urls
        if( i === statements.length-1 && j === urls.length-1) {
          res.end("</body>\n</html>"); // end http response
        }
      }
    });
  }
	if (zerofunction!=0 && zerofunction != 1) {
	console.log ("No half mast statements found. ");
	res.write ("<h1>Nope. </h1>");
	}
  setTimeout(function() {
    res.end("</body>\n</html>"); // end http response
  }, 4000);

}).listen(port);
console.log("HTTP Listening on: http://localhost:"+port);

//rendering function
function displaystatement(res, a) {


  // send the statement content to client
if (a.title.indexOf("Honoring")!=-1 || a.title.indexOf("half-mast")!=-1 || a.title.indexOf("flag")!=-1) {
  res.write ("<center><h1>Yes </h1> </center><br /><br />");
  res.write('<div class="statement">')
  res.write("<h3>"+a.title +"</h3>");
  res.write("<p><strong>" +a.published +"</strong> <br />\n");
  res.write(a.content+"</p> </div>\n");
  zerofunction++;
  res.write ("<p>Please note that this information may not be entirely accurate. Check with news sites and the official White House website to verify. "); //add a small disclaimer here. this algorithm ain't foolproof folks.
}
else {
console.log("Not a half mast statement. ");
}
}
