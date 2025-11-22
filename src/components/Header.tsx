"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuthStore } from "@/stores/authStore";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { Icons } from "./ui/icons";

export function Header() {
  const { token, user, clearAuth } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    clearAuth();
    router.push("/login");
  };

  return (
    <header className="container px-3 sm:px-4 py-3 sm:py-4 md:py-5 flex items-center justify-between border-b border-border fixed top-0 z-[9] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-1 md:gap-2">
        <Icons.logo className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-primary" />
        <Link
          href="/"
          className="text-md sm:text-2xl font-bold text-foreground hover:opacity-80 transition-opacity whitespace-nowrap"
        >
          CalorieTrack
        </Link>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
        {!token && !["/login", "/register"].includes(pathname) ? (
          <div className="flex items-center gap-2">
            <Link href="/login" className="w-full">
              <Button
                variant="outline"
                size="sm"
                className="cursor-pointer text-xs sm:text-sm"
              >
                Login
              </Button>
            </Link>
            <Link href="/register" className="w-full hidden sm:block">
              <Button size="sm" className="cursor-pointer text-xs sm:text-sm">
                Get Started
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-2 sm:gap-3">
            {user?.firstName ||
              (user?.email && (
                <span className="text-xs sm:text-md text-primary whitespace-nowrap hidden md:inline">
                  `Hi, ${user?.firstName || user?.email}`
                </span>
              ))}
            <Button
              variant="outline"
              size="icon"
              onClick={handleLogout}
              className="cursor-pointer h-8 w-8 sm:h-9 sm:w-9"
              aria-label="Logout"
            >
              <LogOut className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Button>
          </div>
        )}
        <div className="ml-1 sm:ml-0">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
