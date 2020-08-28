import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[chart-area]',
})
export class GraphDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
