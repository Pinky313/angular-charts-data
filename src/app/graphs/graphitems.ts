import { Type } from '@angular/core';

export class GraphItems {

  component: any;
  componentname: any;
  id: number;

  constructor(public component_type: Type<any>, public component_id: number, public component_name: String) {
    this.component = component_type;
    this.id = component_id;
    this.componentname = component_name;
  }

  getMyFields() {
    return this.component + " " + this.componentname + "" + this.id;
  }
}

