import { Component, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import Utils from '../utils/utils'
import { CustomBoxPlot } from '../config/boxplotcustom';
@Component({
  selector: 'box-data',
  template: ` 
    <svg id="box-plot-custom" height="350" ></svg>
     `,
  styleUrls: [
  ],
  encapsulation: ViewEncapsulation.None
})
export class BoxPlotCustomComponent {

  boxPlotCustom = new CustomBoxPlot();
  constructor() {
  }


  ngOnInit() {
    this.boxPlotCustom.json = this.exampleData();
    this.boxPlotCustom.maxBoxWidth = 75;
    this.boxPlotCustom.staggerLabels = true;
    this.boxPlotCustom.id="box-plot-custom";
    Utils.boxPlotCustomChart(this.boxPlotCustom);
  }

  exampleData() {
    return [
      {
        title: 'Custom Attributes 1',
        q1: 1.05, q3: 2.7, maxOutlier: 6, maxRegularValue: 4.4,
        mean: 3.365, median: 1.3, minOutlier: 0.4, minRegularValue: 0.4,
        outlData: [
          { data: 6, text: 'Source 1' },
          { data: 14.5, text: 'Source 2' },
          { data: 12, text: 'Reference Value', color: '#000' },
          { data: 4.5, text: 'Source 3' }
        ],
        seriesColor: '#247E42'
      },
      {
        title: 'Custom Attributes 2',
        q1: 1.05, q3: 2.849999996, maxOutlier: 4.9, maxRegularValue: 4.9,
        mean: 3.4949999, median: 1.5, minOutlier: 0.3, minRegularValue: 0.3,
        outlData: [
          { data: 15.2, text: 'Source 1' },
          { data: 10, text: 'Reference Value', color: '#F00' },
          { data: 7.5, color: '#00F' }
        ],
        seriesColor: '#334693'
      }
    ];
  }
}
