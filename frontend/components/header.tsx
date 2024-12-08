import Logo from "@/components/logo";
import {MenuIcon, User2Icon} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {Button} from "./ui/button";
import {useContext} from "react";
import {AuthContext} from "@/providers/auth";
import {useRouter} from "next/navigation";
import {NotificationContext} from "@/providers/notification";
import {signOut} from "@/security/sign_out";

export default function Header() {
  const {user} = useContext(AuthContext);
  const {sendNotification} = useContext(NotificationContext);
  const router = useRouter();

  const signOutHandler = async () => {
    try {
      await signOut();
      router.replace("/sign-in");
      sendNotification({
        title: "Logged out!",
        message: `User ${user?.name} was logged out!`,
      });
    } catch {
      sendNotification({
        isDanger: true,
        title: "Erro",
        message: "Log out error, try again",
      });
    }
  };

  return (
    <div className="w-full h-16 bg-gray-800 text-white fixed top-0 left-0 flex items-center p-4 z-50 lg:flex-row lg:justify-between">
      <a href="/" className="mr-6">
        <Logo />
      </a>
  
      <div className="lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:flex lg:space-x-4 hidden lg:block">
        <a href="/" className="hover:bg-gray-700 p-2 rounded cursor-pointer">
          Home
        </a>
        <a href="/about" className="hover:bg-gray-700 p-2 rounded cursor-pointer">
          About
        </a>
        <a href="/backlogs" className="hover:bg-gray-700 p-2 rounded cursor-pointer">
          My Backlogs
        </a>
      </div>
  
      <div className="ml-auto lg:ml-0 lg:block hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="p-2 shadow-none">
              <User2Icon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="pointer" onClick={signOutHandler}>
              <span className="text-red-500">Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
  
      {/* Mobile */}
      <div className="block lg:hidden ml-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="p-2 shadow-none">
              <MenuIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuItem asChild>
              <a href="/" className="hover:bg-gray-700 p-2 rounded cursor-pointer">
                Home
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a href="/about" className="hover:bg-gray-700 p-2 rounded cursor-pointer">
                About
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a href="/backlogs" className="hover:bg-gray-700 p-2 rounded cursor-pointer">
                My Backlogs
              </a>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="pointer" onClick={signOutHandler}>
              <span className="text-red-500">Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
