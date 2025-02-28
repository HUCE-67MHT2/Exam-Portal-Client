import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-do-test',
  imports: [
    FormsModule,
    NgForOf
  ],
  templateUrl: './do-test.component.html',
  styleUrl: './do-test.component.scss'
})
export class DoTestComponent {
  subject = "Toán-GK";

  // Mảng lưu đáp án của sinh viên (giá trị mặc định là rỗng)
  answers: string[][] = Array(5).fill(null).map(() => Array(6).fill(""));

  options = ['A', 'B', 'C', 'D']; // Các đáp án có thể chọn

  submit() {
    console.log("Bài làm đã nộp!", this.answers);
  }
}
