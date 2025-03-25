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
      exam_session_id: 101,
      name: "Kỳ thi Toán học 2025",
      description: "Kỳ thi học kỳ môn Toán lớp 12",
      type: "Học kỳ",
      duration: 90,
      subject: "Toán",
      fileUrl: "https://drive.google.com/example/math_exam.pdf",
      create_date: "10:00 01-03-2025",
    },
    {
      id: 2,
      exam_session_id: 102,
      name: "Kỳ thi Tiếng Anh 2025",
      description: "Bài kiểm tra giữa kỳ môn Tiếng Anh",
      type: "Giữa kỳ",
      duration: 60,
      subject: "Tiếng Anh",
      fileUrl: "",
      create_date: "15:30 20-02-2025",
    },
    {
      id: 3,
      exam_session_id: 103,
      name: "Kỳ thi Vật Lý 2025",
      description: "Kỳ thi cuối kỳ môn Vật Lý lớp 11",
      type: "Cuối kỳ",
      duration: 75,
      subject: "Vật Lý",
      fileUrl: "https://drive.google.com/example/physics_exam.pdf",
      create_date: "12:45 28-02-2025",
    },
    {
      id: 4,
      exam_session_id: 104,
      name: "Kỳ thi Hóa Học 2025",
      description: "Kỳ thi cuối kỳ môn Hóa lớp 12",
      type: "Cuối kỳ",
      duration: 90,
      subject: "Hóa Học",
      fileUrl: "https://drive.google.com/example/chem_exam.pdf",
      create_date: "09:00 05-03-2025",
    },
    {
      id: 5,
      exam_session_id: 105,
      name: "Kỳ thi Sinh Học 2025",
      description: "Bài kiểm tra giữa kỳ môn Sinh Học",
      type: "Giữa kỳ",
      duration: 60,
      subject: "Sinh Học",
      fileUrl: "",
      create_date: "16:30 25-02-2025",
    },
    {
      id: 6,
      exam_session_id: 106,
      name: "Kỳ thi Lịch Sử 2025",
      description: "Kỳ thi cuối kỳ môn Lịch Sử lớp 12",
      type: "Cuối kỳ",
      duration: 75,
      subject: "Lịch Sử",
      fileUrl: "https://drive.google.com/example/history_exam.pdf",
      create_date: "14:15 10-03-2025",
    },
    {
      id: 7,
      exam_session_id: 107,
      name: "Kỳ thi Địa Lý 2025",
      description: "Bài kiểm tra giữa kỳ môn Địa Lý",
      type: "Giữa kỳ",
      duration: 60,
      subject: "Địa Lý",
      fileUrl: "",
      create_date: "11:30 28-02-2025",
    },
    {
      id: 8,
      exam_session_id: 108,
      name: "Kỳ thi Tin Học 2025",
      description: "Kỳ thi học kỳ môn Tin Học lớp 11",
      type: "Học kỳ",
      duration: 90,
      subject: "Tin Học",
      fileUrl: "https://drive.google.com/example/it_exam.pdf",
      create_date: "17:00 05-03-2025",
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
