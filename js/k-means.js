function KMeans(k, points) {
    this.k = k;
    
    this.clusters = null;
    
    this.points = points;
    
    this.iter = 0;
    
    // initialize by random centroids
    this.initialize = function() {
        clusters = new Array(k);
        var cnt = 0;
        var selectedIds = new Array(0);
        while (cnt < this.k) {
            var index = Math.floor((Math.random() * k));
            if (selectedIds.indexOf(index) == -1) {
                clusters[cnt] = new Cluster(points[index].x, points[index].y);
                ++cnt;
                selectedIds.push(index);
            } else {
                continue;
            }
        }
    };
    
    // calculate centroids
    this.estimate = function() {
        if (iter == 0) {
            this.initialize();
        } else {
            for (var i = 0, len = clusters.length; i < len; i++) {
                calcCentroid(clusters[i]);
            }
        }
        ++iter;
    }
    
    // apply points to the nearest centroid
    this.maximize = function() {
        for (var j = 0, numClusters = clusters.length; j < numClusters; j++) {
            clusters[j].memberIds = new Array(0);
        }
        for (var i = 0, len = points.length; i < len; i++) {
            var minClusterId = -1;
            var minDistance = 9999999.9;
            for (var j = 0, numClusters = clusters.length; j < numClusters; j++) {
                var distance = calcDistance(points[i], clusters[j].centroid);
                if (distance < minDistance) {
                    minClusterId = j;
                    minDistance = distance;
                }
            }
            points[i].clusterId = minClusterId;
            clusters[minClusterId].memberIds.push(i);
        }
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
    this.calcCentroid = function(cluster) {
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
    }
}
