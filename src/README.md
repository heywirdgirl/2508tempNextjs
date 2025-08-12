# Hướng dẫn dự án Next.js và Firebase

Đây là một dự án khởi đầu được xây dựng với Next.js, Firebase, và được tạo kiểu bằng Tailwind CSS và các component từ ShadCN/UI. Dự án này cung cấp một nền tảng vững chắc để xây dựng các ứng dụng web hiện đại, có khả năng mở rộng và hiệu suất cao.

## Các thư viện đã cài đặt

Dưới đây là danh sách các thư viện chính được sử dụng trong dự án và vai trò của chúng:

*   **Next.js**: Là một framework React dành cho production. Nó cho phép kết xuất phía máy chủ (SSR) và tạo trang tĩnh (SSG), giúp cải thiện hiệu suất và SEO. Trong dự án này, Next.js được sử dụng làm nền tảng chính cho việc xây dựng giao diện người dùng và định tuyến.
*   **Firebase**: Là một nền tảng phát triển ứng dụng của Google. Nó cung cấp nhiều dịch vụ backend mạnh mẽ. Trong dự án này, Firebase được sử dụng cho:
    *   **Authentication**: Xác thực người dùng (đăng nhập, đăng ký).
    *   **Firestore**: Cơ sở dữ liệu NoSQL để lưu trữ và truy vấn dữ liệu của ứng dụng, ví dụ như các công việc (tasks).
*   **Tailwind CSS**: Là một framework CSS "utility-first" giúp tạo kiểu nhanh chóng và tùy chỉnh giao diện người dùng trực tiếp trong file mã nguồn HTML/JSX.
*   **ShadCN/UI**: Là một bộ sưu tập các component React có thể tái sử dụng, được xây dựng trên nền tảng Radix UI và Tailwind CSS. Các component này giúp xây dựng giao diện người dùng đẹp, dễ tiếp cận và nhất quán một cách nhanh chóng.
*   **Genkit**: Là một bộ công cụ mã nguồn mở của Google để xây dựng các ứng dụng tích hợp AI. Nó giúp đơn giản hóa việc gọi các mô hình ngôn ngữ lớn (như Gemini), quản lý các "luồng" (flows) xử lý AI, và tổ chức mã nguồn cho các tính năng thông minh một cách hiệu quả và có cấu trúc.

## Cấu trúc file

Dự án này sử dụng cấu trúc App Router của Next.js 13+ và được tổ chức như sau:

*   **`src/`**: Thư mục chính chứa toàn bộ mã nguồn của ứng dụng.
    *   **`app/`**: Chứa các trang và layout của ứng dụng theo kiến trúc App Router.
        *   `layout.tsx`: Layout gốc của toàn bộ ứng dụng.
        *   `page.tsx`: Trang chủ của ứng dụng.
        *   `globals.css`: File CSS toàn cục, chứa các biến màu và các lớp tiện ích của Tailwind CSS.
        *   **`(folder)/`**: Mỗi thư mục con trong `app` đại diện cho một tuyến đường (route). Ví dụ: `app/dashboard/page.tsx` tương ứng với route `/dashboard`.
    *   **`components/`**: Chứa các component React có thể tái sử dụng.
        *   `ui/`: Chứa các component giao diện người dùng cơ bản từ ShadCN/UI (ví dụ: Button, Card, Input).
        *   **`auth/`**: Chứa các component liên quan đến xác thực (ví dụ: form đăng nhập/đăng ký).
        *   **`dashboard/`**: Chứa các component dành riêng cho trang dashboard.
    *   **`lib/`**: Chứa các hàm tiện ích và logic nghiệp vụ.
        *   `utils.ts`: Các hàm tiện ích chung.
        *   **`firebase/`**: Chứa các hàm để tương tác với dịch vụ Firebase.
            *   `config.ts`: Cấu hình khởi tạo Firebase.
            *   `auth.ts`: Các hàm xử lý xác thực (đăng nhập, đăng ký, đăng xuất).
            *   `firestore.ts`: Các hàm xử lý truy vấn cơ sở dữ liệu Firestore (thêm, sửa, xóa, lấy dữ liệu).
    *   **`context/`**: Chứa các React Context Provider.
        *   `AuthContext.tsx`: Cung cấp thông tin về trạng thái xác thực của người dùng cho toàn bộ ứng dụng.
    *   **`hooks/`**: Chứa các custom React Hook.
        *   `useAuth.ts`: Hook để dễ dàng truy cập vào AuthContext.
        *   `use-toast.ts`: Hook để hiển thị thông báo (toast).
    *   **`ai/`**: Chứa các file liên quan đến Genkit và các tính năng AI.
        *   `genkit.ts`: File cấu hình và khởi tạo Genkit.
        *   `flows/`: Chứa các luồng (flow) AI của Genkit.
*   **`public/`**: Chứa các file tĩnh như hình ảnh, font chữ sẽ được phục vụ trực tiếp.
*   **`package.json`**: Định nghĩa các tập lệnh và liệt kê các thư viện phụ thuộc của dự án.
*   **`tailwind.config.ts`**: File cấu hình cho Tailwind CSS.
*   **`next.config.ts`**: File cấu hình cho Next.js.
