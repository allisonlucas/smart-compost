var request = require('request')
  // var path = require('path')
  var cheerio = require('cheerio')
  var compostArr = []

  request('http://www.smallfootprintfamily.com/100-things-you-can-compost',  function (error, response, html) {
    if (!error && response.statusCode == 200) {
      // console.log(div:nth-child(1))
      // console.log(html)
      var $ = cheerio.load(html)
      post = $("ol").text()
      console.log(post)
      return post
      // var postItems = post.split('\n')
      // console.log(postItems)
      // compostArr.push(postItems)
      // console.log(compostArr)
    }
  })
}
