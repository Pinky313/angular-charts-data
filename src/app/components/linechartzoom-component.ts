import { Component, ViewEncapsulation, ViewChild, ElementRef, OnInit } from '@angular/core';
import Utils from '../utils/utils'
import { LineChartZoom } from '../config/linechartzooming';
@Component({
    selector: 'linechart-zooming',
    template: `
    <div id="chartZoom" #chartZoom>
    <a href="#" #zoomIn id="zoomIn">Zoom In</a> <a href="#" #zoomOut id="zoomOut">Zoom Out</a>
    </div>
    <div id="chart1" #linechartzooming class='with-transitions'>
        <svg></svg>
    </div>
      
   `,
    styleUrls: [
    ],
    encapsulation: ViewEncapsulation.None
})
export class LineChartZoomingComponent implements OnInit {

    linechart = new LineChartZoom();
    constructor() {
    }
    ngOnInit() {
        this.linechart.json = this.sinAndCos();
        this.linechart.fitScreen = false;
        this.linechart.width = 600;
        this.linechart.height = 300;
        this.linechart.zoom = 1;
        this.linechart.useInteractiveGuideline = true;
        this.linechart.xtickFormat = ',r';
        this.linechart.yaxisLabel = 'Voltage (v)';
        this.linechart.ytickFormat = ',.2f';
    }


    @ViewChild('linechartzooming') linechartdata: ElementRef;

    @ViewChild('zoomIn') zoomIn: ElementRef;

    @ViewChild('zoomOut') zoomOut: ElementRef;

    ngAfterViewInit() {
        this.linechart.selector_1 = this.linechartdata.nativeElement.id;
        this.linechart.selector_2 = this.zoomIn.nativeElement.id;
        this.linechart.selector_3 = this.zoomOut.nativeElement.id;

        Utils.LineChartZooming(this.linechart);
    }
    sinAndCos() {
        var sin = [],
            cos = [];

        for (var i = 0; i < 100; i++) {
            sin.push({ x: i, y: Math.sin(i / 10) });
            cos.push({ x: i, y: .5 * Math.cos(i / 10) });
        }

        return [
            {
                values: sin,
                key: "Sine Wave",
                color: "#ff7f0e"
            },
            {
                values: cos,
                key: "Cosine Wave",
                color: "#2ca02c"
            }
        ];
    }

}