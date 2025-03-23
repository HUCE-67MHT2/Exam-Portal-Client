export interface Exam {
  id: number;              // ID của kỳ thi
  name: string;            // Tên kỳ thi
  description: string;     // Mô tả kỳ thi
  code: string;            // Mã kỳ thi
  createDate: string;      // Ngày tạo kỳ thi (ISO 8601 string)
  type: string;            // Loại kỳ thi
  status: string;          // Trạng thái kỳ thi (tính status từ backend rồi gửi cho client)
}


