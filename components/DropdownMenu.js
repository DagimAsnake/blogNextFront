import React, { useState } from 'react';
import { Menu } from '@headlessui/react';
import Link from "next/link"

function DropdownMenu({logoutHandler}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { href: '/profile/settings', label: 'Settings' },
    { href: '/profile', label: 'Profile' },
    { href: '/profile/changepassword', label: 'Change Password' },
  ]

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <Menu as="div" className="relative">
      <div>
        <Menu.Button
          className="ml-2 bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-neutral-400"
          onMouseEnter={handleMenuToggle}
        >
          <span className="sr-only">Open user menu</span>
          <div
            className="h-10 w-10 rounded-full bg-sky-500 bg-cover bg-no-repeat bg-center"
            style={{ backgroundImage: 'url("https://source.unsplash.com/80x80?face")' }}
          >
            <span className="sr-only">Marc Backes</span>
          </div>
        </Menu.Button>
      </div>
      {isMenuOpen && (
        <div
          className="origin-top-right z-10 absolute right-0 mt-2 w-48 rounded-sm shadow-md p-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          onMouseLeave={handleMenuClose}
        >
        {links.map((link) => (
          <Link href={link.href}  key={link.href}>
            <Menu.Item >
              {({ active }) => (
                <div
                  className={`${
                    active ? 'bg-gray-100' : ''
                  } rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200`}
                  onClick={handleMenuClose}
                >
                {link.label}
                </div>
              )}
            </Menu.Item>
          </Link>
        ))}
          <Menu.Item>
            {({ active }) => (
              <div
                className={`${
                  active ? 'bg-gray-100' : ''
                } rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200`}
                onClick={logoutHandler}
              >
                Sign out
              </div>
            )}
          </Menu.Item>
        </div>
      )}
    </Menu>
  );
}

export default DropdownMenu;