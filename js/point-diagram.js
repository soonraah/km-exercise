function drawPointDiagram(fieldWidth, fieldHeight, dataset) {
    var radius = 4;
    
    // scale
    var padding = 50;
    var maxX = 100.0;
    var xScale = d3.scale.linear().domain([0, maxX]).range([padding, fieldWidth - padding]);
    var maxY = 100.0;
    var yScale = d3.scale.linear().domain([0, maxY]).range([fieldHeight - padding, padding]);
    
    // axis
    var xAxis = d3.svg.axis().scale(xScale).orient("bottom").ticks(5);
    var yAxis = d3.svg.axis().scale(yScale).orient("left").ticks(5);
    
    // SVG
    var svg = d3
        .select("body")
        .append("svg")
        .attr("width", fieldWidth)
        .attr("height", fieldHeight);
    var points = svg
        .selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cx", function(d) {
            return xScale(d[0]);
        })
        .attr("cy", function(d) {
            return yScale(d[1]);
        })
        .attr("r", function(d) {
            return radius;
        });
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0, " + (fieldHeight - padding) + ")")
        .call(xAxis);
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + padding + ", 0)")
        .call(yAxis);
}
