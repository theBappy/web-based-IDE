import { SidebarProvider } from "@/components/ui/sidebar";
import { getAllPlaygroundForUser } from "@/features/dashboard/actions";
import { DashboardSidebar } from "@/features/dashboard/components/dashboard-sidebar";


const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const playgroundData = await getAllPlaygroundForUser();

  const technologyIconMap: Record<string, string> = {
    REACT: "Zap",
    NEXTJS: "Lightbulb",
    EXPRESS: "Database",
    VUE: "Compass",
    HONO: "FlameIcon",
    ANGULAR: "TERMINAL",
  };

  const formattedPlaygroundData =
    playgroundData?.map((playground) => ({
      id: playground.id,
      name: playground.title,
      starred: playground.StarMark?.[0]?.isMarked || false,
      icon: technologyIconMap[playground.template] || "Code2",
    })) || [];

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex overflow-x-hidden">
        {/* TODO: implementing dashboard sidebar */}
        <DashboardSidebar initialPlaygroundData={formattedPlaygroundData} />
        <main className="flex-1">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
