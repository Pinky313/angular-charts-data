import { Injectable, OnInit } from '@angular/core';
import { GraphItems } from './graphitems';
import { DiscreteBarChartComponent } from '../components/discretebarchart-component';
import { PieChartDemo1 } from '../components/piechart-demo1';

@Injectable()
export class GraphService implements OnInit {


    ngOnInit(): void {
    }
    constructor(private discreteBarChart: DiscreteBarChartComponent, private pieChart: PieChartDemo1) { }

    getAds() {
        return [

            new GraphItems(DiscreteBarChartComponent, 1, "StandardWiseTotalStudents Report1"),
            new GraphItems(PieChartDemo1, 2, "StandardWiseTotalStudents Report2")

        ];
    }
}

