"use client";

import React from "react";
import css from "./AuthNavigation.module.css";
import { useAuth } from "@/lib/store/authStore";
import { logOut } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import Link from "next/link";

const AuthNavigation = () => {
  const { isAuthenticated, user, clearAuth } = useAuth();
  const router = useRouter();

  const handleLogOut = async () => {
    await logOut();
    clearAuth();
    router.replace("/sign-in");
  };
  const displayName = user?.username ?? user?.email ?? "User";

  return isAuthenticated ? (
    <>
      <li className={css.navigationItem}>
        <span>{displayName}</span>
      </li>
      <li className={css.navigationItem}>
        <Link href="/profile" className={css.navigationLink}>
          Profile
        </Link>
      </li>
      <li className={css.navigationItem}>
        <button className={css.logoutButton} onClick={handleLogOut}>
          Logout
        </button>
      </li>
    </>
  ) : (
    <>
      <li className={css.navigationItem}>
        <Link href="/sign-in" className={css.navigationLink}>
          Login
        </Link>
      </li>
      <li className={css.navigationItem}>
        <Link href="/sign-up" className={css.navigationLink}>
          Sign up
        </Link>
      </li>
    </>
  );
};

export default AuthNavigation;
