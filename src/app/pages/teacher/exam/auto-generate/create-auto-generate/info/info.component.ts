import { Component } from "@angular/core";

@Component({
  selector: "app-info",
  templateUrl: "./info.component.html",
  styleUrls: ["./info.component.scss"],
})
export class InfoComponent {
  toggleExamTypeList() {
    const element = document.getElementById("examTypeList");
    if (element) {
      element.classList.toggle("active");
    }
  }
}
