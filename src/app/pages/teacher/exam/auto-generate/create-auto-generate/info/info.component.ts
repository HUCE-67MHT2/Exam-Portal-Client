import { Component, OnInit, OnDestroy } from "@angular/core";

import { FormsModule } from '@angular/forms';

@Component({
  selector: "app-info",
  imports: [FormsModule ],
  templateUrl: "./info.component.html",
  styleUrls: ["./info.component.scss"],
})
export class InfoComponent implements OnInit, OnDestroy {
  selectedExamType: string | null = null;
  examName: string = "";
  examPassword: string = "";

  ngOnInit() {
    const savedExamType = localStorage.getItem("selectedExamType");
    const savedExamName = localStorage.getItem("examName");
    const savedExamPassword = localStorage.getItem("examPassword");

    if (savedExamType) {
      this.selectedExamType = savedExamType;
    }
    if (savedExamName) {
      this.examName = savedExamName;
    }
    if (savedExamPassword) {
      this.examPassword = savedExamPassword;
    }
  }

  ngOnDestroy() {
    if (this.selectedExamType) {
      localStorage.setItem("selectedExamType", this.selectedExamType);
    }
    localStorage.setItem("examName", this.examName);
    localStorage.setItem("examPassword", this.examPassword);
  }

  toggleExamTypeList() {
    const element = document.getElementById("examTypeList");
    if (element) {
      element.classList.toggle("active");
    }
  }

  selectExamType(type: string) {
    this.selectedExamType = type;
    localStorage.setItem("selectedExamType", type);
    const element = document.getElementById("examTypeList");
    if (element) {
      element.classList.remove("active");
    }
  }
}
