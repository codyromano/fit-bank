echo 'Watching JavaScript files for changes' && (webpack --watch >> /dev/null &);
echo 'Starting Node server' && node index.js