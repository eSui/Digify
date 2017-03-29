$(document).ready(function(){
  var dataset = [];
  start(dataset);
  var width = 500;
  var height = 800;

  var widthScale = d3.scaleLinear()
                      .domain([0,100])
                      .range([0,width]);

  var color = d3.scaleLinear()
                  .domain([0,100])
                  .range(["#2c7bb6", "#00a6ca","#00ccbc","#90eb9d","#ffff8c","#f9d057","#f29e2e","#e76818","#d7191c"]);

  var xAxis = d3.axisBottom()
                .ticks(10)
                .scale(widthScale);

  var canvas = d3.select("body")
                  .append("svg")
                  .attr("width", width)
                  .attr("height", height)
                  .append("g")
                  .attr("transform", "translate(20,40)");


  canvas.selectAll(".bar")
          .data(dataset)
          .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("id", "bar123")
            .attr("width", function(d){return widthScale(d.popularity);})
            .attr("height", 25)
            .attr("fill",function(d){return color(d.popularity)})
            .attr("y", function(d,i){ return i*30 })
            .attr("data-artist", function(d){return d.id})
            .on("click", function(d){ window.open(d.external_urls.spotify)})
            .attr("width", 0)
            .transition()
            .duration(500)
            .delay(function (d, i) {return i * 50;})
            .attr("width", function (d, i) {return width - widthScale(d.popularity);})
            .attr("width", function (d, i) {
              return widthScale(d.popularity)});

  // Adds Artist name to their respective bar
  canvas.selectAll("text")
            .data(dataset)
            .enter()
              .append("text")
              .attr("fill", "black")
              .attr("y", function(d,i){ return i*30 +13; })
              .text(function(d){return d.name;});


  // Adds an x Axis to display values
  canvas.append('g')
        .attr("transform", "translate(0,-20)")
        .call(xAxis);

  // Adds a label to the Axis
  canvas.append("text")
          .attr("x",width/2)
          .attr("y", -30)
          .style("text-anchor", "middle")
          .text("Popularity %");
})

function start(arr){
  var ourRequest = new XMLHttpRequest();
  var genre = document.getElementById("query").value
  // var url = "https://api.spotify.com/v1/search" + "?q=genre:" + encodeURI('"'+ genre +'"') + "&type=artist";
  var url = "https://api.spotify.com/v1/search?q=genre:rock&type=artist";
  ourRequest.open("GET", url);
  ourRequest.onload = function(){
    var ourData = JSON.parse(ourRequest.responseText);
    // Start taking the data from here and putting them into d3 Stuff once user submits stuff.
    dataset = ourData.artists.items.sort(function(a,b){return a.popularity - b.popularity;}).reverse();

    return dataset;
  }
  ourRequest.send();
};
