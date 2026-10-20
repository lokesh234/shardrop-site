// CloudFront viewer-request function for shardrop.com.
// - www.shardrop.com redirects to shardrop.com
// - /privacy and /d gain a trailing slash; folder URLs serve their index.html
// Query strings (challenge links carry ?n=&s=) are kept on every redirect.
function handler(event) {
  var request = event.request;
  var host = request.headers.host ? request.headers.host.value : '';
  var uri = request.uri;

  if (host === 'www.shardrop.com') {
    return redirect('https://shardrop.com' + uri + query(request.querystring));
  }
  if (uri.endsWith('/')) {
    request.uri = uri + 'index.html';
    return request;
  }
  var last = uri.substring(uri.lastIndexOf('/') + 1);
  if (last.indexOf('.') === -1 && uri.indexOf('/.well-known/') !== 0) {
    return redirect(uri + '/' + query(request.querystring));
  }
  return request;
}

function redirect(location) {
  return {
    statusCode: 301,
    statusDescription: 'Moved Permanently',
    headers: { location: { value: location }, 'cache-control': { value: 'public, max-age=3600' } },
  };
}

function query(qs) {
  var parts = [];
  for (var key in qs) {
    var entry = qs[key];
    var values = entry.multiValue ? entry.multiValue : [entry];
    for (var i = 0; i < values.length; i++) {
      parts.push(key + (values[i].value === '' ? '' : '=' + values[i].value));
    }
  }
  return parts.length ? '?' + parts.join('&') : '';
}
