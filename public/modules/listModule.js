//IIFE FOR VARIABLE ENCAPSULATION
(function() {
  angular.module('listModule', [])
    .controller('listCtrl', listController)

    function listController(){
    var lCtrl = this
    lCtrl.title = "Compost This! --> 100 Things you CAN compost"

    // var request = require('request')
    // var cheerio = require('cheerio')

    //   lCtrl.scrape = request('http://www.smallfootprintfamily.com/100-things-you-can-compost',  function (error, response, html) {
    //     if (!error && response.statusCode == 200) {
    //       // console.log(div:nth-child(1))
    //       // console.log(html)
    //       var $ = cheerio.load(html)
    //       post = $("ol").text()
    //       console.log(post)
    //       return post
    //       // var postItems = post.split('\n')
    //       // console.log(postItems)
    //       // compostArr.push(postItems)
    //       // console.log(compostArr)
    //     }
    //   })
    }
}())
