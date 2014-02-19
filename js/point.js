function Point(x, y) {
    this.x = x;
    this.y = y;
    this.clusterId = -1;
    this.getColor = function() {
        var color;
        switch (this.clusterId) {
            case 0:
                color = "cyan";
                break;
            case 1:
                color = "magenta";
                break;
            case 2:
                color = "green";
                break;
            case 3:
                color = "orange";
                break;
            case 4:
                color = "royal blue";
                break;
            default:
                color = "black";
        }
        return color;
    }
}
