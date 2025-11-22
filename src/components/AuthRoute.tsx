'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/stores/authStore';

export function AuthRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const { token, _hasHydrated } = useAuthStore();

  const publicRoutes = ['/login', '/register']; // only allowed when logged out
  const isPublicRoute = publicRoutes.includes(pathname);

  useEffect(() => {
    if (!_hasHydrated) return;

    // USER LOGGED OUT
    if (!token) {
      if (!isPublicRoute) {
        // user trying to access ANY page other than login/register → redirect to login
        router.replace('/');
      }
    }
    // USER LOGGED IN
    if (token) {
      if (isPublicRoute) {
        // user trying to access login/register → redirect to dashboard
        router.replace('/dashboard');
      }
    }

    setIsLoading(false);
  }, [token, pathname, _hasHydrated]);

  // Loading state until store hydration completes
  if (isLoading || !_hasHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-t-2 border-b-2 border-blue-500 rounded-full"></div>
      </div>
    );
  }

  return <>{children}</>;
}
