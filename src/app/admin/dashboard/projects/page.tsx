"use client";

import { useState, useEffect } from "react";

interface Project {
  id: string;
  title: string;
  client_name: string;
  project_type: string;
  location: string;
  description: string;
  image_url: string; // JSON string or raw URL
  youtube_url?: string;
  order_index: number;
  is_featured: boolean;
  created_at: string;
}

const PROJECT_TYPES = ["Modular Kitchen", "Bedroom", "Living Room", "False Ceiling", "Office", "Exterior", "Full Home", "Commercial", "Other"];

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editProject, setEditProject] = useState<Project | null>(null);
  
  const [form, setForm] = useState({ 
    title: "", 
    client_name: "", 
    location: "", 
    project_type: "Modular Kitchen",
    description: "", 
    youtube_url: "",
    is_featured: false 
  });
  
  const [uploadType, setUploadType] = useState<"image" | "video">("image");
  const [file, setFile] = useState<File | null>(null);
  const [existingImage, setExistingImage] = useState<string>("");
  
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/admin/projects")
      .then((r) => r.json())
      .then((d) => { setProjects(d.projects ?? []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  function getImagesFromUrl(urlStr: string) {
    if (!urlStr) return ["", "", ""];
    try {
      const arr = JSON.parse(urlStr);
      if (Array.isArray(arr)) {
        return [arr[0] || "", arr[1] || "", arr[2] || ""];
      }
    } catch (e) {
      // legacy single image format
      return [urlStr, "", ""];
    }
    return ["", "", ""];
  }

  function openAdd() { 
    setEditProject(null); 
    setForm({ title: "", client_name: "", location: "", project_type: "Modular Kitchen", description: "", youtube_url: "", is_featured: false }); 
    setUploadType("image");
    setFile(null); 
    setExistingImage("");
    setShowForm(true); 
  }

  function openEdit(p: Project) { 
    setEditProject(p); 
    setForm({ 
      title: p.title, 
      client_name: p.client_name || "", 
      location: p.location || "", 
      project_type: p.project_type || "Modular Kitchen",
      description: p.description || "", 
      youtube_url: p.youtube_url || "",
      is_featured: p.is_featured 
    }); 
    setUploadType(p.youtube_url ? "video" : "image");
    setFile(null); 
    setExistingImage(getImagesFromUrl(p.image_url)[0] || "");
    setShowForm(true); 
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    
    // Validation based on toggle type
    if (uploadType === "image" && !file && !existingImage) {
       setMsg("Please provide a Project Image.");
       setTimeout(() => setMsg(""), 3000);
       return;
    }
    if (uploadType === "video" && !form.youtube_url) {
       setMsg("Please provide a YouTube Shorts URL.");
       setTimeout(() => setMsg(""), 3000);
       return;
    }

    setSaving(true);
    const method = editProject ? "PUT" : "POST";
    
    const formData = new FormData();
    // Dynamic defaults for missing video fields
    const finalTitle = uploadType === "video" && !form.title ? "YouTube Shorts Video" : form.title;
    
    formData.append("title", finalTitle);
    formData.append("client_name", form.client_name);
    formData.append("location", form.location);
    formData.append("project_type", form.project_type);
    formData.append("description", form.description);
    formData.append("is_featured", String(form.is_featured));
    if (editProject) formData.append("id", editProject.id);
    
    if (uploadType === "video" && form.youtube_url) {
      formData.append("youtube_url", form.youtube_url);
    } else if (uploadType === "image") {
      if (file) formData.append("image1", file);
      else if (existingImage) formData.append("existing_image1", existingImage);
    }

    const res = await fetch("/api/admin/projects", { method, body: formData });
    if (res.ok) {
      setMsg(editProject ? "Project updated." : "Project added.");
      setShowForm(false);
      const d = await fetch("/api/admin/projects").then((r) => r.json());
      setProjects(d.projects ?? []);
    } else { 
      const err = await res.json();
      setMsg(`Error saving project: ${err.error || "Unknown"}`); 
    }
    setSaving(false);
    setTimeout(() => setMsg(""), 3000);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this project?")) return;
    await fetch("/api/admin/projects", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Portfolio Projects</h1>
          <p className="text-gray-500 text-sm">{projects.length} projects total</p>
        </div>
        <button onClick={openAdd} className="bg-[#EA580C] text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-[#F97316] transition-colors shadow-sm">
          + Add Project
        </button>
      </div>

      {msg && <div className={`mb-4 text-sm px-4 py-3 border rounded-xl ${msg.includes('Error') || msg.includes('Please') ? 'text-red-700 bg-red-50 border-red-200' : 'text-green-700 bg-green-50 border-green-200'}`}>{msg}</div>}

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 z-[100] bg-gray-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-gray-100 shadow-2xl rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-gray-900 font-bold text-xl mb-6">{editProject ? "Edit Project" : "Add New Project"}</h2>
            
            <form onSubmit={handleSave} className="space-y-5">
              
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                  <label className="text-gray-900 font-bold text-sm flex items-center gap-2 cursor-pointer">
                    <input type="radio" checked={uploadType === "image"} onChange={() => setUploadType("image")} className="accent-[#EA580C] w-5 h-5" />
                    Upload Image & Data
                  </label>
                  <label className="text-gray-900 font-bold text-sm flex items-center gap-2 cursor-pointer">
                    <input type="radio" checked={uploadType === "video"} onChange={() => setUploadType("video")} className="accent-[#EA580C] w-5 h-5" />
                    Upload Video (YouTube URL)
                  </label>
                </div>
              </div>

              {uploadType === "image" ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="text-gray-500 text-[11px] font-bold uppercase tracking-wider block mb-1.5">Project Title *</label>
                      <input required value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="e.g. Modern Coastal Villa" className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C] transition-all" />
                    </div>
                    
                    <div>
                      <label className="text-gray-500 text-[11px] font-bold uppercase tracking-wider block mb-1.5">Client Name / Family</label>
                      <input value={form.client_name} onChange={(e) => setForm((f) => ({ ...f, client_name: e.target.value }))} placeholder="e.g. The Sharma Family" className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C] transition-all" />
                    </div>
                    
                    <div>
                      <label className="text-gray-500 text-[11px] font-bold uppercase tracking-wider block mb-1.5">Location</label>
                      <input value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} placeholder="e.g. Jubilee Hills, Hyd" className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C] transition-all" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="col-span-1 md:col-span-2">
                      <label className="text-gray-500 text-[11px] font-bold uppercase tracking-wider block mb-1.5">Project Type *</label>
                      <select required value={form.project_type} onChange={(e) => setForm((f) => ({ ...f, project_type: e.target.value }))} className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C] transition-all">
                        {PROJECT_TYPES.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-gray-500 text-[11px] font-bold uppercase tracking-wider block mb-1.5">Project Description</label>
                    <textarea rows={3} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C] resize-none transition-all" />
                  </div>

                  <div>
                    <label className="text-gray-500 text-[11px] font-bold uppercase tracking-wider block mb-1.5">Project Image *</label>
                    <div className="flex items-center gap-3">
                        <input type="file" accept="image/*" onChange={(e) => {
                          setFile(e.target.files?.[0] || null);
                        }} className="w-full text-gray-500 text-xs border border-gray-200 rounded-xl bg-white file:mr-3 file:py-2.5 file:px-4 file:border-0 file:text-xs file:font-bold file:bg-[#EA580C]/10 file:text-[#EA580C] hover:file:bg-[#EA580C]/20 transition-all cursor-pointer" />
                        {existingImage && !file && (
                            <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded border border-green-200 whitespace-nowrap">Existing Image Ready</span>
                        )}
                    </div>
                  </div>
                </>
              ) : (
                <div className="bg-red-50/50 border border-red-100 rounded-xl p-5 space-y-4">
                  <div>
                    <label className="text-red-800 text-[11px] font-bold uppercase tracking-wider block mb-1.5">YouTube Shorts URL *</label>
                     <p className="text-xs text-red-600/80 mb-3">No further data is required for video showcases.</p>
                    <input value={form.youtube_url} onChange={(e) => setForm((f) => ({ ...f, youtube_url: e.target.value }))} placeholder="https://youtube.com/shorts/..." className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400 transition-all shadow-sm" />
                  </div>
                </div>
              )}

              <label className="flex items-center gap-3 cursor-pointer mt-2 bg-orange-50 p-3 rounded-xl border border-orange-100">
                <input type="checkbox" checked={form.is_featured} onChange={(e) => setForm((f) => ({ ...f, is_featured: e.target.checked }))} className="w-4 h-4 accent-[#EA580C]" />
                <span className="text-gray-800 text-sm font-medium">Feature project on layout components</span>
              </label>

              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <button type="submit" disabled={saving} className="flex-1 bg-[#EA580C] text-white font-bold text-sm py-3 rounded-xl hover:bg-[#F97316] disabled:opacity-50 transition-colors shadow-sm">
                  {saving ? "Saving…" : "Save Project"}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="px-6 py-3 border border-gray-300 text-gray-600 font-medium text-sm rounded-xl hover:bg-gray-50 hover:text-gray-900 transition-colors">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-400 font-medium tracking-wide">Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="p-16 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-gray-100">
              <span className="text-2xl">📸</span>
            </div>
            <h3 className="text-gray-900 font-semibold mb-1">No projects yet</h3>
            <p className="text-gray-500 text-sm">Upload your first portfolio piece to showcase your work.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/50">
                  <th className="text-left text-gray-500 text-[10px] font-bold uppercase tracking-widest px-6 py-4 w-16">Preview</th>
                  <th className="text-left text-gray-500 text-[10px] font-bold uppercase tracking-widest px-6 py-4">Title & Client</th>
                  <th className="text-left text-gray-500 text-[10px] font-bold uppercase tracking-widest px-6 py-4 hidden md:table-cell">Type & Location</th>
                  <th className="text-left text-gray-500 text-[10px] font-bold uppercase tracking-widest px-6 py-4 hidden lg:table-cell">Featured</th>
                  <th className="text-right text-gray-500 text-[10px] font-bold uppercase tracking-widest px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {projects.map((p) => {
                  const firstImage = getImagesFromUrl(p.image_url)[0];
                  return (
                  <tr key={p.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      {p.youtube_url ? (
                        <div className="w-12 h-10 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center text-[10px] font-bold text-red-600">
                          YT 🎬
                        </div>
                      ) : firstImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={firstImage} alt="" className="w-12 h-10 rounded-lg object-cover border border-gray-200 shadow-sm" />
                      ) : (
                        <div className="w-12 h-10 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center">📷</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-900 font-bold">{p.title}</p>
                      {p.client_name && <p className="text-gray-500 text-xs mt-0.5">{p.client_name}</p>}
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <p className="text-gray-900 font-medium">{p.project_type || "—"}</p>
                      <p className="text-gray-600 text-xs mt-0.5">{p.location || "—"}</p>
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      {p.is_featured ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-orange-100 text-orange-700">Yes</span>
                      ) : (
                        <span className="text-gray-400 text-xs">No</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => openEdit(p)} className="text-[#EA580C] hover:text-[#C2410C] text-xs font-semibold mr-4 opacity-0 group-hover:opacity-100 transition-all">Edit</button>
                      <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:text-red-600 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-all">Delete</button>
                    </td>
                  </tr>
                )}
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
