import { Component, OnInit, ComponentFactoryResolver, ViewChild, Input } from '@angular/core';
import { GraphDirective } from '../graphdirective';
import { ChartService } from 'src/app/chart-service.service';
import Utils from 'src/app/utils/utils';
import { CommonComponent } from '../common-component';

@Component({
  selector: 'app-graph-component',
  templateUrl: './graph-component.component.html',
  styleUrls: ['./graph-component.component.css']
})

export class GraphComponentComponent implements OnInit {

  componentRef: any;
  configuration: any;
  json: any;

  @Input() graphdata: any;
  @ViewChild(GraphDirective, { static: true }) chartArea: GraphDirective;

  constructor(private utility: Utils, private graphService: ChartService, private resolver: ComponentFactoryResolver) { }
  ngOnInit(): void {
    this.getChartDetails(this.graphdata);
  }

  getChartDetails(graphdata: any) {
    this.graphService.getConfiguration(graphdata.id)
      .subscribe(data => {
        this.configuration = data;
        this.getJson(this.graphdata.chartsConfigToChartQuery.id, this.graphdata.paramValues);
      }, error => console.log(error));
  }

  public getJson(id: number, paramValues: String) {
    this.graphService.getJsonData(id, paramValues)
      .subscribe(data => {
        console.log(data);

        this.displayCharts(this.configuration, data);
      }, error => console.log(error));
  }

  displayCharts(graphDetails: any, keyvalue: any) {
    let component = this.utility.getChartComponent(graphDetails.chartsConfigToChartType.id);
    let data = {
      config: graphDetails.config,
      data: keyvalue
    };
    console.log(keyvalue);

    this.json = JSON.stringify(keyvalue);
    const factory = this.resolver.resolveComponentFactory(component);
    this.componentRef = this.chartArea.viewContainerRef.createComponent(factory);
    (<CommonComponent>this.componentRef.instance).data = data;
  }
}
