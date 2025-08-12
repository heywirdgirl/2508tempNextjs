
"use client";

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LayoutDashboard, LifeBuoy, LogIn, LogOut, UserPlus } from "lucide-react";
import { logOut } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function Header() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await logOut();
      toast({ title: "Đăng xuất thành công" });
      router.push("/");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Lỗi đăng xuất",
        description: error.message,
      });
    }
  };
  
  const getInitials = (email: string | null | undefined) => {
    if (!email) return '??';
    return email.substring(0, 2).toUpperCase();
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-8 flex items-center gap-2">
            <LifeBuoy className="h-6 w-6 text-primary"/>
            <span className="font-bold font-headline text-lg">tempNextjs25</span>
        </Link>
        <div className="flex flex-1 items-center justify-end">
          <nav>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user?.photoURL ?? undefined} alt="User avatar" />
                    <AvatarFallback>{getInitials(user?.email)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                {loading ? (
                    <DropdownMenuLabel className="font-normal">
                        <p>Đang tải...</p>
                    </DropdownMenuLabel>
                ) : user ? (
                  <>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          Xin chào!
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Đăng xuất</span>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                     <DropdownMenuItem asChild>
                      <Link href="/login">
                        <LogIn className="mr-2 h-4 w-4" />
                        <span>Đăng nhập</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/signup">
                        <UserPlus className="mr-2 h-4 w-4" />
                        <span>Đăng ký</span>
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </div>
    </header>
  );
}
