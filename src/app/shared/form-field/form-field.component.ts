import { AfterContentInit, Component, ContentChild, ElementRef } from '@angular/core';
import { InputFormControlDirective } from '../input-form-control.directive';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.css']
})
export class FormFieldComponent implements AfterContentInit {

  @ContentChild(InputFormControlDirective, { read: ElementRef }) inputRef: ElementRef;

  constructor() { }

  ngAfterContentInit(): void {
    // console.log(this.inputRef.nativeElement.type)
    // console.log(this.inputRef.nativeElement.value)
  }

  get iconText(): string {
    switch (this.inputRef.nativeElement.type) {
      case 'email':
        return 'envelope';
      case 'password':
        return 'unlock-alt';
      case 'number':
        return 'sort-numeric-desc';
      default:
        return '';
      }
  }

}
