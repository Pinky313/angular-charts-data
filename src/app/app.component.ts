import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ChartService } from './chart-service.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Subject, of, Observable } from 'rxjs';

export class chartData {
  constructor(
    public configuration: any,
    public title: string,
    //  public chart_type_id:number,
    public chartsConfigToChartType: ChartType,
    public chartsConfigToChartQuery: ChartQuery,
    // public designation:string,
    public paramValues: any,
    // public salary:string,
  ) { }

}
export class ChartType {
  constructor(
    public id: number,
    public chartName: String,) { }
}

export class ChartQuery {
  constructor(public id: number,
    public dataType: String,
    public query: String,
    public paramList: String) {

  }
}

@Component({
  selector: 'main',
  templateUrl: 'app.component.html',
  styleUrls: [
    '../../node_modules/nvd3/build/nv.d3.css'
  ],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit {
  chartList: Array<any> = [];
  reportList: Array<any> = [];
  chartDetails: any;
  reportDetails: any;
  configdata: any;
  configuration: any;
  selectedGraphs = new Array();
  title: any;
  static chartsConfigToChartType;
  static chartsConfigToChartQuery: any;

  getChartName() {
    this.chartDetails = (<HTMLSelectElement>document.getElementById("select1")).value;
    this.graphService.getChartTypeId(this.chartDetails)
      .subscribe((data: any) => {
        this.chartType(data);
      });
  }

  chartType(data: any) {
    AppComponent.chartsConfigToChartType = data;
  }
  chartQuery(data: any) {
    AppComponent.chartsConfigToChartQuery = data;
  }
  getReportData() {
    this.reportDetails = (<HTMLSelectElement>document.getElementById("select2")).value;
    this.graphService.getChartQueryId(this.reportDetails)
      .subscribe(data => {
        this.chartQuery(data);
      });
  }
  storeData() {
    if (this.chartDetails.trim() === "Pie Chart") {
      this.configuration = "{ \"labelType\": \"value\", \"duration\": 1200, \"is_disabled\": false, \"height\": 650, \"width\": 650, \"growOnHover\": false, \"showLabels\": true, \"labelThreshold\": 0.08, \"donutLabelsOutside\": false, \"id\": \"pie-chart-1\", \"donut\": false }";
    }
    if (this.chartDetails.trim() === "Bar Chart") {
      this.configuration ="{ \"duration\": 250, \"showValues\": true, \"staggerLabels\": true, \"id\": \"discrete-bar-chart\" }";
    }
    if (this.chartDetails.trim() === "Multi Bar Horizontal Chart") {
      this.configuration = "{  \"duration\": 350, \"showControls\": \"true\", \"showValues\": \"true\", \"margin_left\": 77, \"margin_bottom\": 30, \"margin_top\": 38, \"margin_right\": 38, \"format\": \',.2f\'}" ;
    }    
    this.title = this.chartDetails + "In " + this.reportDetails;
    let paramValues = null;
    let createChart = new chartData(this.configuration, this.title,AppComponent.chartsConfigToChartType[0],AppComponent.chartsConfigToChartQuery[0],paramValues);
    this.graphService.storeData(createChart)
      .subscribe(data => {
        console.log(data);
      });
      this.getDetails();
}
  constructor(private graphService: ChartService) {
    this.chartList = [
      { name: "Pie Chart" },
      { name: "Bar Chart" },
      { name: "Multi Bar Horizontal Chart" }
    ];
    this.reportList = [
      { name: "Subject Wise Report" },
      { name: "Standard Wise Report" }
    ]
  }
  ngOnInit() {
    this.getDetails();
  }

  getDetails() {
    this.graphService.getGraphConfiguration()
      .subscribe(data => {
        this.configdata = data;
      });
  }

  onCheckboxChange(option, event) {
    if (event.target.checked) {
      this.selectedGraphs.push(option);
      console.log(this.selectedGraphs);
    } else {
      for (var i = 0; i < this.selectedGraphs.length; i++) {
        if (this.selectedGraphs[i].id == option.id) {

          this.selectedGraphs.splice(i, 1);

        }
      }
    }
  }
}

