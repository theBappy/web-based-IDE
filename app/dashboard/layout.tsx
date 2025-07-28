import { SidebarProvider } from "@/components/ui/sidebar";
import {DashboardSidebar} from "@/features/dashboard/components/dashboard-sidebar";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex overflow-x-hidden">
        {/* TODO: implementing dashboard sidebar */}
        <DashboardSidebar initialPlaygroundData={[]} />
        <main className="flex-1">{children}</main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
