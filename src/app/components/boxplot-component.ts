import { Component, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import Utils from '../utils/utils'
import { BoxPlot } from '../config/boxplot';
@Component({
  selector: 'box-plot',
  template: ` 
    <svg id="box-plot" #boxPlot height="350" ></svg>
    `,
  styleUrls: [
  ],
  encapsulation: ViewEncapsulation.None
})
export class BoxPlotComponent {

  boxPlot = new BoxPlot();
  constructor() {
  }

  ngOnInit() {
    this.boxPlot.id="box-plot";
    this.boxPlot.maxBoxWidth = 75;
    this.boxPlot.yDomain_start = 0;
    this.boxPlot.yDomain_end = 500;
    this.boxPlot.staggerLabels = true;
    this.boxPlot.json = this.exampleData();
    Utils.boxPlotChart(this.boxPlot);
  }
 
  exampleData() {
    return [
      {
        label: "Sample A",
        values: {
          Q1: 120,
          Q2: 150,
          Q3: 200,
          whisker_low: 115,
          whisker_high: 210,
          outliers: [50, 100, 225]
        },
      },
      {
        label: "Sample B",
        values: {
          Q1: 300,
          Q2: 350,
          Q3: 400,
          whisker_low: 225,
          whisker_high: 425,
          outliers: [175]
        },
      },
      {
        label: "Sample C",
        values: {
          Q1: 50,
          Q2: 100,
          Q3: 125,
          whisker_low: 25,
          whisker_high: 175,
          outliers: [0]
        },
      }
    ];
  }
}
