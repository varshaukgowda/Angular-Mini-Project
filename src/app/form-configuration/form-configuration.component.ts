import { Component, OnInit } from '@angular/core';
// Component, OnInit → These are from Angular. OnInit is used for initialization when the component loads.
import { SharedDataService } from '../shared/shared-data.service';
// SharedDataService → This is the service that stores the form fields.
import { Router } from '@angular/router';
// Router → This allows navigation to another page after saving the form configuration.

@Component({
  selector: 'app-form-configuration',
  templateUrl: './form-configuration.component.html',
  styleUrls: ['./form-configuration.component.scss']
})

export class FormConfigurationComponent implements OnInit {  
// This exports the class so Angular can use it.
// Implements OnInit, which means it will run ngOnInit() when the component loads.
  public fields = [
    { name: 'Name', show: true, required: false, order: 1 },
    { name: 'Mobile', show: true, required: false, order: 2 },
    { name: 'Email', show: true, required: false, order: 3 },
    { name: 'Address', show: true, required: false, order: 4 }
  ];

  private draggedIndex: number | null = null; // Stores the dragged index
  // This variable stores the index of the field being dragged for drag-and-drop functionality.


  constructor(private sharedData: SharedDataService,
    private router:Router
  ) {}

  ngOnInit() {
    this.fields = JSON.parse(JSON.stringify(this.sharedData.getFields()));
    console.log(this.fields);
    // this.updateGridView();
  }

  updateFieldVisibility(field: any) {
    field.show = !field.show;
    if (!field.show) field.required = false;
  }

  updateFieldRequirement(field: any) {
    field.required = !field.required;
  }

  saveConfiguration() {
    this.sharedData.setFields(this.fields);
    alert('Configuration saved successfully!');
    this.router.navigate(['/member-registration'])
  }

  // Drag & Drop Reordering Logic
  onDragStart(index: number, event: DragEvent) {
    this.draggedIndex = index;
    event.dataTransfer?.setData('text/plain', index.toString());
  }

  onDragOver(event: DragEvent) {
    event.preventDefault(); // Required to allow dropping
  }

  onDrop(targetIndex: number, event: DragEvent) {
    event.preventDefault();
    if (this.draggedIndex === null || this.draggedIndex === targetIndex) return;

    const draggedItem = this.fields.splice(this.draggedIndex, 1)[0];
    this.fields.splice(targetIndex, 0, draggedItem);

    // Update order values
    this.fields.forEach((field, index) => {
      field.order = index + 1;
    });

    this.sharedData.setFields(this.fields); // Save new order
    this.draggedIndex = null; // Reset
  }
}
