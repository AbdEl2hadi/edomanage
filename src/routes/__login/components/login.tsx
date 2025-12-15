import { FaGoogle } from 'react-icons/fa';
import { FaMeta } from "react-icons/fa6";

import Loginform from '../../../features/auth/login/loginform'

export default function Login() {
  return (
    <div className="flex w-full flex-col justify-center px-4 py-12 sm:px-6 lg:w-[45%] lg:px-20 xl:px-24 bg-white dark:bg-background-dark z-10 shadow-xl lg:shadow-none">
      <div className="mx-auto w-full max-w-sm lg:w-96">
        <div className="mb-8">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary ring-1 ring-inset ring-primary/20">
            Teacher Portal
          </span>
        </div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-[#111318] dark:text-white sm:text-4xl leading-tight">
            Teach Your <br /> Student
          </h1>
          <p className="mt-3 text-base text-[#616f89] dark:text-gray-400">
            Welcome back. Please enter your details.
          </p>
        </div>
        <div className="mb-8 border-b border-[#dbdfe6] dark:border-gray-700">
          <nav aria-label="Tabs" className="-mb-px flex space-x-8">
            <p className="border-b-[3px] border-primary pb-3 px-1 text-sm font-bold text-[#111318] dark:text-white">
              Log In
            </p>
          </nav>
        </div>
        <Loginform />
        <div className="mt-8">
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute inset-0 flex items-center"
            >
              <div className="w-full border-t border-[#dbdfe6] dark:border-gray-700"></div>
            </div>

            {/* connection with third auth*/}

            <div className="relative flex justify-center text-sm font-medium leading-6">
              <span className="bg-white dark:bg-background-dark px-4 text-[#616f89] dark:text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <a
              className="flex w-full items-center justify-center gap-3 rounded-lg bg-white dark:bg-[#1a2234] px-3 py-3 text-sm font-semibold text-[#111318] dark:text-white shadow-sm ring-1 ring-inset ring-[#dbdfe6] dark:ring-gray-700 hover:bg-background-light dark:hover:bg-gray-800 transition-colors"
              href="#"
            >
              <FaGoogle className="h-5 w-5" />
              <span>Google</span>
            </a>
            <a
              className="flex w-full items-center justify-center gap-3 rounded-lg bg-white dark:bg-[#1a2234] px-3 py-3 text-sm font-semibold text-[#111318] dark:text-white shadow-sm ring-1 ring-inset ring-[#dbdfe6] dark:ring-gray-700 hover:bg-background-light dark:hover:bg-gray-800 transition-colors"
              href="#"
            >
              <FaMeta className="h-5 w-5" />
              <span>Meta</span>
            </a>
          </div>
        </div>
        <div className="mt-10 text-center">
          {/* if not a teacher*/}

          <div className="mb-2 text-center">
            <p className="text-[#637588] dark:text-[#9da6b9] text-sm mb-4">
              Not a Teacher? Login as:
            </p>
            <div className="flex justify-center gap-3">
              <a
                className="px-4 py-2 rounded-lg bg-[#f0f2f5] dark:bg-[#282e39] text-[#111418] dark:text-white text-sm font-medium hover:bg-primary/10 hover:text-primary transition-all"
                href="#"
              >
                Student
              </a>
              <a
                className="px-4 py-2 rounded-lg bg-[#f0f2f5] dark:bg-[#282e39] text-[#111418] dark:text-white text-sm font-medium hover:bg-primary/10 hover:text-primary transition-all"
                href="#"
              >
                Owner
              </a>
            </div>
          </div>
          <div className="mt-6 flex justify-center space-x-4 text-xs text-[#616f89] dark:text-gray-500">
            <a className="hover:underline hover:text-primary" href="#">
              Privacy Policy
            </a>
            <span className="text-gray-300 dark:text-gray-600">•</span>
            <a className="hover:underline hover:text-primary" href="#">
              Terms of Service
            </a>
            <span className="text-gray-300 dark:text-gray-600">•</span>
            <a className="hover:underline hover:text-primary" href="#">
              Help Center
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
