import { Component, ViewEncapsulation, ViewChild, ElementRef, Input } from '@angular/core';
import Utils from '../utils/utils'
import { MultiBarChart } from '../config/barchart';
@Component({
    selector: 'bar-chart',
    template: ` 
    <svg height="400" id="multi-barchart"></svg>
 `,
    styleUrls: [
    ],
    encapsulation: ViewEncapsulation.None
})
export class MultiBarHorizontalChartComponent {

    @Input() data: any;

    constructor() {
    }

    ngOnInit() {
        let barChart = new MultiBarChart();
        barChart.id = "multi-barchart";
        barChart.json = this.data.data;
        barChart.config = this.data.config;
        Utils.muliBarChartData(barChart);
    }

}