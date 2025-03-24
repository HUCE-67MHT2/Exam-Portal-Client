export interface Exam {
  id: number;               // ID của kỳ thi
  examPeriodId: number;     // ID của kỳ thi theo đợt
  name: string;             // Tên kỳ thi
  description: string;      // Mô tả kỳ thi
  type: string;             // Loại kỳ thi
  duration: number;         // Thời gian làm bài (phút)
  subject: string;          // Môn thi
  fileUrl: string;          // Đường dẫn file đề thi (nếu có)
  createDate: string;       // Ngày tạo kỳ thi (ISO 8601 string)
  startDate: string;        // Ngày bắt đầu kỳ thi (ISO 8601 string)
  endDate: string;          // Ngày kết thúc kỳ thi (ISO 8601 string)
  status: string;           // Trạng thái kỳ thi (xử lý bên server)
  code: string;             // Mã kỳ thi
}

