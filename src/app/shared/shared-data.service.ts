
// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class SharedDataService {
//   private fieldsKey = 'formFields'; // Key for localStorage

//   constructor() {}
//   private fields= [
//     { name: 'Name', show: true, required: false },
//     { name: 'Mobile', show: true, required: false },
//     { name: 'Email', show: true, required: false },
//     { name: 'Address', show: true, required: false }
//   ];
//   // Save fields to localStorage
//   setFields(fields: any[]) {
//     // localStorage.setItem(this.fieldsKey, JSON.stringify(fields));
//     // this.fields=fields;
//   }

//   // Retrieve fields from localStorage
//   getFields(): any[] {
//     // const fields = localStorage.getItem(this.fieldsKey);
//     // return fields ? JSON.parse(fields) : [
//     //   { name: 'Name', show: true, required: false },
//     //   { name: 'Mobile', show: true, required: false },
//     //   { name: 'Email', show: true, required: false },
//     //   { name: 'Address', show: true, required: false }
//     // ];
//     return this.fields;
//   }
// }
// // **********************************************************************************************************
// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class SharedDataService {
//   // Use a BehaviorSubject to store and emit the latest fields
//   private fieldsSubject = new BehaviorSubject<any[]>([
//     { name: 'Name', show: true, required: false },
//     { name: 'Mobile', show: true, required: false },
//     { name: 'Email', show: true, required: false },
//     { name: 'Address', show: true, required: false },
//   ]);

//   // Expose the fields as an observable
//   fields$ = this.fieldsSubject.asObservable();

//   constructor() {}

//   // Method to set fields
//   setFields(fields: any[]) {
//     // Update the BehaviorSubject with the new fields
//     this.fieldsSubject.next([...fields]); // Use spread operator to ensure immutability
//   }

//   // Method to get the current fields
//   getFields(): any[] {
//     return this.fieldsSubject.getValue(); // Get the current value of the fields
//   }
// }


// ***************************************************************************************************************

// This code defines an Angular service called SharedDataService, which stores and manages a list of form fields. It allows you to:
// Get the list of fields (sorted by their order).
// Update the list of fields.
import { Injectable } from '@angular/core';
// The Injectable decorator makes this service available for dependency injection, meaning other components and services can use it.

@Injectable({
  providedIn: 'root',
})
// This means the service is provided at the root level, so it's available throughout the entire Angular app without needing to import it in every module.
// You can use this service anywhere in your application.

export class SharedDataService {
  // This creates a class called SharedDataService, which will store and manage the list of fields.

  private fields: any[] = [
    { name: 'Name', show: true, required: false, order: 1 },
    { name: 'Mobile', show: true, required: false, order: 2 },
    { name: 'Email', show: true, required: false, order: 3 },
    { name: 'Address', show: true, required: false, order: 4 },
  ];

// This is a private array called fields, meaning only this class can access it.

// It contains an array of form field objects. Each object has:
// name: The name of the field (e.g., "Name", "Mobile", etc.).
// show: A boolean (true/false) indicating whether the field should be displayed.
// required: A boolean (true/false) indicating whether the field is required.
// order: A number that determines the order of the fields.

  getFields() {
    return this.fields.sort((a, b) => a.order - b.order); // Return sorted fields
  }

  setFields(fields: any[]) {
    this.fields = fields;
  }
}
// To use this service in a component, you first inject it into the constructor: