
import { useRouter } from "next/navigation";
import { LogoutButtonProps } from "@/features/types";
import { signOut } from "next-auth/react";

export const LogoutButton = ({ children }: LogoutButtonProps) => {
  const router = useRouter();

  const onLogout = async () => {
    await signOut();
    router.refresh();
  };

  return (
    <span className="cursor-pointer" onClick={onLogout}>
      {children}
    </span>
  );
};
