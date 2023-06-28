import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})

export class InputComponent implements OnInit {

  public formField: AbstractControl;
  @Input() class: string;
  @Input() group: FormGroup;
  @Input() type: string = "objectType";
  @Input() name: string;
  @Input() label: string;
  @Input() required: boolean;
  @Input() isReadOnly: boolean;
  @Input() isFormSubmitted: boolean;
  @Input() modelValue: string;
  @Input() isEdit = true;
  @Input() isErrorOnChange = false;
  @Input() placeholder = '';
  @Input() maxLength: number = 100;
  @Output() public modelValueChange: EventEmitter<any> =
    new EventEmitter<any>();
  @Output() handleFocus: EventEmitter<any> = new EventEmitter<any>();
  @Output() handleBlur: EventEmitter<any> = new EventEmitter<any>();
  @Output() public change: EventEmitter<any> = new EventEmitter();

  constructor(public formBuilder: FormBuilder) { }

  ngOnInit() {
    if (!this.group) {
      this.group = this.formBuilder.group({ [this.name]: [this.modelValue || null] });
    }
    this.formField = this.group.controls[this.name];
  }

  onFocus(evt: any) {
    this.handleFocus.emit(evt);
  }

  onBlur(evt: any) {
    this.handleBlur.emit(evt);
  }

  onValueChange(evt: any) {
    this.change.emit(evt.target.value);
    this.modelValueChange.emit(evt.target.value);
  }
  
}