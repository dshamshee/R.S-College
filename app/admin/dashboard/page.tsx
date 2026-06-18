"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
    Plus, Trash2, Edit2, Upload, LogOut, FileText, 
    ExternalLink, X, Bell, Landmark, Megaphone, Loader2, Info, GraduationCap
} from "lucide-react";
import axios from "axios";
import { UpdatesType } from "@/models/updates";

export default function AdminDashboardPage() {
    const [updates, setUpdates] = useState<UpdatesType[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [uploading, setUploading] = useState(false);
    const router = useRouter();

    // Form states
    const [editingId, setEditingId] = useState<string | null>(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState<"NOTICE" | "EXAMINATION" | "NEWS" | "TENDER">("NOTICE");
    const [files, setFiles] = useState<string[]>([]);
    
    // Notification states
    const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

    // Filter states
    const [filterCategory, setFilterCategory] = useState<string>("ALL");
    const [searchQuery, setSearchQuery] = useState("");

    // Fetch updates on load
    const fetchUpdates = async () => {
        setLoading(true);
        try {
            const res = await axios.get("/api/search/updates");
            if (res.data.success) {
                // Sort by date descending
                const sorted = (res.data.data || []).sort(
                    (a: UpdatesType, b: UpdatesType) => 
                        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );
                setUpdates(sorted);
            }
        } catch (err) {
            console.error("Fetch updates error:", err);
            showNotification("error", "Failed to fetch updates.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUpdates();
    }, []);

    const showNotification = (type: "success" | "error", message: string) => {
        setNotification({ type, message });
        setTimeout(() => setNotification(null), 5000);
    };

    // Handle File Upload to Cloudinary
    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Limit file size to 1MB (1,048,576 bytes)
        const MAX_FILE_SIZE = 1024 * 1024;
        if (file.size > MAX_FILE_SIZE) {
            alert("File size exceeds the 1MB limit. Please upload a file smaller than 1MB.");
            showNotification("error", "File size exceeds the 1MB limit. Please upload a file smaller than 1MB.");
            window.scrollTo({ top: 0, behavior: "smooth" });
            e.target.value = ""; // Reset file input
            return;
        }

        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await axios.post("/api/admin/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            if (res.data.success) {
                setFiles(prev => [...prev, res.data.url]);
                showNotification("success", `Uploaded "${file.name}" successfully!`);
            } else {
                showNotification("error", res.data.message || "File upload failed.");
            }
        } catch (err: any) {
            console.error(err);
            showNotification("error", err.response?.data?.message || "File upload failed.");
        } finally {
            setUploading(false);
            e.target.value = ""; // Reset file input
        }
    };

    // Remove file from attachment state
    const handleRemoveFile = (indexToRemove: number) => {
        setFiles(prev => prev.filter((_, idx) => idx !== indexToRemove));
    };

    // Add or Update submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !description.trim()) {
            showNotification("error", "Title and description are required.");
            return;
        }

        setSubmitting(true);
        try {
            if (editingId) {
                // Update
                const res = await axios.put("/api/admin/updates", {
                    id: editingId,
                    title,
                    description,
                    type,
                    files
                });
                if (res.data.success) {
                    showNotification("success", "Update modified successfully!");
                    resetForm();
                    fetchUpdates();
                } else {
                    showNotification("error", res.data.message || "Failed to update.");
                }
            } else {
                // Create
                const res = await axios.post("/api/admin/updates", {
                    title,
                    description,
                    type,
                    files
                });
                if (res.data.success) {
                    showNotification("success", "Update added successfully!");
                    resetForm();
                    fetchUpdates();
                } else {
                    showNotification("error", res.data.message || "Failed to add.");
                }
            }
        } catch (err: any) {
            console.error(err);
            showNotification("error", err.response?.data?.error || "Submit failed.");
        } finally {
            setSubmitting(false);
        }
    };

    // Edit button click
    const handleEdit = (update: UpdatesType) => {
        setEditingId(update._id);
        setTitle(update.title);
        setDescription(update.description);
        setType(update.type as any);
        setFiles(update.files || []);
        // Scroll to form
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Delete update
    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this update?")) return;

        try {
            const res = await axios.delete(`/api/admin/updates?id=${id}`);
            if (res.data.success) {
                showNotification("success", "Update deleted successfully!");
                fetchUpdates();
                if (editingId === id) resetForm();
            } else {
                showNotification("error", res.data.message || "Failed to delete.");
            }
        } catch (err: any) {
            console.error(err);
            showNotification("error", err.response?.data?.message || "Failed to delete.");
        }
    };

    // Logout
    const handleLogout = async () => {
        try {
            const res = await axios.post("/api/admin/logout");
            if (res.data.success) {
                router.push("/admin/login");
                router.refresh();
            }
        } catch (err) {
            console.error("Logout error:", err);
            showNotification("error", "Logout failed.");
        }
    };
    const resetForm = () => {
        setEditingId(null);
        setTitle("");
        setDescription("");
        setType("NOTICE");
        setFiles([]);
    };

    // Compute Stats
    const stats = {
        total: updates.length,
        notices: updates.filter(u => u.type === "NOTICE").length,
        exams: updates.filter(u => u.type === "EXAMINATION").length,
        tenders: updates.filter(u => u.type === "TENDER").length,
        news: updates.filter(u => u.type === "NEWS").length,
    };

    // Filter updates
    const filteredUpdates = updates.filter(update => {
        const matchesCategory = filterCategory === "ALL" || update.type === filterCategory;
        const matchesSearch = update.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             update.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Nav Header */}
            <header className="bg-blue-950 text-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <GraduationCap className="h-8 w-8 text-blue-300" />
                        <div>
                            <h1 className="text-xl font-bold tracking-tight">College ERP Admin</h1>
                            <p className="text-xs text-blue-200">Management Panel</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-1.5 px-4 py-2 border border-blue-800 rounded-xl bg-blue-900/40 hover:bg-blue-900 transition-all text-sm font-medium cursor-pointer"
                    >
                        <LogOut size={16} />
                        Logout
                    </button>
                </div>
            </header>

            {/* Dashboard Contents */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                
                {/* Notification Banner */}
                {notification && (
                    <div className={`mb-6 p-4 rounded-xl border-l-4 shadow-sm animate-fade-in flex items-start gap-3 ${
                        notification.type === "success" 
                            ? "bg-emerald-50 border-emerald-500 text-emerald-800" 
                            : "bg-red-50 border-red-500 text-red-800"
                    }`}>
                        <Info className="flex-shrink-0 mt-0.5" size={18} />
                        <p className="text-sm font-medium">{notification.message}</p>
                    </div>
                )}

                {/* Statistics Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                        <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Total Updates</p>
                        <p className="text-3xl font-extrabold text-slate-800 mt-2">{stats.total}</p>
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Notices</p>
                            <p className="text-3xl font-extrabold text-slate-800 mt-2">{stats.notices}</p>
                        </div>
                        <Bell className="text-blue-500 bg-blue-50 p-2.5 rounded-xl" size={44} />
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Exams</p>
                            <p className="text-3xl font-extrabold text-slate-800 mt-2">{stats.exams}</p>
                        </div>
                        <FileText className="text-emerald-500 bg-emerald-50 p-2.5 rounded-xl" size={44} />
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Tenders</p>
                            <p className="text-3xl font-extrabold text-slate-800 mt-2">{stats.tenders}</p>
                        </div>
                        <Landmark className="text-orange-500 bg-orange-50 p-2.5 rounded-xl" size={44} />
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">News</p>
                            <p className="text-3xl font-extrabold text-slate-800 mt-2">{stats.news}</p>
                        </div>
                        <Megaphone className="text-purple-500 bg-purple-50 p-2.5 rounded-xl" size={44} />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Add / Edit Form Column */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm sticky top-6">
                            <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                                <Plus size={18} className="text-blue-900" />
                                {editingId ? "Modify Existing Update" : "Publish New Update"}
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                                        Update Category
                                    </label>
                                    <select
                                        value={type}
                                        onChange={(e) => setType(e.target.value as any)}
                                        className="block w-full border border-slate-200 rounded-xl py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-950 text-sm bg-slate-50"
                                    >
                                        <option value="NOTICE">Notice Board</option>
                                        <option value="EXAMINATION">Examination</option>
                                        <option value="TENDER">Tender</option>
                                        <option value="NEWS">News</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="e.g. Admission Dates Extended for 2026"
                                        className="block w-full border border-slate-200 rounded-xl py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-blue-950 text-sm bg-slate-50 focus:bg-white"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                                        Description / Content
                                    </label>
                                    <textarea
                                        rows={4}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Provide complete details about the notice, tender or schedule..."
                                        className="block w-full border border-slate-200 rounded-xl py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-blue-950 text-sm bg-slate-50 focus:bg-white resize-y"
                                        required
                                    />
                                </div>

                                {/* Cloudinary File Attachment */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                                        Attachments (PDF / Images)
                                    </label>
                                    <div className="relative border border-dashed border-slate-300 rounded-xl bg-slate-50 p-4 hover:bg-slate-100 transition-all text-center cursor-pointer">
                                        <input
                                            type="file"
                                            onChange={handleFileUpload}
                                            disabled={uploading}
                                            accept="image/*,application/pdf"
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                                        />
                                        <div className="flex flex-col items-center justify-center gap-1 text-slate-500">
                                            {uploading ? (
                                                <>
                                                    <Loader2 className="animate-spin text-blue-950" size={24} />
                                                    <span className="text-xs font-semibold text-blue-950">Uploading to Cloudinary...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Upload size={24} className="text-slate-400" />
                                                    <span className="text-xs font-semibold">Click to select attachment</span>
                                                    <span className="text-[10px] text-slate-400">PDF, PNG, JPG up to 1MB</span>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    {/* Uploaded Files List */}
                                    {files.length > 0 && (
                                        <div className="mt-3 space-y-2">
                                            <p className="text-[11px] font-bold text-slate-400 uppercase">Uploaded Files ({files.length})</p>
                                            {files.map((fileUrl, index) => {
                                                const parts = fileUrl.split("/");
                                                const filename = parts[parts.length - 1];
                                                return (
                                                    <div key={index} className="flex items-center justify-between p-2 bg-blue-50 border border-blue-100 rounded-lg text-xs">
                                                        <a 
                                                            href={fileUrl} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer"
                                                            className="text-blue-900 font-medium truncate max-w-[180px] hover:underline flex items-center gap-1"
                                                        >
                                                            <ExternalLink size={12} className="flex-shrink-0" />
                                                            {filename}
                                                        </a>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveFile(index)}
                                                            className="text-slate-400 hover:text-red-500 p-0.5 rounded cursor-pointer"
                                                        >
                                                            <X size={14} />
                                                        </button>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>

                                <div className="flex gap-2 pt-2">
                                    <button
                                        type="submit"
                                        disabled={submitting || uploading}
                                        className="flex-1 py-2.5 border border-transparent text-sm font-semibold rounded-xl text-white bg-blue-950 hover:bg-blue-900 transition-all shadow-sm hover:shadow disabled:opacity-50 flex items-center justify-center gap-1.5 cursor-pointer"
                                    >
                                        {submitting ? (
                                            <Loader2 className="animate-spin h-4 w-4" />
                                        ) : editingId ? (
                                            "Update Document"
                                        ) : (
                                            "Publish Document"
                                        )}
                                    </button>
                                    
                                    {editingId && (
                                        <button
                                            type="button"
                                            onClick={resetForm}
                                            className="px-4 py-2.5 border border-slate-200 rounded-xl text-slate-700 bg-white hover:bg-slate-50 text-sm font-medium transition-all cursor-pointer"
                                        >
                                            Cancel
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Listing Column */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                            <div className="px-6 py-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex items-center justify-between w-full md:w-auto">
                                    <h2 className="text-lg font-bold text-slate-800">Published Board</h2>
                                    <button 
                                        onClick={fetchUpdates} 
                                        className="text-xs text-blue-950 font-semibold hover:underline cursor-pointer md:hidden"
                                    >
                                        Refresh
                                    </button>
                                </div>
                                <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search title..."
                                        className="border border-slate-200 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-950 w-full sm:w-48 bg-slate-50"
                                    />
                                    <select
                                        value={filterCategory}
                                        onChange={(e) => setFilterCategory(e.target.value)}
                                        className="border border-slate-200 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-950 w-full sm:w-auto bg-slate-50"
                                    >
                                        <option value="ALL">All Categories</option>
                                        <option value="NOTICE">Notices</option>
                                        <option value="EXAMINATION">Examinations</option>
                                        <option value="TENDER">Tenders</option>
                                        <option value="NEWS">News</option>
                                    </select>
                                    <button 
                                        onClick={fetchUpdates} 
                                        className="text-xs text-blue-950 font-semibold hover:underline cursor-pointer hidden md:block"
                                    >
                                        Refresh
                                    </button>
                                </div>
                            </div>

                            {loading ? (
                                <div className="flex flex-col items-center justify-center py-20 gap-3 text-slate-400">
                                    <Loader2 className="animate-spin text-blue-950" size={32} />
                                    <span className="text-sm">Retrieving update logs...</span>
                                </div>
                            ) : updates.length === 0 ? (
                                <div className="text-center py-20 text-slate-400 text-sm">
                                    No updates published yet. Use the form on the left to add.
                                </div>
                            ) : filteredUpdates.length === 0 ? (
                                <div className="text-center py-20 text-slate-400 text-sm">
                                    No updates found matching your search.
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse text-sm">
                                        <thead>
                                            <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 uppercase text-xs font-bold">
                                                <th className="px-6 py-3">Category</th>
                                                <th className="px-6 py-3">Title</th>
                                                <th className="px-6 py-3">Publish Date</th>
                                                <th className="px-6 py-3">Files</th>
                                                <th className="px-6 py-3 text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 text-slate-700">
                                            {filteredUpdates.map((update) => (
                                                <tr key={update._id} className="hover:bg-slate-50/50 transition-all">
                                                    <td className="px-6 py-4 font-semibold text-xs">
                                                        <span className={`px-2.5 py-1 rounded-full ${
                                                            update.type === "NOTICE" 
                                                                ? "bg-blue-50 text-blue-700 border border-blue-100" 
                                                                : update.type === "EXAMINATION"
                                                                ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                                                                : update.type === "TENDER"
                                                                ? "bg-orange-50 text-orange-700 border border-orange-100"
                                                                : "bg-purple-50 text-purple-700 border border-purple-100"
                                                        }`}>
                                                            {update.type}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 font-medium max-w-[200px] truncate" title={update.title}>
                                                        {update.title}
                                                    </td>
                                                    <td className="px-6 py-4 text-xs text-slate-500">
                                                        {new Date(update.createdAt).toLocaleDateString("en-US", {
                                                            month: "short",
                                                            day: "numeric",
                                                            year: "numeric"
                                                        })}
                                                    </td>
                                                    <td className="px-6 py-4 text-xs">
                                                        {update.files && update.files.length > 0 ? (
                                                            <span className="font-semibold text-blue-900 flex items-center gap-0.5">
                                                                <FileText size={13} />
                                                                {update.files.length} attachment(s)
                                                            </span>
                                                        ) : (
                                                            <span className="text-slate-400">None</span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <button
                                                                onClick={() => handleEdit(update)}
                                                                className="p-1.5 text-slate-400 hover:text-blue-900 hover:bg-slate-100 rounded-lg transition-all cursor-pointer"
                                                                title="Edit"
                                                            >
                                                                <Edit2 size={15} />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(update._id)}
                                                                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
                                                                title="Delete"
                                                            >
                                                                <Trash2 size={15} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>

                </div>

            </main>
        </div>
    );
}
