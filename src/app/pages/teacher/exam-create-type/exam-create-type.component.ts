import {Component, OnInit} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-exam-create-type',
  templateUrl: './exam-create-type.component.html',
  imports: [
    NgOptimizedImage
  ],
  styleUrl: './exam-create-type.component.scss'
})
export class ExamCreateTypeComponent implements OnInit {
  exam_session_name = 'khong xac dinh';
  exam_session_code = 'khong xac dinh';

  constructor(private route: ActivatedRoute,private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.exam_session_name = params['name'];
      this.exam_session_code = params['code'];
    });
  }

  navigateToECWF() {
    this.router.navigate(['teacher/exam-create-with-file']);
  }

  navigateToAutoGenerate() {
    this.router.navigate(['teacher/exam-create-auto-generate'])
  }

  goBack() {
    this.router.navigate(['/teacher/exam-session-dashboard'], { queryParams: { name: this.exam_session_name, code: this.exam_session_code } });
  }
}
