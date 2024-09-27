'use client'

import React, { useState, useEffect, Fragment } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { Dialog, Transition } from '@headlessui/react'
import {
  XMarkIcon,
  HomeIcon,
  DocumentIcon,
  UserGroupIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Bars3Icon,
  QuestionMarkCircleIcon,
  MoonIcon,
  SunIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  BellIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline'
import { cn } from "@/lib/utils"
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import RecentlyOpened from '@/app/dashboard/components/RecentlyOpened'
import ProfileDropdown from '@/app/dashboard/components/ProfileDropdown'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"  // Import the Separator component

const menuItems = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  { name: 'Documents', href: '/dashboard/documents', icon: DocumentIcon },
  { name: 'Board', href: '/dashboard/board', icon: FolderIcon },
  { name: 'Coach', href: '/dashboard/coach', icon: UserGroupIcon },
  { name: 'Templates', href: '/dashboard/templates', icon: DocumentDuplicateIcon },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [logoSrc, setLogoSrc] = useState("/images/logo-white.svg")
  const router = useRouter()
  const auth = getAuth()

  useEffect(() => {
    setMounted(true)
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      if (currentUser) {
        setUser(currentUser)
      } else {
        router.push('/auth/login')
      }
    })

    return () => unsubscribe()
  }, [auth, router])

  useEffect(() => {
    if (mounted) {
      setLogoSrc(theme === 'dark' ? "/images/logo-white.svg" : "/images/logo.png")
    }
  }, [theme, mounted])

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const handleLogout = () => {
    signOut(auth).then(() => {
      router.push('/auth/login')
    })
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full justify-between">
      <div>
        <nav className="space-y-1 mt-5">
          {menuItems.map(item => (
            <Fragment key={item.name}>
              <Link
                href={item.href}
                className="flex items-center px-1 py-1 text-sm font-normal rounded-md text-foreground hover:bg-secondary active:bg-secondary focus:bg-secondary hover:text-secondary-foreground"
              >
                <item.icon className="mr-1 flex-shrink-0 h-4 w-4" />
                <span className={cn(
                  "transition-all duration-300 ease-in-out",
                  sidebarCollapsed ? "opacity-0 w-0" : "opacity-100"
                )}>
                  {item.name}
                </span>
              </Link>
              {item.name === 'Templates' && (
                <Separator className="my-2" />
              )}
            </Fragment>
          ))}
        </nav>
        {!sidebarCollapsed && <RecentlyOpened sidebarCollapsed={sidebarCollapsed} />}
      </div>
      <div className="space-y-2 pb-4">
        <Link
          href="/support"
          className="flex items-center w-full px-1 py-1 text-sm font-normal rounded-md text-foreground hover:bg-primary hover:text-primary-foreground"
        >
          <QuestionMarkCircleIcon className="mr-1 flex-shrink-0 h-4 w-4" />
          <span className={cn(
            "transition-all duration-300 ease-in-out",
            sidebarCollapsed ? "opacity-0 w-0" : "opacity-100"
          )}>
            Support
          </span>
        </Link>
      </div>
    </div>
  )

  return (
    <div className="flex flex-col h-screen text-foreground">
      {/* Mobile header */}
      <header className="lg:hidden sticky top-0 z-40 flex items-center justify-between bg-card px-2 py-4 shadow-sm">
        <Image
          src={logoSrc}
          alt="Logo"
          width={80}
          height={24}
          className="h-6 w-auto"
        />
        <div className="flex items-center space-x-2">
          <button
            type="button"
            className="p-1 text-foreground hover:bg-primary hover:text-primary-foreground rounded-md focus:outline-none"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <Bars3Icon className="h-4 w-4" />
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop sidebar */}
        <aside className={cn(
          "hidden lg:flex lg:flex-col border-r border-border",
          "transition-all duration-300 ease-in-out bg-card",
          sidebarCollapsed ? "lg:w-16" : "lg:w-56"
        )}>
          <div className="flex h-full flex-col justify-between overflow-y-auto py-4 px-2">
            <div className="flex h-12 items-center justify-between">
              {!sidebarCollapsed && (
                <Image
                  src={logoSrc}
                  alt="Logo"
                  width={80}
                  height={24}
                  className="h-6 w-auto transition-all duration-300 ease-in-out"
                />
              )}
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="p-1 text-foreground hover:bg-primary hover:text-primary-foreground rounded-md lg:block hidden"
              >
                {sidebarCollapsed ? (
                  <ChevronRightIcon className="h-4 w-4" />
                ) : (
                  <ChevronLeftIcon className="h-4 w-4" />
                )}
              </button>
            </div>
            <SidebarContent />
          </div>
        </aside>

        {/* Mobile sidebar */}
        <Transition.Root show={mobileOpen} as={React.Fragment}>
          <Dialog as="div" className="relative z-50 lg:hidden" onClose={setMobileOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-background/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-10 flex w-full max-w-sm flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-10 justify-center pt-5">
                      <button type="button" className="p-2 text-foreground hover:bg-primary hover:text-primary-foreground rounded-md" onClick={() => setMobileOpen(false)}>
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-card px-4 pb-4">
                    <SidebarContent />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Main content area with header */}
        <div className={cn(
          "flex-1 overflow-auto bg-background text-foreground",
          "transition-all duration-300 ease-in-out",
        )}>
          {/* Header */}
          <header className="sticky top-0 z-10 bg-card border-b border-border">
            <div className="flex items-center justify-between px-4 py-2">
              <div className="flex items-center bg-muted rounded-lg space-x-4">
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-64"
                  startIcon={<MagnifyingGlassIcon className="h-4 w-4" />}
                />
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon">
                  <BellIcon className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" onClick={toggleTheme}>
                  {theme === 'dark' ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
                </Button>
                {user && (
                  <ProfileDropdown
                    user={user}
                    toggleTheme={toggleTheme}
                    handleLogout={handleLogout}
                    sidebarCollapsed={false}
                  />
                )}
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="p-2 pt-4 md:p-12 md:pt-4">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}