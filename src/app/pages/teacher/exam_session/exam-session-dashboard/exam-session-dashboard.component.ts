import {Component, ElementRef, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {StudentListPointComponent} from "./student-list-point/student-list-point.component";
import {ExamComponent} from "./exam/exam.component";
import {QuestionBankComponent} from "./question-bank/question-bank.component";
import {CommonModule} from "@angular/common";

@Component({
  selector: "app-exam-session-dashboard",
  standalone: true,
  imports: [
    CommonModule,
    HomeComponent,
    StudentListPointComponent,
    ExamComponent,
    QuestionBankComponent,
  ],
  templateUrl: "./exam-session-dashboard.component.html",
  styleUrl: "./exam-session-dashboard.component.scss",
})
export class ExamSessionDashboardComponent implements OnInit {
  activeTab: string = "home";
  // 2 biến này lấy từ params trên trang home teacher
  exam_session_id: number = 0;

  constructor(private router: Router, private route: ActivatedRoute, private el: ElementRef) {
  }


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.exam_session_id = params['id'];
    });


  }

  goBack() {
    this.router.navigate(['/home/teacher']);
  }

  clickActive(event: Event, tab: string) {
    const target = event.target as HTMLElement;
    const options = this.el.nativeElement.querySelectorAll(".option");
    options.forEach((option: HTMLElement) => {
      option.classList.remove("active");
    });
    target.classList.add("active");
    this.activeTab = tab;
  }
}
