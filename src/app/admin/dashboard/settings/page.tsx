import { getSupabaseClient } from "@/lib/supabase";
import { CheckCircle, XCircle, Database, Globe, Key } from "lucide-react";

export default async function SettingsPage() {
  const supabase = getSupabaseClient();
  const urlSet = !!process.env.NEXT_PUBLIC_SUPABASE_URL;
  const keySet = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  let isConnected = false;
  let errorMsg = "";

  if (supabase) {
    try {
      const { error } = await supabase.from("projects").select("id").limit(1);
      if (!error || error.code === "PGRST116") {
        isConnected = true;
      } else {
        errorMsg = error.message;
      }
    } catch (e) {
      errorMsg = String(e);
    }
  }

  return (
    <div className="p-6 lg:p-10 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">System Settings</h1>
        <p className="text-gray-500 text-sm">Manage configuration and integrations.</p>
      </div>

      <div className="space-y-6">
        {/* Supabase Status Card */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-100 p-2.5 rounded-xl border border-emerald-200 shadow-sm">
                <Database className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-gray-900 font-bold">Supabase Connection</h2>
                <p className="text-gray-500 text-xs mt-0.5">Database and authentication link</p>
              </div>
            </div>
            {isConnected ? (
               <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full shadow-sm">
                 <CheckCircle className="w-4 h-4" /> Connected
               </span>
            ) : (
               <span className="inline-flex items-center gap-1.5 text-xs font-bold text-red-700 bg-red-50 border border-red-200 px-3 py-1.5 rounded-full shadow-sm">
                 <XCircle className="w-4 h-4" /> Disconnected
               </span>
            )}
          </div>
          
          <div className="p-6 space-y-5">
            <div>
              <p className="text-gray-700 font-medium text-sm mb-2">Connection Status:</p>
              {errorMsg ? (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-4 rounded-xl mb-4 font-mono shadow-inner text-xs">
                  <strong>Error code:</strong> {errorMsg}
                </div>
              ) : (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm p-4 rounded-xl mb-4 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  Database is successfully connected and responding dynamically.
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-3 text-gray-500 text-xs font-bold uppercase tracking-wider">
                  <Globe className="w-4 h-4" /> URL
                </div>
                <p className="text-gray-900 font-mono text-sm break-all bg-white p-3 rounded-lg border border-gray-100">
                  {urlSet ? process.env.NEXT_PUBLIC_SUPABASE_URL : <span className="text-red-500">Missing from .env</span>} 
                </p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-3 text-gray-500 text-xs font-bold uppercase tracking-wider">
                  <Key className="w-4 h-4" /> Anon Key
                </div>
                <p className="text-gray-900 font-mono text-sm break-all bg-white p-3 rounded-lg border border-gray-100 flex items-center gap-2">
                  {keySet ? (
                    <>
                      <span className="text-emerald-500 font-bold">✓</span> Set (Hidden for security)
                    </>
                  ) : <span className="text-red-500">Missing from .env</span>}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Lead Form Settings */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
           <div className="p-6 border-b border-gray-100 bg-gray-50/50">
             <div className="flex items-center gap-2">
               <div className="w-1 h-4 bg-[#EA580C] rounded-full"></div>
               <h2 className="text-gray-900 font-bold">Inquiry Management</h2>
             </div>
           </div>
           <div className="p-6">
             <p className="text-gray-600 text-sm mb-4 leading-relaxed max-w-2xl">
               When users fill out the contact form on your live site, the system skips database storage and forwards the client directly to your business WhatsApp.
             </p>
             <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
                <div className="text-amber-600 mt-0.5">ℹ️</div>
                <div>
                  <p className="text-amber-800 text-sm font-bold mb-1">Current Behavior: WhatsApp Direct</p>
                  <p className="text-amber-700/80 text-xs">Leads and inquiries rely on the WhatsApp redirect. Unread inquiries on the dashboard will currently report 0.</p>
                </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
