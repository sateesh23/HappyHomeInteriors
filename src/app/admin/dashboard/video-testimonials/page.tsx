"use client";

import { useState, useEffect } from "react";

interface VideoTestimonial {
  id: string;
  youtube_url: string;
  created_at: string;
}

export default function AdminVideoTestimonialsPage() {
  const [videos, setVideos] = useState<VideoTestimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [dbError, setDbError] = useState("");

  useEffect(() => {
    fetch("/api/admin/video-testimonials")
      .then((r) => r.json())
      .then((d) => { 
        if (d.error === "missing_table") {
          setDbError(d.message);
        } else {
          setVideos(d.videos ?? []); 
        }
        setLoading(false); 
      })
      .catch(() => setLoading(false));
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!url) return;
    setSaving(true);
    
    // basic validation
    if (!url.includes("youtube.com") && !url.includes("youtu.be")) {
      setMsg("Please enter a valid YouTube URL.");
      setSaving(false);
      return;
    }

    const res = await fetch("/api/admin/video-testimonials", { 
      method: "POST", 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ youtube_url: url }) 
    });

    if (res.ok) {
      setMsg("Video Added Successfully!");
      setUrl("");
      const d = await fetch("/api/admin/video-testimonials").then(r => r.json());
      setVideos(d.videos ?? []);
    } else {
      setMsg("Error saving video.");
    }
    setSaving(false);
    setTimeout(() => setMsg(""), 3000);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this video?")) return;
    await fetch("/api/admin/video-testimonials", { 
      method: "DELETE", 
      headers: { "Content-Type": "application/json" }, 
      body: JSON.stringify({ id }) 
    });
    setVideos((prev) => prev.filter((v) => v.id !== id));
  }

  function extractVideoId(url: string) {
    try {
      const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/gi;
      const match = regex.exec(url);
      return match ? match[1] : null;
    } catch(e) {
      return null;
    }
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">YouTube Video Testimonials</h1>
          <p className="text-gray-500 text-sm">Add Shorts or video links for the scrolling footer marquee.</p>
        </div>
      </div>

      {dbError && (
        <div className="mb-8 p-6 bg-red-50 border border-red-200 rounded-2xl text-red-700">
          <h3 className="font-bold text-lg mb-2">Database Setup Required</h3>
          <p className="mb-4">{dbError}</p>
          <div className="bg-white p-4 rounded-xl text-sm font-mono text-gray-800 border">
            {`CREATE TABLE public.video_testimonials (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    youtube_url text NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.video_testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read video testimonials" ON public.video_testimonials FOR SELECT USING (true);`}
          </div>
          <p className="mt-4 text-xs font-semibold">Please run this SQL query in your Supabase SQL Editor to enable this feature.</p>
        </div>
      )}

      {msg && <div className={`mb-6 text-sm px-4 py-3 border rounded-xl ${msg.includes('Error') || msg.includes('Please') ? 'text-red-700 bg-red-50 border-red-200' : 'text-green-700 bg-green-50 border-green-200'}`}>{msg}</div>}

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Add New YouTube Video</h2>
        <form onSubmit={handleAdd} className="flex gap-4">
          <input 
            type="url" 
            placeholder="Paste YouTube Short URL here..." 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={!!dbError}
            className="flex-1 bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C] transition-all"
            required
          />
          <button 
            type="submit" 
            disabled={saving || !!dbError}
            className="bg-[#EA580C] text-white font-bold text-sm px-8 py-3 rounded-xl hover:bg-[#F97316] disabled:opacity-50 transition-colors shadow-sm whitespace-nowrap"
          >
            {saving ? "Adding..." : "+ Add Video"}
          </button>
        </form>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-400 font-medium tracking-wide">Loading videos...</div>
        ) : videos.length === 0 ? (
          <div className="p-16 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
              <span className="text-2xl">📺</span>
            </div>
            <h3 className="text-gray-900 font-semibold mb-1">No videos added yet</h3>
            <p className="text-gray-500 text-sm">Add your first YouTube short link above.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
            {videos.map((v) => {
              const videoId = extractVideoId(v.youtube_url);
              return (
                <div key={v.id} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm relative group bg-gray-50">
                  <div className="aspect-[9/16] w-full bg-black relative">
                    {videoId ? (
                      <img 
                        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} 
                        alt="Thumbnail"
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                        onError={(e) => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`; }}
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 text-xs text-center p-4">
                        <span>Preview Unavailable</span>
                        <span className="mt-2 text-[10px] break-all">{v.youtube_url}</span>
                      </div>
                    )}
                    <button 
                      onClick={() => window.open(v.youtube_url, '_blank')}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
                        <div className="w-0 h-0 border-t-8 border-b-8 border-l-[14px] border-transparent border-l-white ml-1"></div>
                      </div>
                    </button>
                  </div>
                  <div className="p-3 bg-white border-t border-gray-100 flex justify-between items-center">
                    <span className="text-xs text-gray-500 truncate mr-2">{new Date(v.created_at).toLocaleDateString()}</span>
                    <button onClick={() => handleDelete(v.id)} className="text-red-500 hover:text-red-600 text-xs font-bold">Remove</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
