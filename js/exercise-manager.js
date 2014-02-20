function ExerciseManager() {
    this.kmeans = null;
    
    this.svg = null;
    
    this.dataPoints = null;
    
    this.pointDiagram = null;
    
    this.isEstimationPhase = true;
    
    this.dataSupplier = new DataSupplier();
    
    this.initialize = function(k) {
        this.kmeans = new KMeans(k, this.dataPoints);
        this.isEstimationPhase = true;
        this.pointDiagram.clear();
    };
    
    this.step = function() {
        if (this.isEstimationPhase) {
            this.estimate();
            this.isEstimationPhase = false;
        } else {
            this.maximize();
            this.isEstimationPhase = true;
        }
        return this.kmeans.innerClusterDistance;
    };
    
    this.estimate = function() {
        this.kmeans.estimate();
        var centroidPoints = this.kmeans.getCentroidPoints();
        if (this.kmeans.iter == 0) {
            this.pointDiagram.addRects(centroidPoints);
        } else {
            this.pointDiagram.moveRects(centroidPoints);
        }
    }
    
    this.maximize = function() {
        this.kmeans.maximize();
        this.pointDiagram.updateCirclesColor(this.dataPoints, this.kmeans.clusters);
    }
    
    this.clear = function(k, points) {
        kmeans = new KMeans(k, points);
    }
    
    this.createPointsFromDataset = function(dataset) {
        var len = dataset.length;
        var points = new Array(len);
        for (var i = 0; i < len; i++) {
            points[i] = new Point(dataset[i][0], dataset[i][1]);
        }
        return points;
    }
    
    // SVG コンテンツの生成
    this.createSvg = function(fieldWidth, fieldHeight, dataName) {
        var ds = this.dataSupplier.getData(dataName);
        this.pointDiagram = new PointDiagram();
        this.pointDiagram.draw(fieldWidth, fieldHeight, ds);
        this.dataPoints = this.createPointsFromDataset(ds);
    }
    
    // SVG コンテンツの削除
    this.removeSvg = function() {
        d3.select("svg").remove();
    }
}
