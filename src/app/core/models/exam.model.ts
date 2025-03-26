export interface Exam {
  id: number;                 // ID của kỳ thi
  examSessionId: number;      // ID của kỳ thi theo đợt
  name: string;               // Tên kỳ thi
  description: string;        // Mô tả kỳ thi
  type: string;               // Loại kỳ thi (upload-file hoặc auto-generate)
  duration: number;           // Thời gian làm bài (phút)
  subject: string;            // Môn thi
  fileUrl: string | null;     // Đường dẫn file đề thi (nếu có)
  createDate: Date;         // Ngày tạo đề thi (ISO 8601 string)
  startDate: string;          // Ngày bắt đầu kỳ thi (ISO 8601 string)
  endDate: string;            // Ngày kết thúc kỳ thi (ISO 8601 string)
}
