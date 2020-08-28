import { Component, ViewEncapsulation, Input } from '@angular/core';
import { DiscreteBarChart } from '../config/discretebarchart';
import Utils from '../utils/utils';
@Component({
    selector: 'discrete-barchart',
    template: ` 
    <svg class="gallery"  id="discrete-bar-chart"></svg>
 `,
    styleUrls: [
    ],
    encapsulation: ViewEncapsulation.None
})
export class DiscreteBarChartComponent {

    @Input() data: any;
    constructor() { }
    ngOnInit() {
        let discreteBarChart = new DiscreteBarChart();
        discreteBarChart.config = this.data.config;
        discreteBarChart.id = "discrete-bar-chart";
        discreteBarChart.json = this.data.data;
        Utils.discreteBarChart(discreteBarChart);
    }
}