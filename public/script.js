(function () {
  angular.module('CompostIt', ['ui.router'])
    .config(configRouter)
    .controller('homeCtrl', homeController)
    .controller('signUpCtrl', signUpController)
    .controller('dropdownCtrl', dropdownController)
    .controller('chartCtrl', chartController)
    .controller('listCtrl', listController)
    configRouter.$inject = ['$stateProvider', '$urlRouterProvider']

$( document ).ready(function() {
  $(".dropdown-button").dropdown({
    inDuration: 300,
    outDuration: 225,
    constrain_width: false, // Does not change width of dropdown to that of the activator
    hover: false, // Do not activate on hover
    gutter: 0, // Spacing from edge
    belowOrigin: true, // Displays dropdown below the button
    alignment: 'left', // Displays dropdown with edge aligned to the left of button
    closeOnClick: false
  })
})

$(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal-trigger').leanModal();
  });


function configRouter($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('home',{
    url: '/',
    templateUrl: 'home.html',
    controller: 'homeCtrl as hCtrl'
    })
    .state('compost-this',{
      url: '/compost-this',
      templateUrl: 'partials/compost-this.html',
      controller: 'listCtrl as lCtrl'
    })
    .state('tracker',{
      url: '/tracker',
      templateUrl: 'partials/tracker.html',
      controller: 'chartCtrl as c'
    })
  $urlRouterProvider.otherwise('/')
}

//controller function
function homeController(){
  var hCtrl = this
  $('.parallax').parallax()
  // $(".dropdown-button").dropdown({hover: false})
}

function dropdownController() {
  var dCtrl = this
  dCtrl.preventDefault = function(e) {
    e.preventDefault()
  }
}

function signUpController() {
    var sCtrl = this

    sCtrl.button = 'Show form'
    sCtrl.show = false
    sCtrl.showFunc = function() {
        sCtrl.show = !sCtrl.show
        if (sCtrl.show === false) {
            sCtrl.button = 'Show form'
        } else {
            sCtrl.button = 'Hide form'
        }
    }
}

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

function chartController () {
  var c = this

  // ==================================================
  // D3 CODE TO POPULATE TEMP GRAPH
  // ==================================================
  d3.json("tempdb.json", function (data) {

    function displayGraph (id, width, height, margin, interpolation, updateDelay) {
      // create an SVG element inside the #graph div that fills 100% of the div
      // var lineData = {
      //   day: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
      //   temp: [140, 143, 145, 131, 141, 140, 144, 147, 148, 150, 151, 151, 148, 147],
      //   humidity: [72, 74, 75, 77, 78, 85, 81, 81, 80, 79, 77, 75, 73, 72],
      //   idealTempMin: [140],
      //   idealTempMax: [160]
      // }

      function draw () {
        var graph = d3.select(".temp-graph").append('svg:svg').attr("id", "graph").attr('width', '550').attr('height', '250').attr('margin', '45')

          // X scale
        var xRange = d3.scale.linear().domain([d3.min(data.day), d3.max(data.day)]).range([margin, width - margin])
        // Y scale
        var yRange = d3.scale.linear().domain([d3.min(data.temp) - 20, d3.max(data.temp) + 20]).range([height - margin, margin])

        // Plot the x and y axes & append
        var xAxis = d3.svg.axis()
          .scale(xRange)
          .orient('bottom')
          .ticks(14)
          .tickSize(-(d3.max(data.temp) + 20), 0, 0)

        var yAxis = d3.svg.axis()
          .scale(yRange)
          .ticks(6)
          .orient('left')
          .tickSize(-(width - margin * 2), 0, 0)

        graph.append('svg:g')
          .attr('class', 'x-axis')
          .attr('transform', 'translate(0,' + (height - margin) + ')')
          .call(xAxis)
          .append("text")
            .attr("x", width / 2 )
            .attr("y",  margin)
            .style("text-anchor", "middle")
            .text("Date")

        graph.append('svg:g')
          .attr('class', 'y-axis')
          .attr('transform', 'translate(' + margin + ',0)')
          .call(yAxis)
          .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - 35)
            .attr("x",0 - ((height + margin) / 2))
            .text("Temperature (F)")

        // Add the ideal temp area rectangle
        graph.append('svg:rect')
          .attr('x', xRange(data.day[0]))
          .attr('y', yRange(data.idealTempMax[0]))
          .attr('width', xRange(d3.max(data.day)) - margin)
          .attr('height', (yRange(data.idealTempMin[0]) - yRange(data.idealTempMax[0])))
          .attr('class', 'area')
          .attr('opacity', 0.5)

        graph.append('svg:g')
          .append("text")
          .attr("x", width)
          .attr("y",  yRange(data.idealTempMax[0]) + 30)
          .style("text-anchor", "middle")
          .text("Ideal Range")

        // Plot the temp line & append it
        var lineFunc = d3.svg.line()
          .x(function (d, i) {
            return xRange(data.day[i])
          })
          .y(function (d, i) {
            return yRange(data.temp[i])
          })
          .interpolate(interpolation)

        graph.append('svg:path')
          .attr('d', lineFunc(data.temp))

        graph.selectAll('path')
            .data([data.temp]) // set the new data
            .attr('d', lineFunc(data.temp)) // apply the new data values
      }
      draw()

      setInterval(function () {
        var j = data.day[13] + 1
        console.log(j)
        data.day.push(j)
        console.log(data.day)
        data.day.shift() // remove the first element of the array
        console.log(data.day)
        var v = data.temp.shift() // remove the first element of the array
        data.temp.push(v) // add a new element to the array (we're just taking the number we just shifted off the front and appending to the end)
        d3.select('#graph').remove()
        draw()
      }, updateDelay)
    }

    displayGraph('#graph', 500, 250, 45, 'basis', 1500)

  })
        // ==================================================
    // D3 CODE TO POPULATE HUMIDITY GRAPH
    // ==================================================
    function displayHumidityGraph (id, width, height, margin, interpolation, updateDelay) {
      // create an SVG element inside the #graph div that fills 100% of the div
      var lineData = {
        day: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
        humidity: [10, 10, 11, 13, 15, 16, 15, 14, 17, 19, 20, 19, 17, 17],
        idealHumidityMin: [40],
        idealHumidityMax: [60]
      }

      function drawHumidity () {
        var humidityGraph = d3.select(".humidity-graph").append('svg:svg').attr("id", "humidityGraph").attr('width', '550').attr('height', '250').attr('margin', '45')

          // X scale
        var xRange = d3.scale.linear().domain([d3.min(lineData.day), d3.max(lineData.day)]).range([margin, width - margin])
        // Y scale
        var yRange = d3.scale.linear().domain([1, d3.max(lineData.idealHumidityMax) + 10]).range([height - margin, margin])

        // Plot the x and y axes & append
        var xAxis = d3.svg.axis()
          .scale(xRange)
          .orient('bottom')
          .ticks(14)
          .tickSize(-(height - 71), 0, 0)

        var yAxis = d3.svg.axis()
          .scale(yRange)
          .ticks(6)
          .orient('left')
          .tickSize(-(width - margin * 2), 0, 0)

        humidityGraph.append('svg:g')
          .attr('class', 'x-axis')
          .attr('transform', 'translate(0,' + (height - margin) + ')')
          .call(xAxis)
          .append("text")
            .attr("x", width / 2 )
            .attr("y",  margin)
            .style("text-anchor", "middle")
            .text("Date")

        humidityGraph.append('svg:g')
          .attr('class', 'y-axis')
          .attr('transform', 'translate(' + margin + ',0)')
          .call(yAxis)
          .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - 35)
            .attr("x",0 - ((height + margin) / 2))
            .text("Humidity (%)")

        // Add the ideal temp area rectangle
        humidityGraph.append('svg:rect')
          .attr('x', xRange(lineData.day[0]))
          .attr('y', yRange(lineData.idealHumidityMax[0]))
          .attr('width', xRange(d3.max(lineData.day)) - margin)
          .attr('height', (yRange(lineData.idealHumidityMin[0]) - yRange(lineData.idealHumidityMax[0])))
          .attr('class', 'area')
          .attr('opacity', 0.5)

        humidityGraph.append('svg:g')
          .append("text")
          .attr("x", width)
          .attr("y",  yRange(lineData.idealHumidityMax[0]) + 30)
          .style("text-anchor", "middle")
          .text("Ideal Range")

        // Plot the temp line & append it
        var lineFunc = d3.svg.line()
          .x(function (d, i) {
            return xRange(lineData.day[i])
          })
          .y(function (d, i) {
            return yRange(lineData.humidity[i])
          })
          .interpolate(interpolation)

        humidityGraph.append('svg:path')
          .attr('d', lineFunc(lineData.humidity))

        humidityGraph.selectAll('path')
            .data([lineData.humidity]) // set the new data
            .attr('d', lineFunc(lineData.humidity)) // apply the new data values
      }
      drawHumidity()

      setInterval(function () {
        var j = lineData.day[13] + 1
        console.log(j)
        lineData.day.push(j)
        console.log(lineData.day)
        lineData.day.shift() // remove the first element of the array
        console.log(lineData.day)
        var v = lineData.humidity.shift() // remove the first element of the array
        lineData.humidity.push(v) // add a new element to the array (we're just taking the number we just shifted off the front and appending to the end)
        d3.select('#humidityGraph').remove()
        drawHumidity()
      }, updateDelay)
    }

    displayHumidityGraph('#humidityGraph', 500, 250, 45, 'basis', 1500)
    // ==================================================
    // D3 CODE TO POPULATE DOUGHNUT
    // ==================================================
    var w = 375, // width
      h = 175, // height
      r = 150, // radius
      ir = 75,
      pi = Math.PI,
      color = ['#2ca02c', '#8c564b']

    c.data = [{
      label: 'GREEN',
      value: 53.846154
    }, {
      label: 'BROWN',
      value: 46.153846
    }]

    c.weightObj = {
      green: [0.5, 3, 0.75, 1],
      brown: [2, 1, 1, 0.5]
    }

    console.log('Green starting percent:' + c.data[0].value)
    console.log('Brown starting percent:' + c.data[1].value)

    c.submit = function () {
      console.log('Submit Data')
      if (c.color == 'Brown') {
        c.weightObj.brown.push(c.weight)
        console.log(c.weightObj.brown)
        var brownTotal = c.weightObj.brown.reduce(function (a, b) {
          return a + b
        })
        console.log("Brown Total: ", brownTotal)
        var greenTotal = c.weightObj.green.reduce(function (a, b) {
          return a + b
        })
        console.log("Green Total: ", greenTotal)
        var percentBrown = (brownTotal / (greenTotal + brownTotal)) * 100
        var percentGreen = (greenTotal / (greenTotal + brownTotal)) * 100
        c.data[1].value = percentBrown
        c.data[0].value = percentGreen
        console.log('New percent brown: ' + c.data[1].value)
        console.log('New percent green: ' + c.data[0].value)
      } else {
        c.weightObj.green.push(c.weight)
        console.log(c.weightObj.green)
        var greenTotal = c.weightObj.green.reduce(function (a, b) {
          return a + b
        })
        console.log("Green Total: ", greenTotal)
        var brownTotal = c.weightObj.brown.reduce(function (a, b) {
          return a + b
        })
        console.log("Brown Total: ", brownTotal)
        var percentGreen = (greenTotal / (greenTotal + brownTotal)) * 100
        var percentBrown = (brownTotal / (greenTotal + brownTotal)) * 100
        c.data[0].value = percentGreen
        c.data[1].value = percentBrown
        console.log('New percent brown: ' + c.data[1].value)
        console.log('New percent green: ' + c.data[0].value)
      }
      c.weight = ''
      c.color = ''

      d3.select('#donut').remove()
      drawDoughnut()

      c.showMoreBrown = false
      c.showLessBrown = false
      c.showFunc = function() {
        if (percentBrown > 60) {
            c.showLessBrown = true
        } else if (percentBrown < 40) {
            c.showMoreBrown = true
        }
      }
    }
    function drawDoughnut() {
      var vis = d3.select(".svg-div")
        .append("svg")
        .attr("id", "donut")
        .data([c.data])
        .attr('width', w)
        .attr('height', h)
        .append('svg:g')
        .attr('transform', 'translate(' + r + ',' + r + ')')

      var arc = d3.svg.arc()
        .outerRadius(r)
        .innerRadius(ir)

      var pie = d3.layout.pie()
        .value(function (d) {
          return d.value
        })
        .startAngle(-90 * (pi / 180))
        .endAngle(90 * (pi / 180))

      var arcs = vis.selectAll('g.slice')
        .data(pie)
        .enter()
        .append('svg:g')
        .attr('class', 'slice')

      arcs.append('svg:path')
        .attr('fill', function (d, i) {
          return color[i]
        })
        .attr('opacity', '0.75')
        .attr('d', arc)

      arcs.append('svg:text')
        .attr('transform', function (d) {
          return 'translate(' + arc.centroid(d) + ')'
        })
        .attr('text-anchor', 'middle')
        .attr('fill', '#ffffff')
        .text(function (d, i) {
          return c.data[i].label
        })
    }
    drawDoughnut()
  }
}())
