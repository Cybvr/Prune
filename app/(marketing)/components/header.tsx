                          import React, { useState } from 'react';
                          import Link from 'next/link';
                          import { useAuthState } from 'react-firebase-hooks/auth';
                          import { auth } from '../../../firebase/firebaseConfig';
                          import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
                          import { BookOpen, Briefcase, PenTool, GraduationCap } from 'lucide-react';
                          import { Dialog, Disclosure, Transition } from '@headlessui/react';

                          const useCases = [
                            { 
                              name: 'Students', 
                              href: '/use-cases/students', 
                              icon: GraduationCap, 
                              color: 'text-blue-600',
                              description: 'Enhance your learning journey'
                            },
                            { 
                              name: 'Researchers', 
                              href: '/use-cases/researchers', 
                              icon: BookOpen, 
                              color: 'text-green-600',
                              description: 'Accelerate your discoveries'
                            },
                            { 
                              name: 'Professionals', 
                              href: '/use-cases/professionals', 
                              icon: Briefcase, 
                              color: 'text-purple-600',
                              description: 'Boost your productivity'
                            },
                            { 
                              name: 'Writers', 
                              href: '/use-cases/writers', 
                              icon: PenTool, 
                              color: 'text-red-600',
                              description: 'Unleash your creativity'
                            },
                          ];

                          export default function Header() {
                            const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
                            const [user, loading] = useAuthState(auth);

                            const handleLogout = async () => {
                              try {
                                await auth.signOut();
                                closeMobileMenu();
                              } catch (error) {
                                console.error('Failed to log out', error);
                              }
                            };

                            const closeMobileMenu = () => {
                              setMobileMenuOpen(false);
                            };

                            return (
                              <header className="bg-white sticky top-0 z-50 border-b border-zinc-200">
                                <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
                                  <div className="flex items-center lg:flex-1">
                                    <Link href="/" className="-m-1.5 p-1.5">
                                      <span className="sr-only">Prune</span>
                                      <img src="/images/logo.png" alt="Logo" className="h-8 w-auto" />
                                    </Link>
                                    <div className="hidden lg:flex lg:gap-x-6 ml-6">
                                      <Link href="/about" className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-600">
                                        About
                                      </Link>
                                      <Link href="/pricing" className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-600">
                                        Pricing
                                      </Link>
                                      <Link href="/faqs" className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-600">
                                        FAQs
                                      </Link>
                                      <div className="relative group">
                                        <button className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-600 flex items-center">
                                          Use Cases
                                          <ChevronDownIcon className="ml-1 h-4 w-4" />
                                        </button>
                                        <div className="absolute left-0 mt-2 w-[600px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                                          <div className="py-1 grid grid-cols-4" role="menu" aria-orientation="horizontal" aria-labelledby="options-menu">
                                            {useCases.map((useCase) => (
                                              <Link
                                                key={useCase.name}
                                                href={useCase.href}
                                                className="flex flex-col px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                role="menuitem"
                                              >
                                                <div className="flex items-center">
                                                  <useCase.icon className={`mr-3 h-5 w-5 ${useCase.color}`} aria-hidden="true" />
                                                  <span className="font-semibold">{useCase.name}</span>
                                                </div>
                                                <span className="ml-8 text-xs text-gray-500">{useCase.description}</span>
                                              </Link>
                                            ))}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
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
                                  <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:space-x-4">
                                    {!loading && (
                                      user ? (
                                        <>
                                          <Link href="/dashboard" className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-600">
                                            Dashboard
                                          </Link>
                                          <button
                                            onClick={handleLogout}
                                            className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-600"
                                          >
                                            Log out
                                          </button>
                                        </>
                                      ) : (
                                        <>
                                          <Link href="/auth/login" className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-600">
                                            Log in
                                          </Link>
                                          <Link href="/auth/register" className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors duration-300">
                                            Get Started
                                          </Link>
                                        </>
                                      )
                                    )}
                                  </div>
                                </nav>
                                {/* Mobile menu dialog code here */}
                              </header>
                            );
                          }