import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import '@angular/compiler';
import {FormsModule} from '@angular/forms';
import 'd3';
import 'nvd3';
import { AppComponent } from './app.component';
import { CandleStickComponent } from './components/candle-stick-component';
import { PieChartDemo1 } from './components/piechart-demo1';
import { PieChartDemo2 } from './components/piechart-demo2';
import Utils from './utils/utils';
import { BoxPlotComponent } from './components/boxplot-component';
import { BulletChartComponent } from './components/bulletchart-component';
import { BoxPlotCustomComponent } from './components/boxplot-custom-component';
import { CumulativeLineChartComponent } from './components/cumulativelinechart-component';
import { LineChartComponent } from './components/linechart-component';
import { LineChartZoomingComponent } from './components/linechartzoom-component';
import { DiscreteBarChartComponent } from './components/discretebarchart-component';
import { MultiBarHorizontalChartComponent } from './components/barchartdata-component';
import {  GraphService } from './graphs/graphservice';
import { GraphDirective } from './graphs/graphdirective';
import { CumulativeLineChart } from './config/cumulativelinechart';
import { GraphComponentComponent } from './graphs/graph-component/graph-component.component';
import { ChartService } from './chart-service.service';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    MultiBarHorizontalChartComponent,
    BoxPlotComponent,
    CandleStickComponent,
    PieChartDemo1,
    BoxPlotCustomComponent,
    PieChartDemo2,
    BulletChartComponent,
    CumulativeLineChartComponent,
    LineChartZoomingComponent,
    DiscreteBarChartComponent,
    LineChartComponent,
    GraphDirective,
    GraphComponentComponent
  ],
  imports: [
    BrowserModule,HttpClientModule,FormsModule
  ],
  entryComponents: [
    DiscreteBarChartComponent,
    PieChartDemo1,
    PieChartDemo2,
    BoxPlotComponent,BoxPlotCustomComponent,
    BulletChartComponent,
    CandleStickComponent,
    CumulativeLineChart,
    DiscreteBarChartComponent,
    LineChartComponent,
    LineChartZoomingComponent,
    MultiBarHorizontalChartComponent
  ],
  providers: [ChartService,MultiBarHorizontalChartComponent, AppComponent, Utils, GraphService,DiscreteBarChartComponent,PieChartDemo1,GraphComponentComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
