"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { 
    Plus, Trash2, Edit2, Upload, Loader2, 
    ImageIcon, Film, X, Tag, FileText, Play 
} from "lucide-react";
import { GalleryType } from "@/models/galarry";

interface GalleryAdminProps {
    showNotification: (type: "success" | "error", message: string) => void;
}

export default function GalleryAdmin({ showNotification }: GalleryAdminProps) {
    const [galleryItems, setGalleryItems] = useState<GalleryType[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [uploadingMedia, setUploadingMedia] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Form state
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [types, setTypes] = useState<"EVENT" | "FESTIVAL" | "ACADEMIC" | "OTHER">("EVENT");
    const [imageUrl, setImageUrl] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [mediaType, setMediaType] = useState<"image" | "video">("image");

    // Search & Filter
    const [searchQuery, setSearchQuery] = useState("");
    const [filterCategory, setFilterCategory] = useState<string>("ALL");

    const fetchGallery = async () => {
        setLoading(true);
        try {
            const res = await axios.get("/api/admin/gallery");
            if (res.data.success) {
                setGalleryItems(res.data.data || []);
            }
        } catch (err: any) {
            console.error("Fetch gallery error:", err);
            showNotification("error", err.response?.data?.message || "Failed to fetch gallery items.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGallery();
    }, []);

    const resetForm = () => {
        setEditingId(null);
        setTitle("");
        setDescription("");
        setTypes("EVENT");
        setImageUrl("");
        setVideoUrl("");
        setMediaType("image");
    };

    // Upload Media (Image or Video) to Cloudinary RDS folder
    const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadingMedia(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "RDS");

        try {
            const res = await axios.post("/api/admin/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (res.data.success) {
                if (file.type.startsWith("video/")) {
                    setVideoUrl(res.data.url);
                    setImageUrl("");
                    setMediaType("video");
                } else {
                    setImageUrl(res.data.url);
                    setVideoUrl("");
                    setMediaType("image");
                }
                showNotification("success", "Media compressed & uploaded to RDS successfully!");
            } else {
                showNotification("error", res.data.message || "Failed to upload media.");
            }
        } catch (err: any) {
            console.error(err);
            showNotification("error", err.response?.data?.message || "Media upload failed.");
        } finally {
            setUploadingMedia(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!imageUrl && !videoUrl) {
            showNotification("error", "Please upload at least an Image or Video file.");
            return;
        }

        setSubmitting(true);
        const payload = {
            title,
            description,
            types,
            image: imageUrl || null,
            video: videoUrl || null,
        };

        try {
            if (editingId) {
                const res = await axios.put("/api/admin/gallery", { id: editingId, ...payload });
                if (res.data.success) {
                    showNotification("success", "Gallery item updated successfully!");
                    resetForm();
                    fetchGallery();
                } else {
                    showNotification("error", res.data.message || "Failed to update item.");
                }
            } else {
                const res = await axios.post("/api/admin/gallery", payload);
                if (res.data.success) {
                    showNotification("success", "Gallery item uploaded & saved successfully!");
                    resetForm();
                    fetchGallery();
                } else {
                    showNotification("error", res.data.message || "Failed to save item.");
                }
            }
        } catch (err: any) {
            console.error(err);
            showNotification("error", err.response?.data?.error || "Failed to save gallery item.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleEdit = (item: GalleryType) => {
        setEditingId(item._id);
        setTitle(item.title || "");
        setDescription(item.description || "");
        setTypes(item.types as "EVENT" | "FESTIVAL" | "ACADEMIC" | "OTHER");
        setImageUrl(item.image || "");
        setVideoUrl(item.video || "");
        setMediaType(item.video ? "video" : "image");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this gallery media?")) return;
        try {
            const res = await axios.delete(`/api/admin/gallery?id=${id}`);
            if (res.data.success) {
                showNotification("success", "Gallery item deleted successfully!");
                fetchGallery();
                if (editingId === id) resetForm();
            } else {
                showNotification("error", res.data.message || "Failed to delete item.");
            }
        } catch (err: any) {
            console.error(err);
            showNotification("error", err.response?.data?.message || "Failed to delete item.");
        }
    };

    const filteredItems = galleryItems.filter((item) => {
        const matchesCategory = filterCategory === "ALL" || item.types === filterCategory;
        const matchesQuery = 
            (item.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
            (item.description || "").toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesQuery;
    });

    return (
        <div className="space-y-8">
            {/* Upload Form */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-indigo-50 text-indigo-900 rounded-xl">
                            <ImageIcon size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-800">
                                {editingId ? "Edit Gallery Media" : "Upload Gallery Image / Video"}
                            </h2>
                            <p className="text-xs text-slate-500">
                                Upload campus media to Cloudinary <code className="bg-blue-100 text-blue-800 px-1 rounded">RDS</code> folder with automatic image compression
                            </p>
                        </div>
                    </div>

                    {editingId && (
                        <button
                            type="button"
                            onClick={resetForm}
                            className="px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1"
                        >
                            <X size={14} /> Cancel Edit
                        </button>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Title */}
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                                Title / Headline
                            </label>
                            <div className="relative">
                                <FileText className="absolute left-3 top-3 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="e.g. Annual Sports Meet 2026"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900"
                                />
                            </div>
                        </div>

                        {/* Category (types field) */}
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                                Category Type <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <Tag className="absolute left-3 top-3 text-slate-400" size={18} />
                                <select
                                    value={types}
                                    onChange={(e) => setTypes(e.target.value as any)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 font-semibold text-slate-800"
                                >
                                    <option value="EVENT">EVENT</option>
                                    <option value="FESTIVAL">FESTIVAL</option>
                                    <option value="ACADEMIC">ACADEMIC</option>
                                    <option value="OTHER">OTHER</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                            Description
                        </label>
                        <textarea
                            rows={2}
                            placeholder="Add brief details about the event, festival or academic photo/video..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900"
                        />
                    </div>

                    {/* Media File Upload */}
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                            Upload Media File (Image or Video)
                        </label>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <div className="relative flex-grow w-full">
                                <input
                                    type="file"
                                    accept="image/*,video/*"
                                    onChange={handleMediaUpload}
                                    disabled={uploadingMedia}
                                    className="block w-full text-xs text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-950 file:text-white hover:file:bg-blue-900 transition-all cursor-pointer"
                                />
                            </div>
                            {uploadingMedia && (
                                <div className="flex items-center gap-2 text-xs font-medium text-blue-600">
                                    <Loader2 className="animate-spin" size={16} /> Processing & Uploading to RDS...
                                </div>
                            )}
                        </div>

                        {/* Media Preview */}
                        {imageUrl && (
                            <div className="mt-3 flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200 max-w-md">
                                <div className="relative w-16 h-16 rounded-lg overflow-hidden border bg-black flex-shrink-0">
                                    <Image src={imageUrl} alt="Uploaded preview" fill className="object-cover" />
                                </div>
                                <div className="overflow-hidden flex-grow">
                                    <p className="text-xs font-semibold text-emerald-700 truncate">Image Ready (Compressed)</p>
                                    <p className="text-[10px] text-slate-400 truncate">{imageUrl}</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setImageUrl("")}
                                    className="p-1 hover:bg-slate-200 rounded text-slate-500"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        )}

                        {videoUrl && (
                            <div className="mt-3 flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200 max-w-md">
                                <div className="w-16 h-16 rounded-lg border bg-slate-900 flex items-center justify-center text-white flex-shrink-0">
                                    <Film size={24} />
                                </div>
                                <div className="overflow-hidden flex-grow">
                                    <p className="text-xs font-semibold text-emerald-700 truncate">Video Uploaded Successfully</p>
                                    <p className="text-[10px] text-slate-400 truncate">{videoUrl}</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setVideoUrl("")}
                                    className="p-1 hover:bg-slate-200 rounded text-slate-500"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end pt-4 border-t border-slate-100">
                        <button
                            type="submit"
                            disabled={submitting || uploadingMedia}
                            className="px-6 py-3 bg-blue-950 hover:bg-blue-900 text-white font-bold rounded-xl text-sm transition-all shadow-md flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                        >
                            {submitting ? (
                                <>
                                    <Loader2 className="animate-spin" size={18} /> Saving Gallery Item...
                                </>
                            ) : (
                                <>
                                    <Upload size={18} /> {editingId ? "Update Media Item" : "Publish to Gallery"}
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>

            {/* Gallery Grid & Filter */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
                    <div>
                        <h3 className="text-lg font-bold text-slate-800">Gallery Media Collection ({filteredItems.length})</h3>
                        <p className="text-xs text-slate-500">Manage uploaded images and videos categorized by types</p>
                    </div>

                    {/* Category Filter Pills */}
                    <div className="flex flex-wrap items-center gap-2">
                        {["ALL", "EVENT", "FESTIVAL", "ACADEMIC", "OTHER"].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilterCategory(cat)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                    filterCategory === cat
                                        ? "bg-blue-950 text-white shadow-sm"
                                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="py-12 flex flex-col items-center justify-center text-slate-400">
                        <Loader2 className="animate-spin mb-2" size={32} />
                        <p className="text-xs font-semibold">Loading gallery collection...</p>
                    </div>
                ) : filteredItems.length === 0 ? (
                    <div className="py-12 text-center text-slate-400">
                        <ImageIcon className="mx-auto mb-2 opacity-50" size={40} />
                        <p className="text-sm font-semibold">No media items found for this category.</p>
                        <p className="text-xs">Upload your first image or video above.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredItems.map((item) => (
                            <div
                                key={item._id}
                                className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all"
                            >
                                <div className="relative aspect-video w-full bg-slate-900">
                                    {item.image ? (
                                        <Image src={item.image} alt={item.title || "Gallery item"} fill className="object-cover" />
                                    ) : item.video ? (
                                        <video src={item.video} controls className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-slate-500">
                                            <ImageIcon size={32} />
                                        </div>
                                    )}
                                    <span className="absolute top-3 right-3 px-2.5 py-1 text-[10px] font-extrabold bg-blue-950/80 backdrop-blur-md text-white rounded-lg uppercase tracking-wider">
                                        {item.types}
                                    </span>
                                </div>

                                <div className="p-4 space-y-2 flex-grow">
                                    <h4 className="font-bold text-slate-800 text-sm line-clamp-1">
                                        {item.title || "Untitled Media"}
                                    </h4>
                                    {item.description && (
                                        <p className="text-xs text-slate-500 line-clamp-2">{item.description}</p>
                                    )}
                                </div>

                                <div className="p-4 pt-0 flex items-center justify-end gap-2 border-t border-slate-200/50 mt-auto">
                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors flex items-center gap-1 text-xs font-semibold"
                                    >
                                        <Edit2 size={14} /> Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="p-1.5 text-red-600 hover:bg-red-100 rounded-lg transition-colors flex items-center gap-1 text-xs font-semibold"
                                    >
                                        <Trash2 size={14} /> Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
