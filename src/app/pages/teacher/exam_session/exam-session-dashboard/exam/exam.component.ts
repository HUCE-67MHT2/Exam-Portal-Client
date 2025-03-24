import {Component, Input, OnInit} from '@angular/core';
import { Exam } from '../../../../../core/models/exam.model';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgOptimizedImage} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  imports: [
    FormsModule,
    NgForOf,
    NgOptimizedImage
  ],
  styleUrl: './exam.component.scss'
})
export class ExamComponent implements OnInit {
  constructor(private router: Router) {
  }
  examList: Exam[] = [
    {
      id: 1,
      examPeriodId: 101,
      name: "Kỳ thi Toán học 2025",
      description: "Kỳ thi học kỳ môn Toán lớp 12",
      type: "Học kỳ",
      duration: 90,
      subject: "Toán",
      fileUrl: "https://drive.google.com/example/math_exam.pdf",
      createDate: "10:00 01-03-2025",
      startDate: "08:00 15-03-2025",
      endDate: "10:00 15-03-2025",
      status: "Chưa diễn ra",
      code: "MATH2025HK1"
    },
    {
      id: 2,
      examPeriodId: 102,
      name: "Kỳ thi Tiếng Anh 2025",
      description: "Bài kiểm tra giữa kỳ môn Tiếng Anh",
      type: "Giữa kỳ",
      duration: 60,
      subject: "Tiếng Anh",
      fileUrl: "",
      createDate: "15:30 20-02-2025",
      startDate: "09:00 20-03-2025",
      endDate: "10:00 20-03-2025",
      status: "Chưa diễn ra",
      code: "ENG2025MID"
    },
    {
      id: 3,
      examPeriodId: 103,
      name: "Kỳ thi Vật Lý 2025",
      description: "Kỳ thi cuối kỳ môn Vật Lý lớp 11",
      type: "Cuối kỳ",
      duration: 75,
      subject: "Vật Lý",
      fileUrl: "https://drive.google.com/example/physics_exam.pdf",
      createDate: "12:45 28-02-2025",
      startDate: "13:30 05-04-2025",
      endDate: "14:45 05-04-2025",
      status: "Chưa diễn ra",
      code: "PHYS2025FINAL"
    },
    {
      id: 4,
      examPeriodId: 104,
      name: "Kỳ thi Hóa Học 2025",
      description: "Kỳ thi cuối kỳ môn Hóa lớp 12",
      type: "Cuối kỳ",
      duration: 90,
      subject: "Hóa Học",
      fileUrl: "https://drive.google.com/example/chem_exam.pdf",
      createDate: "09:00 05-03-2025",
      startDate: "10:00 10-04-2025",
      endDate: "11:30 10-04-2025",
      status: "Chưa diễn ra",
      code: "CHEM2025FINAL"
    },
    {
      id: 5,
      examPeriodId: 105,
      name: "Kỳ thi Sinh Học 2025",
      description: "Bài kiểm tra giữa kỳ môn Sinh Học",
      type: "Giữa kỳ",
      duration: 60,
      subject: "Sinh Học",
      fileUrl: "",
      createDate: "16:30 25-02-2025",
      startDate: "08:00 22-03-2025",
      endDate: "09:00 22-03-2025",
      status: "Chưa diễn ra",
      code: "BIO2025MID"
    },
    {
      id: 6,
      examPeriodId: 106,
      name: "Kỳ thi Lịch Sử 2025",
      description: "Kỳ thi cuối kỳ môn Lịch Sử lớp 12",
      type: "Cuối kỳ",
      duration: 75,
      subject: "Lịch Sử",
      fileUrl: "https://drive.google.com/example/history_exam.pdf",
      createDate: "14:15 10-03-2025",
      startDate: "13:00 18-04-2025",
      endDate: "14:15 18-04-2025",
      status: "Chưa diễn ra",
      code: "HIST2025FINAL"
    },
    {
      id: 7,
      examPeriodId: 107,
      name: "Kỳ thi Địa Lý 2025",
      description: "Bài kiểm tra giữa kỳ môn Địa Lý",
      type: "Giữa kỳ",
      duration: 60,
      subject: "Địa Lý",
      fileUrl: "",
      createDate: "11:30 28-02-2025",
      startDate: "09:30 25-03-2025",
      endDate: "10:30 25-03-2025",
      status: "Chưa diễn ra",
      code: "GEO2025MID"
    },
    {
      id: 8,
      examPeriodId: 108,
      name: "Kỳ thi Tin Học 2025",
      description: "Kỳ thi học kỳ môn Tin Học lớp 11",
      type: "Học kỳ",
      duration: 90,
      subject: "Tin Học",
      fileUrl: "https://drive.google.com/example/it_exam.pdf",
      createDate: "17:00 05-03-2025",
      startDate: "14:00 12-04-2025",
      endDate: "15:30 12-04-2025",
      status: "Chưa diễn ra",
      code: "IT2025HK1"
    }
  ];

  filteredExams: Exam[] = [];
  searchTerm: string = '';
  @Input() exam_session_name!: string;
  @Input() exam_session_code!: string;


  ngOnInit(): void {
    console.log("Initial Exam List:", this.examList);
    this.filteredExams = [...this.examList]; // Đảm bảo hiển thị ban đầu

  }

  filterExam() {
    console.log("Exam Session Name:", this.exam_session_name);
    console.log("Exam Session Code:", this.exam_session_code);

    const normalizedSearchTerm = this.removeVietnameseTones(this.searchTerm.toLowerCase());


    this.filteredExams = this.examList.filter(exam => {
      const normalizedExamName = this.removeVietnameseTones(exam.name.toLowerCase());


      return normalizedExamName.includes(normalizedSearchTerm);
    });


  }
  removeVietnameseTones(str: string): string {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  navigateToCreatExam() {
    this.router.navigate(['/teacher/exam-create-type'], { queryParams: { name: this.exam_session_name, code: this.exam_session_code } });
    console.log(this.exam_session_code,this.exam_session_name);
  }
}
