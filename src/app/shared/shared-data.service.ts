import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class SharedDataService {

  private fields: any[] = [
    { name: 'Name', show: true, required: false, order: 1 },
    { name: 'Mobile', show: true, required: false, order: 2 },
    { name: 'Email', show: true, required: false, order: 3 },
    { name: 'Address', show: true, required: false, order: 4 },
  ];

  getFields() {
    return this.fields.sort((a, b) => a.order - b.order); 
  }

  setFields(fields: any[]) {
    this.fields = fields;
  }
}


