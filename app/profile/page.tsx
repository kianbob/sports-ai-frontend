import BetHistory from '../components/BetHistory';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="p-4 border-b border-white/10">
        <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <ArrowLeftIcon className="w-5 h-5" />
          Back to Chat
        </Link>
      </div>
      <BetHistory />
    </div>
  );
}
