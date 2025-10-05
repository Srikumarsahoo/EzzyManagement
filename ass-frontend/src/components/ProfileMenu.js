import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  UserIcon,
  Cog6ToothIcon,
  LockClosedIcon,
  BellIcon,
  SunIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

export default function ProfileMenu() {
  const handleLogout = () => {
    alert("Logged out");
  };

  const handleToggleTheme = () => {
    alert("Theme toggled");
  };

  return (
    <Menu as="div" className="relative inline-block text-left w-full">
      {/* Button */}
      <div>
        <Menu.Button className="flex items-center w-full justify-between px-3 py-2 rounded-lg hover:bg-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
              JD
            </div>
            <div className="text-left">
              <p className="font-medium text-sm text-gray-800">John Doe</p>
              <p className="text-xs text-gray-500">Garage Manager</p>
            </div>
          </div>
          <svg
            className="w-4 h-4 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </Menu.Button>
      </div>

      {/* Dropdown Menu */}
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-0 bottom-14 w-56 origin-bottom-left bg-white border border-gray-200 divide-y divide-gray-100 rounded-lg shadow-lg focus:outline-none z-50">
          <div className="py-2">
            {/* View Profile */}
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-gray-100" : ""
                  } flex items-center w-full px-4 py-2 text-sm text-gray-700`}
                >
                  <UserIcon className="w-5 h-5 mr-2 text-gray-500" />
                  View Profile
                </button>
              )}
            </Menu.Item>

            {/* Account Settings */}
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-gray-100" : ""
                  } flex items-center w-full px-4 py-2 text-sm text-gray-700`}
                >
                  <Cog6ToothIcon className="w-5 h-5 mr-2 text-gray-500" />
                  Account Settings
                </button>
              )}
            </Menu.Item>

            {/* Change Password */}
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-gray-100" : ""
                  } flex items-center w-full px-4 py-2 text-sm text-gray-700`}
                >
                  <LockClosedIcon className="w-5 h-5 mr-2 text-gray-500" />
                  Change Password
                </button>
              )}
            </Menu.Item>

            {/* Notification */}
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-gray-100" : ""
                  } flex items-center w-full px-4 py-2 text-sm text-gray-700`}
                >
                  <BellIcon className="w-5 h-5 mr-2 text-gray-500" />
                  Notification
                </button>
              )}
            </Menu.Item>

            {/* Toggle Theme */}
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleToggleTheme}
                  className={`${
                    active ? "bg-gray-100" : ""
                  } flex items-center w-full px-4 py-2 text-sm text-gray-700`}
                >
                  <SunIcon className="w-5 h-5 mr-2 text-gray-500" />
                  Toggle Theme
                </button>
              )}
            </Menu.Item>
          </div>

          {/* Logout */}
          <div className="py-1 border-t border-gray-200">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleLogout}
                  className={`${
                    active ? "bg-gray-100" : ""
                  } flex items-center w-full px-4 py-2 text-sm text-red-600`}
                >
                  <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2 text-red-500" />
                  Log Out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
