import { Component, ElementRef } from "@angular/core";
import { HeaderComponent } from "../../../../layout/header/header.component";
import { Router } from "@angular/router";
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
    HeaderComponent,
    HomeComponent,
    StudentListComponent,
    ExamComponent,
    QuestionBankComponent,
  ],
  templateUrl: "./exam-session-dashboard.component.html",
  styleUrl: "./exam-session-dashboard.component.scss",
})
export class ExamSessionDashboardComponent {
  activeTab: string = "home";

  constructor(private router: Router, private el: ElementRef) {}

  goBack() {
    this.router.navigate(["home/teacher"]);
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
