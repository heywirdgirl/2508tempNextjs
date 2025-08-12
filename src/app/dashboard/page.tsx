
import DashboardClient from '@/components/dashboard/DashboardClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Dashboard | tempNextjs25'
}

export default function DashboardPage() {
    return <DashboardClient />;
}
