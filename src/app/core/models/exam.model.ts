export interface Exam {
  id: number;               // ID của kỳ thi
  exam_session_id: number;     // ID của kỳ thi theo đợt
  name: string;             // Tên kỳ thi
  description: string;      // Mô tả kỳ thi
  type: string;             // Loại kỳ thi
  duration: number;         // Thời gian làm bài (phút)
  subject: string;          // Môn thi
  fileUrl: string;          // Đường dẫn file đề thi (nếu có)
  create_date: string;       // Ngày tạo đề thi (ISO 8601 string)
}

