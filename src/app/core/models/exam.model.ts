export interface Exam {
  examId: string;          // ID của kỳ thi
  examName: string;        // Tên kỳ thi
  examType: string;        // Loại đề thi (Giữa kỳ, Cuối kỳ, ...)
  examPassword: string;    // Mật khẩu kỳ thi
  examCreatedDate: string; // Ngày tạo kỳ thi (ISO 8601 string)
  examStatus: string;      // Trạng thái kỳ thi ("chưa mở", "đang mở", "đã đóng")
  examDuration: number;    // Thời gian làm bài (phút)
  examSourceType: string   // Nguồn tạo kỳ thi (File, Auto)
}

