import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ChartService } from './chart-service.service';

export class chartData {
  constructor(
    public title: string,
    public config: any,  
    public chartTypeId: any,
    public chartQueryId: any,
    public paramValues: any,
  ) { }
}
export class ChartType {
  constructor(
    public id: number,
    public chartName: String,
    public configuration: any) { }
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
  
  chartList: any;
  reportList: any;
  reportData: Array<any> = [];
  chartDetails: any;
  reportDetails: any;
  configdata: any;
  selectedGraphs = new Array();
  static chartsConfigToChartType: any;
  static chartsConfigToChartQuery: any;
  
  getChartName(chartName: any) {
    this.graphService.getChartTypeId(chartName)
      .subscribe((data: any) => {
        AppComponent.chartsConfigToChartType = data;
      });
  }
 getReportData(reportName: any) {
    // this.reportDetails = (<HTMLSelectElement>document.getElementById("select2")).value;
    this.graphService.getChartQueryId(reportName)
      .subscribe(data => {
        AppComponent.chartsConfigToChartQuery = data;
      });
  }
  selectedGraph(data: any) {
    return localStorage.getItem("selectedGraphs").indexOf(data) != -1 ? true : false;
  }
  storeData() {
    let title =AppComponent.chartsConfigToChartType[0].chartName + " In " + this.reportData[0].dataType;
    let paramValues = null;
    let createChart = new chartData(title, AppComponent.chartsConfigToChartType[0].configuration, AppComponent.chartsConfigToChartType[0].id, AppComponent.chartsConfigToChartQuery[0].id, paramValues);
    this.graphService.storeDataInDB(createChart)
      .subscribe(data => {
        this.getData(data)
      });
  }
  getData(data: any) {
    if (data.trim() === "Success") {
      this.getDetails();
    }
  }
  constructor(private graphService: ChartService) {
  }
  ngOnInit() {
    this.getTypeofChart();
    this.getReportofChart();
    this.getDetails();
  }

  getReportofChart() {
    this.graphService.getChartQueryData()
      .subscribe((data) => {
        this.reportList = data;
        for (let i = 0; i < this.reportList.length; i++) {
          if (this.reportList[i].paramList == "") {
            this.reportData.push(this.reportList[i]);
          }
        }
      }
      );
  }

  getTypeofChart() {
    this.graphService.getChartTypeData()
      .subscribe(data => {
        this.chartList = data;
      });
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
      console.log(this.selectedGraphs.indexOf(option));
      localStorage.setItem("selectedGraph", JSON.stringify(this.selectedGraphs));
    } else {
      for (var i = 0; i < this.selectedGraphs.length; i++) {
        if (this.selectedGraphs[i].id == option.id) {
          this.selectedGraphs.splice(i, 1);
        }
      }
    }
  }
}

