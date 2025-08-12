
import AuthForm from '@/components/auth/AuthForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login | tempNextjs25',
};

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-background p-4">
      <AuthForm mode="login" />
    </main>
  );
}
