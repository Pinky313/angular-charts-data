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

  constructor(private graphService: ChartService) {
  }
  ngOnInit() {
    if (localStorage && localStorage.getItem("selectedGraph")) {
      this.selectedGraphs = JSON.parse(localStorage.getItem("selectedGraph"));
    }
    this.getTypeofChart();
    this.getReportofChart();
    this.getDetails();
  }

  getChartName(chartName: any) {
    this.graphService.getChartTypeId(chartName)
      .subscribe((data: any) => {
        AppComponent.chartsConfigToChartType = data;
      },
      error=>console.log(error));
  }

  getReportData(reportName: any) {
    // this.reportDetails = (<HTMLSelectElement>document.getElementById("select2")).value;
    this.graphService.getChartQueryId(reportName)
      .subscribe(data => {
        AppComponent.chartsConfigToChartQuery = data;
      },
      error=>console.log(error));
  }

  selectedGraph() {
    let selectedGraphs: Array<any> = [];
    var checkboxes = <HTMLInputElement[]><any>document.getElementsByName('checkeddata');
    selectedGraphs = JSON.parse(localStorage.getItem("selectedGraph"));
    if (localStorage && localStorage["selectedGraph"]) {
      for (var i = 0; i < checkboxes.length; i++) {
        for (var j = 0; j < selectedGraphs.length; j++) {
          if (checkboxes[i].value == selectedGraphs[j].id) {
            checkboxes[i].checked = true;
          }
        }
      }
    }
  }

  storeData() {
    let title = AppComponent.chartsConfigToChartType[0].chartName + " In " + AppComponent.chartsConfigToChartQuery[0].dataType;
    let paramValues = null;
    let createChart = new chartData(title, AppComponent.chartsConfigToChartType[0].configuration, AppComponent.chartsConfigToChartType[0].id, AppComponent.chartsConfigToChartQuery[0].id, paramValues);
    this.graphService.storeDataInDB(createChart)
      .subscribe(data => {
        if (data.trim() === "Success") {
          this.getDetails();
        }
      }, error => console.log(error));
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
      }, error => console.log(error));
  }

  getTypeofChart() {
    this.graphService.getChartTypeData()
      .subscribe(data => {
        this.chartList = data;
      },error => console.log(error));
  }
  getDetails() {
    this.graphService.getGraphConfiguration()
      .subscribe(data => {
        this.configdata = data;
      },error => console.log(error));
  }

  onCheckboxChange(option, event) {
    if (event.target.checked) {
      this.selectedGraphs.push(option);
    } else {
      for (var i = 0; i < this.selectedGraphs.length; i++) {
        if (this.selectedGraphs[i].id == option.id) {
          this.selectedGraphs.splice(i, 1);
        }
      }
    }
    localStorage.setItem("selectedGraph", JSON.stringify(this.selectedGraphs));
  }
}

