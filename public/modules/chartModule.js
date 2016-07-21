(function () {
  angular.module('chartModule', [])
    .controller('chartCtrl', chartController)

chartController.$inject = ['$scope']

function chartController ($scope) {
  var c = this

  // Wait until page is loaded to run d3 code
  $scope.$on('$viewContentLoaded', function(event){

    // Clear interval to prevent duplicates on page revisit
    clearInterval(window.tempClear)
    clearInterval(window.humidityClear)
    // Remove element to prevent duplicates on page revisit
    d3.select('#graph').remove()
    d3.select('#humidityGraph').remove()

    // ==================================================
    // D3 CODE TO POPULATE TEMP GRAPH
    // ==================================================

    d3.csv("temp_moisture_read.csv", tempFunc)

    function tempFunc (data) {

      var parseDate = d3.time.format("%Y-%m-%d %H:%M:%S").parse

      data.forEach(function(d) {
        d.day = parseDate(d.day)
        d.temp = +d.temp
      })

      c.displayTempGraph = function (id, width, height, margin, interpolation, updateDelay) {

        function draw () {

          var minDay = data[0].day
          var maxDay = data[data.length - 1].day
          var minTemp = d3.min(data, function(d){return d.temp})
          var maxTemp = d3.max(data, function(d){return d.temp})

          var graph = d3.select(".temp-graph").append('svg:svg').attr("id", "graph").attr('width', '550').attr('height', '250').attr('margin', '45')

          // X scale
          var xRange = d3.time.scale().domain([minDay, maxDay]).range([margin, width - margin])
          // Y scale
          var yRange = d3.scale.linear().domain([minTemp - 20, d3.max([maxTemp + 20, data[0].idealTempMax])]).range([height - margin, margin])

          // Plot the x and y axes & append
          var xAxis = d3.svg.axis()
            .scale(xRange)
            .orient('bottom')
            .ticks(6)
            .tickSize(-d3.max([maxTemp + 20, data[0].idealTempMax]) + 20, 0, 0)

          var yAxis = d3.svg.axis()
            .scale(yRange)
            .ticks(5)
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
            .attr('x', xRange(minDay))
            .attr('y', yRange(data[0].idealTempMax))
            .attr('width', xRange(maxDay) - margin)
            .attr('height', (yRange(data[0].idealTempMin) - yRange(data[0].idealTempMax)))
            .attr('class', 'area')
            .attr('opacity', 0.5)

          graph.append('svg:g')
            .append("text")
            .attr("x", width)
            .attr("y",  yRange(data[0].idealTempMax) + 30)
            .style("text-anchor", "middle")
            .text("Ideal Range")

          // Plot the temp line & append it
          var lineFunc = d3.svg.line()
            .x(function (d, i) {
              return xRange(d.day)
            })
            .y(function (d, i) {
              return yRange(d.temp)
            })
            .interpolate(interpolation)

          graph.append('svg:path')
            .attr('d', lineFunc(data))

          graph.selectAll('path')
            .data([data]) // set the new data
            .attr('d', lineFunc(data)) // apply the new data values

        } // draw function

        draw()

        window.tempClear = setInterval(function () {

          d3.csv("temp_moisture_read_live.csv", tempFunc2)

          function tempFunc2 (data2) {
            data2.forEach(function(d) {
              d.day = parseDate(d.day)
              d.temp = +d.temp
            })

            data.push(data2[0])
            console.log('data after push: ', data)
            data.shift()
            console.log('data after shift: ', data)
            // remove the old graph
            d3.select('#graph').remove()
            draw()

          }

          // --- ALERT SHOW / HIDE FUNCTION --- //
          // c.tooHot = false
          // c.tooCold = false
          //
          // c.tempAlert = function() {
          //   if (data.temp[(data.length - 1).temp] > data[0].idealTempMax) {
          //     c.tooHot = true
          //   } else if (data.temp[(data.length - 1).temp] < data[0].idealTempMin) {
          //     c.tooCold = true
          //   }
          // }
          // c.tempAlert()

        }, updateDelay) // set interval
      } // displayTempGraph
      c.displayTempGraph('#graph', 500, 250, 45, 'basis', 5000)
    } // d3.csv data read function

    // ==================================================
    // D3 CODE TO POPULATE HUMIDITY GRAPH
    // ==================================================

    d3.csv("temp_moisture_read.csv", humidityFunc)

    function humidityFunc (data) {

      var parseDate = d3.time.format("%Y-%m-%d %H:%M:%S").parse

      data.forEach(function(d) {
        d.day = parseDate(d.day)
        d.humidity = +d.humidity
      })

      c.displayHumidityGraph = function (id, width, height, margin, interpolation, updateDelay) {

        function drawHumidity () {

          var minDay = data[0].day
          var maxDay = data[data.length - 1].day
          var minHumidity = d3.min(data, function(d){return d.humidity})
          var maxHumidity = d3.max(data, function(d){return d.humidity})

          var humidityGraph = d3.select(".humidity-graph").append('svg:svg').attr("id", "humidityGraph").attr('width', '550').attr('height', '250').attr('margin', '45')

          // X scale
          var xRange = d3.time.scale().domain([minDay, maxDay]).range([margin, width - margin])
          // Y scale
          var yRange = d3.scale.linear().domain([d3.min([minHumidity - 20, 0]), d3.max([maxHumidity + 20, data[0].idealHumidityMax])]).range([height - margin, margin])

          // Plot the x and y axes & append
          var xAxis = d3.svg.axis()
            .scale(xRange)
            .orient('bottom')
            .ticks(6)
            .tickSize(-d3.max([maxHumidity + 20, data[0].idealHumidityMax]) - 70, 0, 0)

          var yAxis = d3.svg.axis()
            .scale(yRange)
            .ticks(5)
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
            .attr('x', xRange(minDay))
            .attr('y', yRange(data[0].idealHumidityMax))
            .attr('width', xRange(maxDay) - margin)
            .attr('height', (yRange(data[0].idealHumidityMin) - yRange(data[0].idealHumidityMax)))
            .attr('class', 'area')
            .attr('opacity', 0.5)

          humidityGraph.append('svg:g')
            .append("text")
            .attr("x", width)
            .attr("y", yRange(data[0].idealHumidityMax) + 30)
            .style("text-anchor", "middle")
            .text("Ideal Range")

          // Plot the humidity line & append it
          var lineFunc = d3.svg.line()
            .x(function (d, i) {
              return xRange(d.day)
            })
            .y(function (d, i) {
              return yRange(d.humidity)
            })
            .interpolate(interpolation)

          humidityGraph.append('svg:path')
            .attr('d', lineFunc(data))

          humidityGraph.selectAll('path')
            .data([data]) // set the new data
            .attr('d', lineFunc(data)) // apply the new data values
        }
        drawHumidity()

        window.humidityClear = setInterval(function () {

          d3.csv("temp_moisture_read_live.csv", humidityFunc2)

          function humidityFunc2 (data2) {
            data2.forEach(function(d) {
              d.day = parseDate(d.day)
              d.humidity = +d.humidity
            })

            data.push(data2[0])
            console.log('data after push: ', data)
            data.shift()
            console.log('data after shift: ', data)
            // remove the old graph
            d3.select('#humidityGraph').remove()
            drawHumidity()

          }

          // --- ALERT SHOW / HIDE FUNCTION --- //
          // c.letDry = false
          // c.addWater = false
          //
          // c.humidAlert = function() {
          //
          //   if (data.humidity[data.humidity.length - 1] > data.idealHumidityMax) {
          //     c.letDry = true
          //   } else if (data.humidity[data.humidity.length - 1] < data.idealHumidityMin) {
          //     c.addWater = true
          //   }
          // }
          // c.humidAlert()

        }, updateDelay)

      } // displayHumidityGraph

    c.displayHumidityGraph('#humidityGraph', 500, 250, 45, 'basis', 5000)

    } // d3.csv humidity read function

    // ==================================================
    // D3 CODE TO POPULATE DOUGHNUT
    // ==================================================
    var w = 375, // width
        h = 175, // height
        r = 150, // radius
        ir = 75,
        pi = Math.PI,
        color = ['#2ca02c', '#8c564b']

    c.data = [
      {
        label: 'GREEN',
        value: 50
      },
      {
        label: 'BROWN',
        value: 50
      }
    ]

    c.weightObj = {
      green: [5],
      brown: [5]
    }

    c.submit = function () {
      console.log('submit donut form function')
      if (c.color == 'Brown') {
        c.weightObj.brown.push(c.weight)
        var brownTotal = c.weightObj.brown.reduce(function (a, b) {
          return a + b
        })
        var greenTotal = c.weightObj.green.reduce(function (a, b) {
          return a + b
        })
        var percentBrown = (brownTotal / (greenTotal + brownTotal)) * 100
        var percentGreen = (greenTotal / (greenTotal + brownTotal)) * 100
        c.data[1].value = percentBrown
        c.data[0].value = percentGreen
      } else {
        c.weightObj.green.push(c.weight)
        var greenTotal = c.weightObj.green.reduce(function (a, b) {
          return a + b
        })
        var brownTotal = c.weightObj.brown.reduce(function (a, b) {
          return a + b
        })
        var percentGreen = (greenTotal / (greenTotal + brownTotal)) * 100
        var percentBrown = (brownTotal / (greenTotal + brownTotal)) * 100
        c.data[0].value = percentGreen
        c.data[1].value = percentBrown
      }
      c.weight = ''
      c.color = ''

      d3.select('#donut').remove()
      c.displayDoughnut()

      // --- ALERT SHOW / HIDE FUNCTION --- //
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

    c.displayDoughnut = function () {
      console.log('data: ', c.data, c.weightObj)
      console.log('display donut called')
      console.log($('.svg-div'))

      var vis = d3.select(".svg-div")
        .append("svg")
        .attr("id", "donut")
        .data([c.data])
        .attr('width', w)
        .attr('height', h)
        .append('svg:g')
        .attr('transform', 'translate(' + r + ',' + r + ')')

        console.log('vis?', vis)

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
    } // c.displayDoughnut function

    c.displayDoughnut()

  }) // $scope.$on wait until page is loaded

} // Chart controller

}()) // IIFE
