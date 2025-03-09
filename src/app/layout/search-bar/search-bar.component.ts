import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FindButtonComponent } from "../button-form/find-button/find-button.component";

@Component({
  selector: 'app-search-bar',
  imports: [FindButtonComponent],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  textColor: string = '#686868';

  changeColor() {
    this.textColor = '#686868';
  }

}

