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
                color = "royalblue";
                break;
            default:
                color = "grey";
        }
        return color;
    };

    this.toString = function() {
        return "x=" + this.x + ", y=" + this.y + ", clusterId=" + this.clusterId;
    };
};
