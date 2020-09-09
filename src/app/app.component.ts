import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ChartService } from './chart-service.service';
import { select } from 'd3';

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
  selectedChart: any;
  selectedQuery: any;
  chartsTypeSelection: any;
  chartsQuerySelection: any;
  selectedGraphs = new Array();

  constructor(private graphService: ChartService) {
  }
  ngOnInit() {
    this.chartsTypeSelection="Select";
    this.chartsQuerySelection="Select";
    if (localStorage && localStorage.getItem("selectedGraph")) {
      this.selectedGraphs = JSON.parse(localStorage.getItem("selectedGraph"));
    }
    this.getTypeofChart();
    this.getReportofChart();
    this.getDetails();
  }

  getChartName(data: any) {
    this.selectedChart=data
  }

  getReportData(data:any){
    this.selectedQuery=data;
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
    let title = this.selectedChart.chartName+ " In " +this.selectedQuery.dataType;
    let paramValues = null;
    let createChart = new chartData(title, this.selectedChart.configuration, this.selectedChart.id, this.selectedQuery.id, paramValues);
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
      }, error => console.log(error));
  }
  getDetails() {
    this.graphService.getGraphConfiguration()
      .subscribe(data => {
        this.configdata = data;
      }, error => console.log(error));
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

