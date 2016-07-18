(function () {
  angular.module('chartModule', [])
    .controller('chartCtrl', chartController)

function chartController () {
  var c = this

  // ==================================================
  // D3 CODE TO POPULATE TEMP GRAPH
  // ==================================================

    d3.json("compostHardcodeDb.json", function (data) {

      c.displayTempGraph = function (id, width, height, margin, interpolation, updateDelay) {

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
          data.day.push(j)
          data.day.shift() // remove the first element of the array
          var v = data.temp.shift() // remove the first element of the array
          data.temp.push(v) // add a new element to the array (we're just taking the number we just shifted off the front and appending to the end)
          d3.select('#graph').remove()
          draw()
          // c.tooHot;
          // c.tooCold;

          c.tempAlert = function() {
            // console.log(data.temp[data.temp.length - 1], 'value')
            if (data.temp[data.temp.length - 1] > data.idealTempMax) {
              console.log(data.temp[data.temp.length - 1], 'value inside if')
              c.tooHot = true
            } else if (data.temp[data.temp.length - 1] < data.idealTempMin) {
              console.log(data.temp[data.temp.length - 1], 'value inside else if - too cold')
              c.tooCold = true
            }
          }
          c.tempAlert()
        }, updateDelay)
      }
    })

    // ==================================================
    // D3 CODE TO POPULATE HUMIDITY GRAPH
    // ==================================================
    console.log('called twice?')
    d3.json("compostHardcodeDb.json", function (data) {
      console.log('called again?')
      c.displayHumidityGraph = function (id, width, height, margin, interpolation, updateDelay) {

        function drawHumidity () {
          var humidityGraph = d3.select(".humidity-graph").append('svg:svg').attr("id", "humidityGraph").attr('width', '550').attr('height', '250').attr('margin', '45')

          // X scale
          var xRange = d3.scale.linear().domain([d3.min(data.day), d3.max(data.day)]).range([margin, width - margin])
          // Y scale
          var yRange = d3.scale.linear().domain([1, d3.max(data.idealHumidityMax) + 10]).range([height - margin, margin])

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
            .attr('x', xRange(data.day[0]))
            .attr('y', yRange(data.idealHumidityMax[0]))
            .attr('width', xRange(d3.max(data.day)) - margin)
            .attr('height', (yRange(data.idealHumidityMin[0]) - yRange(data.idealHumidityMax[0])))
            .attr('class', 'area')
            .attr('opacity', 0.5)

          humidityGraph.append('svg:g')
            .append("text")
            .attr("x", width)
            .attr("y",  yRange(data.idealHumidityMax[0]) + 30)
            .style("text-anchor", "middle")
            .text("Ideal Range")

          // Plot the temp line & append it
          var lineFunc = d3.svg.line()
            .x(function (d, i) {
              return xRange(data.day[i])
            })
            .y(function (d, i) {
              return yRange(data.humidity[i])
            })
            .interpolate(interpolation)

          humidityGraph.append('svg:path')
            .attr('d', lineFunc(data.humidity))

          humidityGraph.selectAll('path')
            .data([data.humidity]) // set the new data
            .attr('d', lineFunc(data.humidity)) // apply the new data values
        }
        drawHumidity()

        setInterval(function () {
          var j = data.day[13] + 1
          data.day.push(j)
          data.day.shift() // remove the first element of the array
          var v = data.humidity.shift() // remove the first element of the array
          data.humidity.push(v) // add a new element to the array (we're just taking the number we just shifted off the front and appending to the end)
          d3.select('#humidityGraph').remove()
          drawHumidity()
          c.letDry = false
          c.addWater = false
          console.log('c.letDry: ', c.letDry, 'c.addWater: ', c.addWater)
          c.humidAlert = function() {
            console.log('data: ', data.humidity, 'ideal max: ', data.idealHumidityMax)
            if (data.humidity[data.humidity.length - 1] > data.idealHumidityMax) {
              c.letDry = true
              console.log('let dry is true')
            } else if (data.humidity[data.humidity.length - 1] < data.idealHumidityMin) {
              c.addWater = true
              console.log('add water is true')
            }
          }
          c.humidAlert()
        }, updateDelay)
      }
    })

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
      green: [0],
      brown: [0]
    }

    c.submit = function () {
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
    c.displayDoughnut = function () {
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
  }
}())
