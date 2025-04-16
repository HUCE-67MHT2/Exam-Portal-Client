import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {CommonModule} from "@angular/common";
import { RouterModule } from '@angular/router';

@Component({
  selector: "app-create-auto-generate",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: "./create-auto-generate.component.html",
  styleUrls: ["./create-auto-generate.component.scss"]
})
export class CreateAutoGenerateComponent implements OnInit {
  activeTab: string = "left";
  exam_session_id = "";
  exam_session_name = "";
  exam_session_description = "";

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.exam_session_id = params["exam_session_id"] || "";
      this.exam_session_name = params["exam_session_name"] || "";
      this.exam_session_description = params["exam_session_description"] || "";
    });
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  goBack() {
    this.router.navigate(["/teacher/exam-create-type"], {
      queryParams: {
        exam_session_id: this.exam_session_id,
        exam_session_name: this.exam_session_name,
        exam_session_description: this.exam_session_description
      }
    });
  }
}
