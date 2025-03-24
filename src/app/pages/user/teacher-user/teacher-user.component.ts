import { Component } from '@angular/core';
import {UserFormComponent} from "../../../shared/components/user-form/user-form.component";

@Component({
  selector: 'app-teacher-user',
    imports: [
        UserFormComponent
    ],
  templateUrl: './teacher-user.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class TeacherUserComponent {

}
