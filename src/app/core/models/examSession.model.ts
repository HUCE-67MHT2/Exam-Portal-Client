export interface ExamSession {
  id: number; // Khóa chính, tự động tăng
  teacher_id: number; // ID giáo viên
  name: string; // Tên kỳ thi
  description: string; // Mô tả
  start_date: string; // Ngày giờ bắt đầu
  end_date: string; // Ngày giờ thúc
  create_date: string; // Ngày giờ tạo
  code: string; // Mã kỳ thi
  password: string; // Mật khẩu
  type: string; // Loại kỳ thi
  status: string; // Trạng thái
}
