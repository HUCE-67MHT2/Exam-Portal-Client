import { Component } from "@angular/core";
import { HeaderComponent } from "../../../../../layout/header/header.component";
import { HeaderStudentComponent } from "../../../../../layout/header/header-student/header-student.component";
import { HeaderBackComponent } from "../../../../../layout/header-back/header-back.component";

@Component({
  selector: "app-create-auto-generate",
  imports: [HeaderComponent, HeaderStudentComponent, HeaderBackComponent],
  templateUrl: "./create-auto-generate.component.html",
  styleUrl: "./create-auto-generate.component.scss",
})
export class CreateAutoGenerateComponent {

}
