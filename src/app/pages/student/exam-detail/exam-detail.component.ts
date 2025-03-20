import {Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren,} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {HeaderStudentComponent} from "../../../layout/header/header-student/header-student.component";
import {SearchBarComponent} from "../../../layout/search-bar/search-bar.component";
import {NgForOf} from "@angular/common";
import {FindButtonComponent} from "../../../layout/button/find-button/find-button.component";

@Component({
  selector: "app-exam-detail",
  templateUrl: "./exam-detail.component.html",
  imports: [HeaderStudentComponent, SearchBarComponent, NgForOf, FindButtonComponent],
  styleUrl: "./exam-detail.component.scss",
})
export class ExamDetailComponent implements OnInit {
  examCode: string = "Mã không xác định"; // Đặt giá trị mặc định để kiểm tra lỗi
  examName: string = "Tên không xác định"; // Đặt giá trị mặc định để kiểm tra lỗi
  examType: string = "Loại không xác định"; // Đặt giá trị mặc định để kiểm tra lỗi
  exams = [
    {
      name: "Đề 01",
      duration: "120 phút",
      dateCreated: "9/11/2024",
      status: "Chưa làm",
    },
    {
      name: "Đề 02",
      duration: "120 phút",
      dateCreated: "9/11/2024",
      status: "Đang làm",
    },
    {
      name: "Đề 03",
      duration: "120 phút",
      dateCreated: "9/11/2024",
      status: "Đã làm",
    },
    {
      name: "Đề 04",
      duration: "120 phút",
      dateCreated: "9/11/2024",
      status: "Đã làm",
    },
    {
      name: "Đề 05",
      duration: "120 phút",
      dateCreated: "9/11/2024",
      status: "Đã làm",
    },
  ];
  @ViewChildren("inputBox") inputBoxes!: QueryList<ElementRef>;
  @ViewChild("passwordForm") passwordForm!: ElementRef;
  inputs = new Array(6).fill(""); // Giả sử có 5 ô input
  isPassword = false;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get("examCode");
    if (param) {
      this.examCode = param;
    }
    this.route.queryParams.subscribe((params) => {
      if (params["name"]) {
        this.examName = params["name"];
      }
      if (params["type"]) {
        this.examType = params["type"];
      }
    });
  }

  ngAfterViewInit() {
    this.inputBoxes.first?.nativeElement.focus(); // Tự động focus vào ô đầu tiên
  }

  onInput(index: number, event: Event) {
    const target = event.target as HTMLInputElement;
    target.value = target.value.toUpperCase(); // Chuyển thành chữ hoa

    if (target.value && index < this.inputBoxes.length - 1) {
      this.inputBoxes.get(index + 1)?.nativeElement.focus(); // Chuyển sang ô kế tiếp
    }

    if (
      this.inputBoxes
        .toArray()
        .every((input) => input.nativeElement.value.length > 0)
    ) {
      this.getPassword(); // Gọi hàm lấy giá trị
    }
  }

  onKeyDown(index: number, event: KeyboardEvent) {
    if (
      event.key === "Backspace" &&
      index > 0 &&
      !(event.target as HTMLInputElement).value
    ) {
      this.inputBoxes.get(index - 1)?.nativeElement.focus(); // Quay lại ô trước nếu nhấn Backspace
    }
  }

  getPassword() {
    const password = this.inputBoxes
      .toArray()
      .map((input) => input.nativeElement.value)
      .join("");
    console.log("Password nhập vào:", password);
  }

  toggleUserInfoSelection(event: Event) {
    event.stopPropagation();
    this.isPassword = !this.isPassword;
  }

  closePasswordModal(event: Event) {
    if (
      this.isPassword &&
      !this.passwordForm.nativeElement.contains(event.target)
    ) {
      this.isPassword = false;
    }
  }
}
