import { Component } from '@angular/core';
import { ButtonFormComponent } from '../button-form.component';
@Component({
  selector: 'app-find-button',
  templateUrl: './find-button.component.html',
  styleUrls: ['./find-button.component.scss'],
  imports :[ButtonFormComponent]
})
export class FindButtonComponent {
  handleButtonClick() {
    console.log('Button clicked in button-form!');
  }
}
