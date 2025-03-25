import { Component } from "@angular/core";
import { HeaderBackComponent } from "../../../../../layout/header-back/header-back.component";
import { QuestionComponent } from "./question/question.component";
import { InfoComponent } from "./info/info.component";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-create-auto-generate",
  imports: [HeaderBackComponent, QuestionComponent, CommonModule, InfoComponent],
  templateUrl: "./create-auto-generate.component.html",
  styleUrl: "./create-auto-generate.component.scss",
})
export class CreateAutoGenerateComponent {
  activeTab: string = "left";

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
