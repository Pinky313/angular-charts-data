import { Component, Input } from '@angular/core';
import Utils from '../utils/utils'
import { PieChart } from '../config/pie';
@Component({
    selector: 'pie-chart-demo1',
    template: `<svg id="pie-chart-1" height="450px"></svg>`,
    styleUrls: [
    ]
})

export class PieChartDemo1 {

    @Input() data: any;
    constructor() { }
    ngOnInit() {
        let pie = new PieChart();
        pie.config = this.data.config;
        pie.id = "pie-chart-1";
        pie.json = this.data.data;
        Utils.PieChartData(pie);
    }
}