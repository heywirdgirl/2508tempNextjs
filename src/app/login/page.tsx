
import AuthForm from '@/components/auth/AuthForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Đăng nhập | tempNextjs25',
};

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center py-24 px-4">
      <AuthForm mode="login" />
    </main>
  );
}
