var donutRequest = new XMLHttpRequest();
var donutGenre = "rock";
var donutUrl = "https://api.spotify.com/v1/search" + "?q=genre:" + encodeURI('"'+ donutGenre +'"') + "&type=artist";
var donutDataset = [];
donutRequest.open("GET", donutUrl);
donutRequest.onload = function(){

  var donutData = JSON.parse(donutRequest.responseText);
  // Start taking the data from here and putting them into d3 Stuff once user submits stuff.

    donutDataset = donutData.artists.items.sort(function(a,b) {
    return a.followers.total-b.followers.total;
  }).reverse();
  console.log(donutDataset);
  //d3 section
  // attempt #3
  var width = 800,
      height = 800,
      radius = Math.min(width, height)/2;

  var color = d3.scaleOrdinal(d3.schemeCategory20);

  var svg = d3.select("#svg-container")
              .append("svg")
              .attr("width", width)
              .attr("height", height)
              .append("g")
              .attr("transform", 'translate('+ width/2 + ',' + height/2 + ')');

  var arc = d3.arc()
              .innerRadius(radius - 75)
              .outerRadius(radius);

  var pie = d3.pie()
          .value(function(d){return d.followers.total})
          .sort(null);

  function tweenDonut(b) {
      b.innerRadius = 0;
      var i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
      return function(t) { return arc(i(t)); };
    }

    var charts = d3.select("#svg-container");

    var createLegend = function(artistName){
      var legends = charts.select(".legend")
                    .selectAll('g')
                      .data(donutDataset)
                      .enter()
                      .append('g')
                      .attr('transform', function(d,i){return 'translate('+ (i*150+50)+", 10)"});

      legends.append("circle")
              .attr('r', 6)
              .style('fill', function(d,i){return color(i)});
      legends.append('text')
              .attr('dx', '1em')
              .attr('dy', '.3em')
              .text(function(d){return d})
    }



  var path = svg.selectAll("path")
                .data(pie(donutDataset))
                .enter()
                .append("path")
                .attr("class", "path")
                .attr("d", arc)
                .attr("fill", function(d, i){return color(d.data.followers.total)})
                .transition()
                .ease (d3.easeLinear)
                .duration(2000)
                .attrTween('d', tweenDonut);

              }
donutRequest.send();
