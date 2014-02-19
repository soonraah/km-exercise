function PointDiagram() {
    this.svg = null;
    this.xScale = null;
    this.yScale = null;
    this.rectSize = 4;
    
    // 散布図の描画
    this.draw = function(fieldWidth, fieldHeight, dataset) {
        var radius = 3;
        
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
        this.svg = d3
            .select("body")
            .append("svg")
            .attr("width", fieldWidth)
            .attr("height", fieldHeight);
        var points = this.svg
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
        this.svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0, " + (fieldHeight - padding) + ")")
            .call(xAxis);
        this.svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + padding + ", 0)")
            .call(yAxis);
        this.xScale = xScale;
        this.yScale = yScale;
    }
    
    // データ追加
    this.addRects = function(points) {
        rectSizeHalf = this.rectSize / 2;
        this.svg
            .selectAll("rect")
            .data(dataset)
            .enter()
            .append("rect")
            .attr("x", function(p) {
                return this.xScale(p.x) - rectSizeHalf;
            })
            .attr("y", function(p) {
                return this.yScale(p.y) - rectSizeHalf;
            })
            .attr("width", this.rectSize)
            .attr("height", this.rectSize)
            .attr("fill", "none")
            .attr("stroke", function(p) {
                return p.getColor();
            })
            .attr("stroke-width", 1);
    }
}
