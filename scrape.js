var express = require('express')
var app = express()
var request = require('request')
var cheerio = require('cheerio')
var fs = require('fs')

app.get('/scrape', function(req, res){

  var url = 'http://www.smallfootprintfamily.com/100-things-you-can-compost'

  request(url,  function (error, response, html) {
    if (!error && response.statusCode == 200) {
      // console.log(html)
      var $ = cheerio.load(html)
      var post = $("ol").text()
      // console.log(post)
      // return post
      // Parameter 1 :  output.json - this is what the created filename will be called
      // Parameter 2 :  JSON.stringify(json, null, 4) - the data to write, here we do an extra step by calling JSON.stringify to make our JSON easier to read
      // Parameter 3 :  callback function - a callback function to let us know the status of our function

      fs.writeFile('compost-this.html', JSON.stringify(post, null, null), function(err){

        console.log('File successfully written! - Check your project directory for the compost-this.json file');

      })
    }
  })

})

app.listen('8080')

exports = module.exports = app
