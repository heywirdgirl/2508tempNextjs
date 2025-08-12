
import AuthForm from '@/components/auth/AuthForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Đăng ký | tempNextjs25',
};

export default function SignupPage() {
  return (
    <main className="flex items-center justify-center py-24 px-4">
      <AuthForm mode="signup" />
    </main>
  );
}
