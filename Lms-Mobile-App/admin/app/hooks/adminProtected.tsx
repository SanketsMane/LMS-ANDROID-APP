import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { redirect } from "next/navigation";

interface ProtectedProps {
  children: React.ReactNode;
}

export default function AdminProtected({ children }: ProtectedProps) {
  const { user } = useSelector((state: any) => state.auth);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  console.log("AdminProtected - user:", user);

  useEffect(() => {
    if (user) {
      const isAdminUser = user?.role === "admin";
      console.log("AdminProtected - isAdminUser:", isAdminUser, "user.role:", user?.role);
      if (isAdminUser) {
        setIsAdmin(true);
      } else {
        redirect("/");
      }
    } else {
      console.log("AdminProtected - no user, redirecting to /");
      redirect("/");
    }
  }, [user]);

  if (isAdmin === null) {
    return null;
  }

  return isAdmin ? <>{children}</> : null;
}
