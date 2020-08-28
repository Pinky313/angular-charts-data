import { Component, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import Utils from '../utils/utils'
import { BulletClass } from '../config/bulletchart';
@Component({
  selector: 'bullet-chart',
  template: ` Normal Bullet Chart
  <div class="gallery with-transitions" #chart id="chart"></div>
  Bullet Chart with Custom Labels
  <div class='gallery with-transitions' #chart2 id='chart2'></div>
    `,
  styleUrls: [
  ],
  encapsulation: ViewEncapsulation.None
})
export class BulletChartComponent {

  bulletChart = new BulletClass();
    data3: any;
    dataWithLabels: any;
  constructor() {
  }
  ngOnInit() {
  
    this.data3 = [
        { "title": "Revenue", "subtitle": "US$, in thousands", "ranges": [150, 225, 300], "measures": [220], "markers": [250], "markerLines": [270] },
        { "title": "Order Size", "subtitle": "US$, average", "ranges": [350, 500, 600], "measures": [100], "markers": [550], "markerLines": [530] },
        { "title": "Satisfaction", "subtitle": "out of 5", "ranges": [3.5, 4.25, 5], "measures": [3.2, 4.7], "markers": [4.4], "markerLines": [3.8] }
      ];
      this.dataWithLabels = [{
        "title": "Revenue",
        "subtitle": "US$, in thousands",
        "ranges": [150, 225, 300],
        "measures": [220],
        "markers": [250, 100],
        "markerLines": [240, 120],
        "markerLabels": ['Target Inventory', 'Low Inventory'],
        "markerLineLabels": ['Break even Inventory', 'Threshold Inventory'],
        "rangeLabels": ['Maximum Inventory', 'Average Inventory', 'Minimum Inventory'],
        "measureLabels": ['Current Inventory']
      }];
  
    this.bulletChart.normal_bullet_chart_width=960;
    this.bulletChart.normal_bullet_chart_height=80;
    this.bulletChart.normal_bullet_chart_margin_bottom=20;
    this.bulletChart.normal_bullet_chart_margin_left=120;
    this.bulletChart.normal_bullet_chart_margin_right=40;
    this.bulletChart.normal_bullet_chart_margin_top=5;
    this.bulletChart.json_data_1=this.data3;
    this.bulletChart.json_data_2=this.dataWithLabels; 
    console.log(this.bulletChart);
    Utils.bulletData(this.bulletChart);

  }
  
  @ViewChild('chart') chart: ElementRef;

  @ViewChild('chart2') chart2: ElementRef;

  ngAfterViewInit() {
    this.bulletChart.selection_data_1 = this.chart.nativeElement.id;
    this.bulletChart.selection_data_2 = this.chart2.nativeElement.id;
    console.log(this.chart.nativeElement.id);
    console.log(this.chart2.nativeElement.id);
  }

  }

