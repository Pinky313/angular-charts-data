import { Component, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import Utils from '../utils/utils'
import { LineChart } from '../config/linechart';
@Component({
    selector: 'line-chart',
    template: `
   
    <svg id="line-chart"  height="850" width="950">
    
    </svg>`,
    styleUrls: [
    ],
    encapsulation: ViewEncapsulation.None
})
export class LineChartComponent {

    lineChart = new LineChart();
    constructor() {
         }
         
    sinAndCos() {
        var sin = [],
            sin2 = [],
            cos = [],
            rand = [],
            rand2 = []
            ;

        for (var i = 0; i < 100; i++) {
            sin.push({ x: i, y: i % 10 == 5 ? null : Math.sin(i / 10) }); //the nulls are to show how defined works
            sin2.push({ x: i, y: Math.sin(i / 5) * 0.4 - 0.25 });
            cos.push({ x: i, y: .5 * Math.cos(i / 10) });
            rand.push({ x: i, y: Math.random() / 10 });
            rand2.push({ x: i, y: Math.cos(i / 10) + Math.random() / 10 })
        }

        return [
            {
                area: true,
                values: sin,
                key: "Sine Wave",
                color: "#ff7f0e",
                strokeWidth: 4,
                classed: 'dashed'
            },
            {
                values: cos,
                key: "Cosine Wave",
                color: "#2ca02c"
            },
            {
                values: rand,
                key: "Random Points",
                color: "#2222ff"
            },
            {
                values: rand2,
                key: "Random Cosine",
                color: "#667711",
                strokeWidth: 3.5
            },
            {
                area: true,
                values: sin2,
                key: "Fill opacity",
                color: "#EF9CFB",
                fillOpacity: .1
            }
        ];
    }
    ngOnInit() {
        this.lineChart.XaxisLabel = "Time (s)";
        this.lineChart.duration = 600;
        this.lineChart.json = this.sinAndCos();
        this.lineChart.staggerLabels = true;
        this.lineChart.YaxisLabel = 'Voltage (v)';
        this.lineChart.tickFormat = ',.1f';
        this.lineChart.tickFormat2 = ',.2f';
     //   this.lineChart.width=450;
       // this.lineChart.height=450;
        this.lineChart.id="line-chart";
        this.lineChart.useInteractiveGuideline = true;
        console.log(this.lineChart);
        Utils.LineChart(this.lineChart);
    }
}