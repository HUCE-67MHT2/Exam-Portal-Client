import { Component, ElementRef, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { StudentListComponent } from "./student-list/student-list.component";
import { ExamComponent } from "./exam/exam.component";
import { QuestionBankComponent } from "./question-bank/question-bank.component";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-exam-session-dashboard",
  standalone: true,
  imports: [
    CommonModule,
    HomeComponent,
    StudentListComponent,
    ExamComponent,
    QuestionBankComponent,
  ],
  templateUrl: "./exam-session-dashboard.component.html",
  styleUrl: "./exam-session-dashboard.component.scss",
})
export class ExamSessionDashboardComponent implements OnInit {

  activeTab: string = "home";
  // 2 biến này sẽ được lấy ra khi navigate từ trang khác
  exam_session_name = "Kỳ thi Toán học 2025";
  exam_session_code = "MATH2025HK1";



  constructor(private router: Router, private route: ActivatedRoute, private el: ElementRef) {}

  ngOnInit(): void {
    // this.route.queryParams.subscribe(params => {
    //   this.exam_session_name = params['name'];
    //   this.exam_session_code = params['code'];
    // });
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
