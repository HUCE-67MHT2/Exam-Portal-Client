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
      name: "Toán",
      description: "Học kỳ",
      type: "upload-file",
      duration: 90,
      subject: "Toán",
      fileUrl: "https://drive.google.com/example/math_exam.pdf",
      create_date: "10:00 01-03-2025",
    },
    {
      id: 2,
      exam_session_id: 102,
      name: "Tiếng Anh",
      description: "Giữa kỳ",
      type: "auto-generate",
      duration: 60,
      subject: "Tiếng Anh",
      fileUrl: "",
      create_date: "15:30 20-02-2025",
    },
    {
      id: 3,
      exam_session_id: 103,
      name: "Vật Lý",
      description: "Cuối kỳ",
      type: "upload-file",
      duration: 75,
      subject: "Vật Lý",
      fileUrl: "https://drive.google.com/example/physics_exam.pdf",
      create_date: "12:45 28-02-2025",
    },
    {
      id: 4,
      exam_session_id: 104,
      name: "Hóa Học",
      description: "Cuối kỳ",
      type: "upload-file",
      duration: 90,
      subject: "Hóa Học",
      fileUrl: "https://drive.google.com/example/chem_exam.pdf",
      create_date: "09:00 05-03-2025",
    },
    {
      id: 5,
      exam_session_id: 105,
      name: "Sinh Học",
      description: "Giữa kỳ",
      type: "auto-generate",
      duration: 60,
      subject: "Sinh Học",
      fileUrl: "",
      create_date: "16:30 25-02-2025",
    },
    {
      id: 6,
      exam_session_id: 106,
      name: "Lịch Sử",
      description: "Cuối kỳ",
      type: "upload-file",
      duration: 75,
      subject: "Lịch Sử",
      fileUrl: "https://drive.google.com/example/history_exam.pdf",
      create_date: "14:15 10-03-2025",
    },
    {
      id: 7,
      exam_session_id: 107,
      name: "Địa Lý",
      description: "Giữa kỳ",
      type: "auto-generate",
      duration: 60,
      subject: "Địa Lý",
      fileUrl: "",
      create_date: "11:30 28-02-2025",
    },
    {
      id: 8,
      exam_session_id: 108,
      name: "Lập Trình",
      description: "Học kỳ",
      type: "upload-file",
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
