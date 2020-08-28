import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ChartService } from './chart-service.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Subject } from 'rxjs';

export class chartData {
  constructor(
    public title: string,
    //  public chart_type_id:number,
    public chartsConfigToChartType: ChartType,
    public chartsConfigToChartQuery:ChartQuery,
    // public designation:string,
    // public salary:string,
  ) { }

}
export class ChartType {
  constructor(
    public id: number,
    public chartName: String,) { }
}

export class ChartQuery{
  constructor(public id: number,
    public dataType: String,
    public query: String,
    public paramList: String)
  {

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
  chart: any=[];
  selectedGraphs = new Array();
  totalData: any;
  chartQuery: any=[];
  chartsConfigToChartType: any;
  chartsConfigToChartQuery: any;
  addReport() {
      // if(this.getChartData())
      // {
      // this.storeData();
  // }
}
getChartName()
{
  this.chartDetails = (<HTMLSelectElement>document.getElementById("select1")).value;
  this.graphService.getChartTypeId(this.chartDetails)
  .subscribe(data => {
  this.chart=data;
    console.log(this.chart);
    
})
  console.log(this.chart);
  
  // this.chartsConfigToChartType = new ChartType(this.chart[0].id, this.chart[0].chartName);
  ;
}
  
  getReportData()
  {
    this.reportDetails = (<HTMLSelectElement>document.getElementById("select2")).value;
    this.graphService.getChartQueryId(this.reportDetails)
      .subscribe(data => {
        this.chartQuery=data;
      })
      this.chartsConfigToChartQuery = new ChartQuery(this.chartQuery[0].id, this.chartQuery[0].dataType,this.chartQuery[0].query,this.chartQuery[0].paramList );
      ;
      console.log(this.chartsConfigToChartQuery);
      
  }
storeData()
{
  let employee = new chartData(this.totalData, this.chartsConfigToChartType,this.chartsConfigToChartQuery);
    console.log(employee);
    this.graphService.storeData(employee)
      .subscribe(data => {
        alert("Employee created successfully.");
      });
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
        console.log(this.configdata);
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

