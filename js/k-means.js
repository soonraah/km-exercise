function KMeans(k, points) {
    this.k = k;
    
    this.clusters = null;
    
    this.points = points;
    
    this.iter = 0;

    this.innerClusterDistance = 0.0;
    
    // initialize by random centroids
    this.initialize = function() {
        this.clusters = new Array(this.k);
        var cnt = 0;
        var selectedIds = new Array(0);
        while (cnt < this.k) {
            var index = Math.floor(Math.random() * this.points.length);
            if (selectedIds.indexOf(index) == -1) {
                var cluster = new Cluster(this.points[index].x, this.points[index].y);
                cluster.centroid.clusterId = cnt;
                this.clusters[cnt] = cluster;
                ++cnt;
                selectedIds.push(index);
            }
        }
    };
    
    // calculate centroids
    this.estimate = function() {
        if (this.iter == 0) {
            this.initialize();
        } else {
            for (var i = 0, len = this.clusters.length; i < len; i++) {
                this.calcCentroid(this.clusters[i], i);
            }
        }
    }
    
    // apply points to the nearest centroid
    this.maximize = function() {
        for (var j = 0, numClusters = this.clusters.length; j < numClusters; j++) {
            this.clusters[j].memberIds = new Array(0);
        }
        var sum = 0.0;
        var len = points.length;
        for (var i = 0; i < len; i++) {
            var minClusterId = -1;
            var minDistance = 9999999.9;
            for (var j = 0, numClusters = this.clusters.length; j < numClusters; j++) {
                var distance = this.calcDistance(this.points[i], this.clusters[j].centroid);
                if (distance < minDistance) {
                    minClusterId = j;
                    minDistance = distance;
                }
            }
            this.points[i].clusterId = minClusterId;
            this.clusters[minClusterId].memberIds.push(i);
            sum += minDistance * minDistance;
        }
        this.iter += 1;
        this.innerClusterDistance = sum / len;
    }
    
    // calculate distance between point A and point B
    this.calcDistance = function(pointA, pointB) {
        // euclidean distance
        var sum = 0.0;
        sum += Math.pow(pointA.x - pointB.x, 2);
        sum += Math.pow(pointA.y - pointB.y, 2);
        return Math.sqrt(sum);
    }
    
    // calculate centroid of a cluster
    this.calcCentroid = function(cluster, clusterId) {
        // euclidean distance
        var sumX = 0.0;
        var sumY = 0.0;
        var len = cluster.memberIds.length;
        for (var i = 0; i < len; ++i) {
            var memberId = cluster.memberIds[i];
            sumX += points[memberId].x;
            sumY += points[memberId].y;
        }
        cluster.centroid.x = sumX / len;
        cluster.centroid.y = sumY / len;
        cluster.centroid.clusterId = clusterId;
    }
    
    // return point array of centroids
    this.getCentroidPoints = function() {
        var ret = [];
        for (var i = 0, len = this.clusters.length; i < len; ++i) {
            ret.push(this.clusters[i].centroid);
        }
        return ret;
    }
}
