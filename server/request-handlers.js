var fs = require('fs');

getRoutes = {
  '/': serveIndex,
  //serving up all the javascript
  '/js/main.js': serveJS,
  '/js/angular-route.min.js': serveJS,
  '/js/angular-leaflet-directive.min.js': serveJS,
  '/js/jquery.min.js':serveJS,
  '/js/jquery-ui.min.js':serveJS,
  '/js/calendar.js':serveJS,
  '/js/fullcalendar.min.js':serveJS,
  '/js/gcal.js':serveJS,
  //serving up favicon
  '/favicon.ico': serveIcon,
  //serving styles
  '/styles.css': serveStyles,
  '/fullcalendar.css': servefc,
  //serving up all the partials
  '/views/blog.html': serveView,            //need to abstract these views out somehow, also: band pages
  '/views/calendar.html': serveView,
  '/views/bands.html': serveView,
  '/views/photo.html': serveView,
  '/views/map.html': serveView,
  //serving up all the band pages         //gotta use ng-repeats and a 'getBands' service or something like that
  //images
  '/imagelinks': serveImageLinks,
  '/mm.jpg': serveImages, //MAYBE JUST SERVE THE LINKS and then the site can come back for the files???
  '/part.jpg': serveImages //need to learn how to use splats- like, any url with /images prepended activates serveImages

};

postRoutes = {

};

headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.mainHandler = function(request, response) {
  console.log('Serving ' + request.method + ' at ' + request.url);

  if (request.method === 'GET') {
    if (getRoutes[request.url])
      getRoutes[request.url](request, response);
  } else if (request.method === 'POST') {
    if (postRoutes[request.url])
      postRoutes[request.url](request, response);
  } else {
  //404 stuff
  response.writeHead(404);
  response.end('NO PAGE YO');
  }
};

function serveStaticAssets(res, folder, asset, type) {    //set up to use client file, so folder means 'within client'
  fs.readFile(__dirname + '/../client/' + folder + "/" + asset, function(err, data) {
    var status = 200;
    if (err) {
      status = 404;
      console.log("Could not load asset.");
    }
    headers['Content-Type'] = type;
    res.writeHead(200, headers);
    res.end(data);
  });
};

function serveView(request, response) {
  serveStaticAssets(response, 'views', request.url.split('/')[2], 'text/html');
}

function serveJS(request, response) {
  serveStaticAssets(response, 'js', request.url.split('/')[2], 'text/javascript');
}


function serveIndex(request, response) {
  serveStaticAssets(response, '.', 'index.html', 'text/html');
}

function serveStyles(request, response) {
  serveStaticAssets(response, '.', 'styles.css', 'text/css');
}

function servefc(request, response) {
  serveStaticAssets(response, '.', 'fullcalendar.css', 'text/css');
}

function serveIcon(request, response) {
  //serve icon
}

function serveImageLinks(request, response) {
  fs.readdir(__dirname + '/../client/media/', function (err, files) {
    if (err) throw err;
    console.log(files);
    headers['Content-Type'] = 'text/javascript';
    response.writeHead(200, headers);
    response.end(JSON.stringify(files));
  });
}

function serveImages(request, response) {       //wtf am I doing.... just serve up mm first I guess
  serveStaticAssets(response, 'media', request.url.split('/')[1], 'image/jpg');
}








