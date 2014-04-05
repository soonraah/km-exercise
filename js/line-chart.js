function LineChart() {
    this.chart = null;
    
    this.draw = function(fieldWidth, fieldHeight) {
        var chart = c3.generate({
            size: {
                height: fieldHeight,
                width: fieldWidth
            },
            data: {
                columns: [
                ]
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
    }
}
