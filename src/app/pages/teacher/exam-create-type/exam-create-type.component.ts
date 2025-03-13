import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {Router} from "@angular/router";
@Component({
  selector: 'app-exam-create-type',
  templateUrl: './exam-create-type.component.html',
  imports: [
    NgOptimizedImage
  ],
  styleUrl: './exam-create-type.component.scss'
})
export class ExamCreateTypeComponent {
  constructor(private router: Router) {}

  navigateToECWF() {
    this.router.navigate(['teacher/exam-create-with-file']);
  }
}
