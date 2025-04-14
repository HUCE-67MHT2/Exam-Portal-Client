export interface Exam {
  id: number;                 // ID của đề thi
  examSessionId: number;      // ID của kỳ thi theo đợt
  name: string;               // Tên đề thi
  description: string;        // Mô tả đề thi
  type: string;               // Loại đề thi (upload-file hoặc auto-generate)
  totalQuestions: number;     // Số lượng câu hỏi
  duration: number;           // Thời gian làm bài (phút)
  subject: string;            // Môn thi
  fileUrl: string | null;     // Đường dẫn file đề thi (nếu có)
  createDate: Date;         // Ngày tạo đề thi (ISO 8601 string)
  startDate: Date;          // Ngày bắt đầu đề thi (ISO 8601 string)
  endDate: Date;            // Ngày kết thúc đề thi (ISO 8601 string)
}
