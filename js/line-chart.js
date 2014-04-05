function LineChart() {
    this.chart = null;
    this.isInisitalized = false;

    this.data = [];
    this.currentDataIndex = 1;
    this.isFirst = true;
    
    this.initialize = function(fieldWidth, fieldHeight) {
        this.currentDataIndex = 0;
        var tempData;
        if (this.data.length > 0) {
            tempData = this.data;
        } else {
            tempData = [
                ["Trial1", 0]
            ];
        }
        console.log(tempData);

        this.chart = c3.generate({
            size: {
                height: fieldHeight,
                width: fieldWidth
            },
            data: {
                columns: tempData
            },
            axis: {
                x: {
                    label: "Steps"
                },
                y: {
                    label: "Average Innner-cluster Distance"
                }
            }
        });

        this.isFirst = true;
        this.isInisitalized = true;
    };

    this.addPoint = function(value) {
        this.data[this.data.length - 1].push(value);
        this.chart.load({
            columns: this.data
        });

        console.log("addPoint()");
        console.log(this.data);
    };

    this.addNewLine = function() {
        this.currentDataIndex += 1;
        this.data.push(
            [this.getCurrentDataName()]
        );
        this.isFirst = true;
        this.chart.load({
            columns: this.data
        });

        console.log("addNewLine()");
        console.log(this.data);
    };

    this.clear = function() {
        var chart = this.chart;
        setTimeout(function() {
            chart.unload();
        }, 10);
        this.data = [];
        this.isFirst = true;
        this.currentDataIndex = 0;
        console.log("LineChart: cleared!");
        console.log(this.data);
    };

    this.getCurrentDataName = function() {
        return "Trial" + this.currentDataIndex;
    }
}
