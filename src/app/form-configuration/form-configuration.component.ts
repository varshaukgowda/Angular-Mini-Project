import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../shared/shared-data.service';
import { Router } from '@angular/router';  

@Component({
  selector: 'app-form-configuration',
  templateUrl: './form-configuration.component.html',
  styleUrls: ['./form-configuration.component.scss']
})

export class FormConfigurationComponent implements OnInit {  

//array of objects
  public fields = [
    { name: 'Name', show: true, required: false, order: 1 },
    { name: 'Mobile', show: true, required: false, order: 2 },
    { name: 'Email', show: true, required: false, order: 3 },
    { name: 'Address', show: true, required: false, order: 4 }
  ];

  private draggedIndex: number | null = null; 

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

  onDragStart(index: number, event: DragEvent) {
    this.draggedIndex = index;
    event.dataTransfer?.setData('text/plain', index.toString());
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(targetIndex: number, event: DragEvent) {
    event.preventDefault();
    if (this.draggedIndex === null || this.draggedIndex === targetIndex) return;

    const draggedItem = this.fields.splice(this.draggedIndex, 1)[0];
    this.fields.splice(targetIndex, 0, draggedItem);

    this.fields.forEach((field, index) => {
      field.order = index + 1;
    });

    this.sharedData.setFields(this.fields); 
    this.draggedIndex = null; 
  }
}
