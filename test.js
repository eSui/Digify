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

  var color = d3.scaleOrdinal(d3.schemeCategory20b);

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
                // .attrTween('d', function(d) {
                //     var i = d3.interpolate(d.startAngle+0.1, d.endAngle);
                //     return function(t) {
                //             d.endAngle = i(t);
                //             return arc(d);
                //           }
                //         }
                //       )};
              }
donutRequest.send();
