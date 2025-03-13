import { Component } from '@angular/core';
import {SearchBarComponent} from '../../../layout/search-bar/search-bar.component';
import {FindButtonComponent} from '../../../layout/button-form/find-button/find-button.component';

@Component({
  selector: 'app-exam-create-type',
  imports: [
    SearchBarComponent,
    FindButtonComponent
  ],
  templateUrl: './exam-create-type.component.html',
  styleUrl: './exam-create-type.component.scss'
})
export class ExamCreateTypeComponent {

}
