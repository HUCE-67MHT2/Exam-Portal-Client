import { Component } from '@angular/core';
import { HeaderComponent } from "../../../layout/header/header.component";
import { SearchBarComponent } from "../../../layout/search-bar/search-bar.component";

@Component({
  selector: 'app-exam',
  imports: [HeaderComponent, SearchBarComponent],
  templateUrl: './exam.component.html',
  styleUrl: './exam.component.scss'
})
export class ExamComponent {

}
