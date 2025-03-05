"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

const SignOut = () => {
  const handleClick = async () => {
    await signOut();
  };

  return (
    <Button
      onClick={handleClick}
      variant="ghost"
      className="flex justify-start pl-0 w-full h-6"
      size="sm"
    >
      <LogOut />
      <span>Cerrar sesión</span>
    </Button>
  );
};
export default SignOut;
