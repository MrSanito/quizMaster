"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      {/* Show content when signed in */}
      <SignedIn>
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Welcome to Your Dashboard!</h1>
          <p className="text-lg">
            Explore daily quizzes and track your progress.
          </p>
          <UserButton afterSignOutUrl="/" />
        </div>
      </SignedIn>

      {/* Show warning + sign-in options when signed out */}
      <SignedOut>
        <div className="flex flex-col items-center space-y-6 p-4 bg-base-100 shadow-xl rounded-lg w-1/4 px-10">
          <h2 className="text-2xl font-bold text-red-500 mt-6">
            Sign in to view this page!
          </h2>
          <p className="text-lg text-gray-600">
            Access exclusive quizzes and content.
          </p>

          <div className="flex space-x-4">
            <SignInButton>
              <button className="btn btn-primary">Sign In</button>
            </SignInButton>
            <SignUpButton>
              <button className="btn btn-secondary">Sign Up</button>
            </SignUpButton>
          </div>

          <Link href="/" className="btn btn-link text-primary pb-6">
            Back to Home
          </Link>
        </div>
      </SignedOut>
    </div>
  );
};

export default Dashboard;
