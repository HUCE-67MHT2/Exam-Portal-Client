import { Component, OnDestroy, OnInit } from "@angular/core";

import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-info",
  imports: [FormsModule],
  templateUrl: "./info.component.html",
  styleUrls: ["./info.component.scss"],
})
export class InfoComponent implements OnInit, OnDestroy {
saveInfo() {
throw new Error('Method not implemented.');
}
  selectedExamType: string | null = null;
  examName: string = "";
  examPassword: string = "";

  ngOnInit() {
    const savedInfo = localStorage.getItem("info");
    if (savedInfo) {
      const info = JSON.parse(savedInfo);
      this.examName = info.examName || "";
      this.selectedExamType = info.examType || null;
      this.examPassword = info.examPassword || "";
    }
  }

  ngOnDestroy() {
    const info = {
      examName: this.examName,
      examType: this.selectedExamType,
      examPassword: this.examPassword,
    };
    localStorage.setItem("info", JSON.stringify(info));
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



