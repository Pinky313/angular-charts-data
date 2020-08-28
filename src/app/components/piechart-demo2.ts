import { Component, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import Utils from '../utils/utils'
import { PieChart } from '../config/pie';
@Component({
    selector: 'pie-chart-demo2',
    template: ` 
     <svg  id="pie-chart-2" class="mypiechart"></svg>
`,
    styleUrls: [
    ],
    encapsulation: ViewEncapsulation.None
})
export class PieChartDemo2 {

    pie = new PieChart();
    myDiv: any;

    constructor() {
        // this.pie.labelType = 'value';
        // this.pie.duration = 1200;
        // this.pie.is_disabled = false;
        var testdata = [
            { key: "One", y: 6, color: "#5F5" },
            { key: "Two", y: 2 },
            { key: "Three", y: 9 },
            { key: "Four", y: 7 },
            { key: "Five", y: 4 },
            { key: "Six", y: 3 },
            { key: "Seven", y: 0.5 }
        ];
        // this.pie.testData = testdata;
        // this.pie.height = 550;
        // this.pie.width = 350;
        // this.pie.testData = testdata;
        // this.pie.growOnHover = false;
        // this.pie.id = "pie-chart-2";
        // this.pie.showLabels = true;
        // this.pie.labelThreshold = .08;
        // this.pie.donutLabelsOutside = true;
        // this.pie.donut = true;
        // console.log(this.pie);
        Utils.PieChartData(this.pie);
    }
    ngOnInit() {

    }

}