import React from 'react';
import Link from 'next/link';
import { UserIcon, CogIcon, MoonIcon, SunIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProfileDropdownProps {
  user: any;
  toggleTheme: () => void;
  handleLogout: () => void;
  sidebarCollapsed: boolean;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ user, toggleTheme, handleLogout, sidebarCollapsed }) => {
  const { theme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center space-x-2">
          {user.photoURL ? (
            <Image
              src={user.photoURL}
              alt="User avatar"
              width={24}
              height={24}
              className="rounded-full object-cover"
            />
          ) : (
            <UserIcon className="h-6 w-6 text-muted-foreground" />
          )}
          <span className={`transition-all duration-300 ease-in-out text-sm ${sidebarCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            {user.displayName || "Unknown User"}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 mt-2">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={toggleTheme} className="flex items-center space-x-2">
            {theme === 'dark' ? (
              <>
                <SunIcon className="h-4 w-4" /> <span>Light Mode</span>
              </>
            ) : (
              <>
                <MoonIcon className="h-4 w-4" /> <span>Dark Mode</span>
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/settings" passHref className="flex items-center space-x-2">
              <CogIcon className="h-4 w-4" /> <span>Settings</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout} className="flex items-center space-x-2">
            <ArrowRightOnRectangleIcon className="h-4 w-4" /> <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;