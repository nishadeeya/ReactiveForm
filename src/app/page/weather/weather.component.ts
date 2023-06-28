import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, Validators, FormBuilder, FormsModule, ReactiveFormsModule, AbstractControl, FormControl } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { InputComponent } from 'src/app/common/shared/input/input.component';
@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, MatIconModule, InputComponent],
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],

})
export class WeatherComponent implements OnInit {
  itemForm: FormGroup;
  dataSource: any;
  showTable: boolean;
  personForm: FormGroup;
  personName: any;
  isFormSubmitted: boolean;
  editBtn: boolean;
  buttonText: string;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buttonText = "Submit"
    this.personForm = this.formBuilder.group({
      person: new FormControl('', [Validators.required, Validators.pattern("^[A-Za-z\\s]+$")]),
      items: this.formBuilder.array([this.createItem()])
    })
  }
  get formvalid() {
    return this.personForm.controls;
  }
  createItem(): FormGroup {
    return new FormGroup({
      item: new FormControl('', [Validators.required, Validators.pattern("^[A-Za-z\\s]+$")]),
      price: new FormControl('', [Validators.required, Validators.pattern('[0-9]+(\\.[0-9]{1,2})?')]),
      quantity: new FormControl('', [Validators.required, Validators.pattern('[0-9]+')]),
    })
  }

  addItem(): void {
    const items = this.personForm.get('items') as FormArray;
    items.push(this.createItem());
  }

  removeItem(index: number): void {
    const items = this.personForm.get('items') as FormArray;
    items.removeAt(index);
    console.log(items);
    if (items.value.length == 0) {
      this.showTable = false
    }
  }

  get itemcontrols() {
    return (this.personForm.get('items') as FormArray).controls;
  }

  submitItemForm() {
    if (this.personForm.valid) {
      this.isFormSubmitted = true;
      console.log('Item form submitted:', this.personForm.value, this.personForm.controls['items']);
      this.dataSource = this.personForm.value;
      this.personName = this.personForm.value.person;
      this.showTable = true;
      this.editBtn = false
      this.buttonText = "Submit";
      console.log(this.buttonText);
      this.personForm.reset();
      this.personForm.setControl('items', this.formBuilder.array([this.createItem()])); // Set items array with a single item      console.log('Item form submitted:', this.personForm.controls['items'].value.length);

    } else {
      console.log('Invalid form');
    }
  }
  // getPersonNameErrorMessage() {
  //   if (this.formvalid['person'].errors['required']) {
  //     return 'Required';
  //   }
  //   return this.formvalid['person'].errors['pattern'] ? 'Only alphabets are allowed' : '';
  // }
  editItem() {
    this.buttonText = "Edit";
    this.editBtn = true;
    const itemsArray = this.personForm.get('items') as FormArray;
    itemsArray.clear(); // Clear all existing items in the form array
    // Patch each item from the dataSource array
    this.dataSource.items.forEach(item => {
      itemsArray.push(this.formBuilder.group({
        item: [item.item, [Validators.required, Validators.pattern("^[A-Za-z\\s]+$")]],
        price: [item.price, [Validators.required, Validators.pattern('[0-9]+(\\.[0-9]{1,2})?')]],
        quantity: [item.quantity, [Validators.required, Validators.pattern('[0-9]+')]]
      }));
    });

    this.personForm.patchValue({
      person: this.dataSource.person
    });
  }
}