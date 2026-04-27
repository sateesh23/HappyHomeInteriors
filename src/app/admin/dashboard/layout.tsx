import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import AdminSidebar from "@/components/admin/Sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) redirect("/admin");

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex">
      <AdminSidebar />
      <main className="flex-grow overflow-auto pt-[73px] lg:pt-0">
        {children}
      </main>
    </div>
  );
}
