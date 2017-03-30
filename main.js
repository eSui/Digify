document.getElementById("submit-btn").addEventListener("click", function(e){
  e.preventDefault();
  var ourRequest = new XMLHttpRequest();
  var genre = document.getElementById("query").value
  var url = "https://api.spotify.com/v1/search" + "?q=genre:" + encodeURI('"'+ genre +'"') + "&type=artist";
  ourRequest.open("GET", url);
  ourRequest.onload = function(){
    var ourData = JSON.parse(ourRequest.responseText);
    // Start taking the data from here and putting them into d3 Stuff once user submits stuff.
    var dataset = ourData.artists.items.sort(function(a,b){return a.popularity - b.popularity;}).reverse();
    console.log(dataset);

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

    var canvas = d3.select("#svg-container")
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

  };
  // Sending request without reloading page :3
  ourRequest.send();
  document.getElementById("submit-btn").disabled = true;
});

document.getElementById("clear-btn").addEventListener("click", function(e){
  e.preventDefault();
  d3.selectAll("svg").remove();
  document.getElementById("submit-btn").disabled = false;
  document.getElementById("follow-btn").disabled = false;
});

document.getElementById("follow-btn").addEventListener("click", function(e){
  e.preventDefault();
  var folloRequest = new XMLHttpRequest();
  var folloGenre = document.getElementById("query").value
  var folloUrl = "https://api.spotify.com/v1/search" + "?q=genre:" + encodeURI('"'+ folloGenre +'"') + "&type=artist";
  folloRequest.open("GET", folloUrl);
  folloRequest.onload = function(){
    var folloData = JSON.parse(folloRequest.responseText);
    // Start taking the data from here and putting them into d3 Stuff once user submits stuff.
    var width = 500;
    var height = 800;

    var folloDataset = folloData.artists.items.sort(function(a,b) {
      return a.followers.total-b.followers.total;
    }).reverse();
    console.log(folloDataset);
    // console.log(folloData.artists.items[0].followers.total);

    // finding max domain for followers
    var numArr= [];
    for (var i = 0; i < folloDataset.length; i++){
      numArr.push(parseInt(folloDataset[i].followers.total));
    }
    var folloDomain = (Math.ceil((numArr[0]/1000000)))*1000000;
   console.log(numArr);


    var folloScale = d3.scaleLinear()
                        .domain([0,folloDomain])
                        .range([0,width]);

    var folloColor = d3.scaleLinear()
                    .domain([0,folloDomain])
                    .range(["#2c7bb6", "#00a6ca","#00ccbc","#90eb9d","#ffff8c","#f9d057","#f29e2e","#e76818","#d7191c"]);

    var folloAxis = d3.axisBottom()
                  .ticks(12)
                  .scale(folloScale);

    var folloCanvas = d3.select("#svg-container")
                    .append("svg")
                    .attr("width", width)
                    .attr("height", height)
                    .append("g")
                    .attr("transform", "translate(20,40)");


    folloCanvas.selectAll(".bar")
            .data(folloDataset)
            .enter()
              .append("rect")
              .attr("class", "bar")
              .attr("id", "bar123")
              .attr("width", function(d){return folloScale( d.followers.total);})
              .attr("height", 25)
              .attr("fill",function(d){return folloColor(d.followers.total)})
              .attr("y", function(d,i){ return i*30 })
              .attr("data-artist", function(d){return d.id})
              .on("click", function(d){ window.open(d.external_urls.spotify)})
              .attr("width", 0)
              .transition()
              .duration(500)
              .delay(function (d, i) {return i * 50;})
              .attr("width", function (d, i) {return width - folloScale(d.followers.total);})
              .attr("width", function (d, i) {
                return folloScale(d.followers.total)});

    // Adds # of Artist Name to their respective bar
    folloCanvas.selectAll("text")
              .data(folloDataset)
              .enter()
                .append("text")
                .attr("fill", "black")
                .attr("y", function(d,i){ return i*30 +13; })
                .text(function(d){return d.name;});

    // Adds an x Axis to display values
    folloCanvas.append('g')
          .attr("transform", "translate(0,-20)")
          .call(folloAxis);

    // Adds a label to the Axis
    folloCanvas.append("text")
            .attr("x",width/2)
            .attr("y", -30)
            .style("text-anchor", "middle")
            .text("Followers");

  };
  // Sending request without reloading page :3
  folloRequest.send();
  document.getElementById("follow-btn").disabled = true;
});

document.getElementById("donut-btn").addEventListener("click", function(e){
  e.preventDefault();
  var donutRequest = new XMLHttpRequest();
  var donutGenre = document.getElementById("query").value;
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
                  .attrTween("d",tweenDonut);

  }
  donutRequest.send();
});
// looping through each scene for scrolling effects.
$(".tile").each(function(){
  // Initiate Scroll Magic here
  // console.log(this);
  var controller = new ScrollMagic.Controller();
  // Building a Scene
  var ourScene = new ScrollMagic.Scene({
      triggerElement: this,
      triggerHook: 0.7,
      // reverse: false
  })
  .setClassToggle(this, 'fade-in')
  // .addIndicators()
  .addTo(controller);
});
