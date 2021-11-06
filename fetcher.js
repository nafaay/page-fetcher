const fs = require('fs');
const request = require('request');

const argvs = process.argv.slice(2);
const url = argvs[0];
const fileToWrite = argvs[1];
const fetcher = function (url, fileToWrite) {
  request(url, (error, response, body) => {
    if (error || response.statusCode !== 200) {
      console.error("error from url " + error);
      return;
    }
    fs.writeFile(`${fileToWrite}`, body, function (err) {
      if (err) {
        console.error(err.errno);
        return
      }

      else {
        returnSizeFile(null, `${fileToWrite}`);
      }
    });
  })
}

const returnSizeFile = function (err, file) {
  fs.stat(file, (err, stats) => {
    if (err) {
      return null;
    }
    else {
      console.log(stats.size);
      console.log(`Downloaded and saved ${stats.size} bytes into ${fileToWrite}`);
    }
  })
}


fetcher(url, fileToWrite);