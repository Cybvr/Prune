import React from 'react';
import Link from 'next/link';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Dialog, DialogPanel } from '@headlessui/react'; // You should ensure these imports if not already existing

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false); // Ensure you have the state management

  return (
    <header className="bg-white sticky top-0 z-50">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Prune</span>
            <img src="/images/logo.png" alt="Logo" className="h-8 w-auto" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-6">
          <Link href="/about" className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-600">
            About
          </Link>
          <Link href="/pricing" className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-600">
            Pricing
          </Link>
          <Link href="#faqs" className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-600">
            FAQs
          </Link>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:space-x-4">
          <Link href="/auth/login" className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-600">
            Log in
          </Link>
          <Link href="/auth/register" className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors duration-300">
            Get Started
          </Link>
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Prune</span>
              <img src="/images/logo.png" alt="Logo" className="h-8 w-auto" />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Link
                  href="/about"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  About
                </Link>
                <Link
                  href="/pricing"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Pricing
                </Link>
                <Link
                  href="#faqs"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  FAQs
                </Link>
              </div>
              <div className="py-6">
                <Link
                  href="/auth/login"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </Link>
                <Link
                  href="/auth/register"
                  className="mt-4 block px-4 py-2 bg-blue-600 text-white text-base font-semibold hover:bg-blue-700 transition-colors duration-300 text-center"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default Header;