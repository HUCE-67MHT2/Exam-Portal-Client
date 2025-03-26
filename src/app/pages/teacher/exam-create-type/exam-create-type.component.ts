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
  exam_session_id = 0;

  constructor(private route: ActivatedRoute,private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.exam_session_id = params['id'];
    });
  }

  navigateToECWF() {
    this.router.navigate(['teacher/exam-create-with-file'], { queryParams: { id: this.exam_session_id } });
  }

  navigateToAutoGenerate() {
    this.router.navigate(['teacher/exam-create-auto-generate'])
  }

  goBack() {
    this.router.navigate(['/teacher/exam-session-dashboard'], { queryParams: { id: this.exam_session_id } });
  }
}
