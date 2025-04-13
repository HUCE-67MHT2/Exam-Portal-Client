import {Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren,} from "@angular/core";
import {HeaderStudentComponent} from "../../../layout/header/header-student/header-student.component";
import {NgForOf} from "@angular/common";
import {ExamSession} from '../../../core/models/examSession.model';
import {Exam} from '../../../core/models/exam.model';
import {ExamService} from '../../../core/services/exam/exam.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: "app-exam-detail",
  templateUrl: "./exam-detail.component.html",
  imports: [HeaderStudentComponent, NgForOf,FormsModule],
  styleUrl: "./exam-detail.component.scss",
})
export class ExamDetailComponent implements OnInit {
  examSession: ExamSession | null = null;
  searchTerm: string = '';
  examList: Exam[] = [];
  filteredExams: Exam[] = [];
  @ViewChildren("inputBox") inputBoxes!: QueryList<ElementRef>;
  @ViewChild("passwordForm") passwordForm!: ElementRef;
  inputs = new Array(6).fill(""); // Giả sử có 5 ô input
  isPassword = false;

  constructor(
    private examService: ExamService,
  ) {
  }

  ngOnInit() {
    const storedExam = localStorage.getItem('selectedExam');
    if (storedExam) {
      this.examSession = JSON.parse(storedExam);
    }
    this.getExams()
  }

  getExams = () => {
    this.examService.getExams(this.examSession?.id).subscribe({
      next: (response) => {
        console.log(response);
        if (response.status === 200) {
          this.examList = response.body.exams;
        }
        this.filteredExams = [...this.examList];

        // Kiểm tra dữ liệu đã lấy về
        console.log("Exam List:", this.examList);
        console.log("Filtered Exam List:", this.filteredExams);
      },
      error: (error) => {
        console.error("Error fetching exams:", error);
      }
    });
  }

  getStatus(startDate: Date, endDate: Date): string {
    const now = new Date();

    // Nếu startDate và endDate là chuỗi thì cần chuyển đổi:
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (now < start) {
      return 'Sắp mở';
    } else if (now >= start && now <= end) {
      return 'Đang mở';
    } else {
      return 'Đã đóng';
    }
  }


  filterExam() {
    const normalizedSearchTerm = this.removeVietnameseTones(this.searchTerm.toLowerCase());
    this.filteredExams = this.examList.filter(exam => {
      const normalizedExamName = this.removeVietnameseTones(exam.name.toLowerCase());
      const normalizedExamDescription = this.removeVietnameseTones(exam.description.toLowerCase());
      return normalizedExamName.includes(normalizedSearchTerm) || normalizedExamDescription.includes(normalizedSearchTerm);
    });
  }

  removeVietnameseTones(str: string): string {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
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
