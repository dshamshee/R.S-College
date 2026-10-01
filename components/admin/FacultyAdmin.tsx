"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { 
    Plus, Trash2, Edit2, Upload, Loader2, GraduationCap, 
    Mail, Phone, BookOpen, User, Award, X, Image as ImageIcon 
} from "lucide-react";
import { FacultyType } from "@/models/faculty";

interface FacultyAdminProps {
    showNotification: (type: "success" | "error", message: string) => void;
}

export default function FacultyAdmin({ showNotification }: FacultyAdminProps) {
    const [faculties, setFaculties] = useState<FacultyType[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Form state
    const [name, setName] = useState("");
    const [designation, setDesignation] = useState("");
    const [department, setDepartment] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [type, setType] = useState<"TEACHING" | "NON_TEACHING">("TEACHING");
    const [image, setImage] = useState("");
    const [achivementInput, setAchivementInput] = useState("");
    const [achivements, setAchivements] = useState<string[]>([]);

    // Search and filter state
    const [searchQuery, setSearchQuery] = useState("");
    const [filterType, setFilterType] = useState<string>("ALL");

    const fetchFaculties = async () => {
        setLoading(true);
        try {
            const res = await axios.get("/api/admin/faculty");
            if (res.data.success) {
                setFaculties(res.data.data || []);
            }
        } catch (err: any) {
            console.error("Fetch faculties error:", err);
            showNotification("error", err.response?.data?.message || "Failed to fetch faculties.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFaculties();
    }, []);

    const resetForm = () => {
        setEditingId(null);
        setName("");
        setDesignation("");
        setDepartment("");
        setEmail("");
        setPhone("");
        setType("TEACHING");
        setImage("");
        setAchivements([]);
        setAchivementInput("");
    };

    const handleAddAchievement = () => {
        if (achivementInput.trim()) {
            setAchivements([...achivements, achivementInput.trim()]);
            setAchivementInput("");
        }
    };

    const handleRemoveAchievement = (index: number) => {
        setAchivements(achivements.filter((_, i) => i !== index));
    };

    // Upload Faculty Image to Cloudinary (RDS folder)
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadingImage(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "RDS");

        try {
            const res = await axios.post("/api/admin/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (res.data.success && res.data.url) {
                setImage(res.data.url);
                showNotification("success", "Image compressed & uploaded to RDS successfully!");
            } else {
                console.error("Upload response missing URL:", res.data);
                showNotification("error", res.data.message || "Upload succeeded but no image URL was returned.");
            }
        } catch (err: any) {
            console.error("Image upload error:", err);
            showNotification("error", err.response?.data?.message || "Image upload failed.");
        } finally {
            setUploadingImage(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (uploadingImage) {
            showNotification("error", "Please wait for the image upload to complete before saving.");
            return;
        }

        if (!name.trim() || !designation.trim() || !department.trim()) {
            showNotification("error", "Name, Designation, and Department are required fields.");
            return;
        }

        setSubmitting(true);
        const payload = {
            name,
            designation,
            department,
            email,
            phone,
            type,
            image: image || null,
            achivements,
        };

        try {
            if (editingId) {
                const res = await axios.put("/api/admin/faculty", { id: editingId, ...payload });
                if (res.data.success) {
                    showNotification("success", "Faculty member updated successfully!");
                    resetForm();
                    fetchFaculties();
                } else {
                    showNotification("error", res.data.message || "Failed to update faculty.");
                }
            } else {
                const res = await axios.post("/api/admin/faculty", payload);
                if (res.data.success) {
                    showNotification("success", "Faculty member added successfully!");
                    resetForm();
                    fetchFaculties();
                } else {
                    showNotification("error", res.data.message || "Failed to add faculty.");
                }
            }
        } catch (err: any) {
            console.error(err);
            showNotification("error", err.response?.data?.error || "Failed to save faculty.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleEdit = (fac: FacultyType) => {
        setEditingId(fac._id);
        setName(fac.name);
        setDesignation(fac.designation);
        setDepartment(fac.department);
        setEmail(fac.email || "");
        setPhone(fac.phone || "");
        setType((fac.type as "TEACHING" | "NON_TEACHING") || "TEACHING");
        setImage(fac.image || "");
        setAchivements(fac.achivements || []);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this faculty member?")) return;
        try {
            const res = await axios.delete(`/api/admin/faculty?id=${id}`);
            if (res.data.success) {
                showNotification("success", "Faculty deleted successfully!");
                fetchFaculties();
                if (editingId === id) resetForm();
            } else {
                showNotification("error", res.data.message || "Failed to delete faculty.");
            }
        } catch (err: any) {
            console.error(err);
            showNotification("error", err.response?.data?.message || "Failed to delete faculty.");
        }
    };

    const filteredFaculties = faculties.filter((f) => {
        const matchesType = filterType === "ALL" || f.type === filterType;
        const matchesQuery = 
            f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            f.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
            f.designation.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesType && matchesQuery;
    });

    return (
        <div className="space-y-8">
            {/* Form Section */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-blue-50 text-blue-900 rounded-xl">
                            <GraduationCap size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-800">
                                {editingId ? "Edit Faculty Details" : "Add New Faculty Member"}
                            </h2>
                            <p className="text-xs text-slate-500">
                                Upload faculty profile, designation, department & contact details
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Name */}
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                                Full Name <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Dr. Rajesh Kumar"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900"
                                />
                            </div>
                        </div>

                        {/* Designation */}
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                                Designation <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <GraduationCap className="absolute left-3 top-3 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Associate Professor & HOD"
                                    value={designation}
                                    onChange={(e) => setDesignation(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900"
                                />
                            </div>
                        </div>

                        {/* Department */}
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                                Department <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <BookOpen className="absolute left-3 top-3 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Physics / Chemistry / English"
                                    value={department}
                                    onChange={(e) => setDepartment(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 text-slate-400" size={18} />
                                <input
                                    type="email"
                                    placeholder="e.g. faculty@purnea.ac.in"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900"
                                />
                            </div>
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                                Phone Number
                            </label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-3 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="e.g. +91 9876543210"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900"
                                />
                            </div>
                        </div>

                        {/* Faculty Type */}
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                                Faculty Type <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value as "TEACHING" | "NON_TEACHING")}
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 font-semibold"
                            >
                                <option value="TEACHING">TEACHING STAFF</option>
                                <option value="NON_TEACHING">NON-TEACHING STAFF</option>
                            </select>
                        </div>
                    </div>

                    {/* Image Upload & Cloudinary RDS Folder */}
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                            Faculty Image (Compressed & Uploaded to Cloudinary <code className="bg-blue-100 text-blue-800 px-1 rounded">RDS</code> Directory)
                        </label>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <div className="relative flex-grow w-full">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    disabled={uploadingImage}
                                    className="block w-full text-xs text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-900 file:text-white hover:file:bg-blue-800 transition-all cursor-pointer"
                                />
                            </div>
                            {uploadingImage && (
                                <div className="flex items-center gap-2 text-xs font-medium text-blue-600">
                                    <Loader2 className="animate-spin" size={16} /> Compressing & Uploading...
                                </div>
                            )}
                        </div>

                        {/* Image Preview */}
                        {image && (
                            <div className="mt-3 flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200 max-w-md">
                                <div className="relative w-14 h-14 rounded-lg overflow-hidden border bg-white flex-shrink-0">
                                    <Image src={image} alt="Preview" fill className="object-cover" />
                                </div>
                                <div className="overflow-hidden flex-grow">
                                    <p className="text-xs font-semibold text-emerald-700 truncate">Image Uploaded Successfully</p>
                                    <p className="text-[10px] text-slate-400 truncate">{image}</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setImage("")}
                                    className="p-1 hover:bg-slate-200 rounded text-slate-500"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Achievements Input */}
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                            Achievements / Awards (Optional)
                        </label>
                        <div className="flex gap-2 mb-3">
                            <input
                                type="text"
                                placeholder="e.g. Ph.D. in Astrophysics, Published 15 International Papers"
                                value={achivementInput}
                                onChange={(e) => setAchivementInput(e.target.value)}
                                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddAchievement(); } }}
                                className="flex-grow px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/20"
                            />
                            <button
                                type="button"
                                onClick={handleAddAchievement}
                                className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold flex items-center gap-1 transition-colors"
                            >
                                <Plus size={16} /> Add
                            </button>
                        </div>

                        {/* Achievements Tags */}
                        {achivements.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {achivements.map((ach, idx) => (
                                    <span
                                        key={idx}
                                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-900 border border-amber-200 text-xs font-medium rounded-lg"
                                    >
                                        <Award size={13} className="text-amber-600" />
                                        {ach}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveAchievement(idx)}
                                            className="hover:text-red-600 ml-1"
                                        >
                                            <X size={14} />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end pt-4 border-t border-slate-100">
                        <button
                            type="submit"
                            disabled={submitting || uploadingImage}
                            className="px-6 py-3 bg-blue-950 hover:bg-blue-900 text-white font-bold rounded-xl text-sm transition-all shadow-md flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                        >
                            {submitting ? (
                                <>
                                    <Loader2 className="animate-spin" size={18} /> Saving Faculty...
                                </>
                            ) : (
                                <>
                                    <Plus size={18} /> {editingId ? "Update Faculty Member" : "Save Faculty Member"}
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>

            {/* List & Management Section */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
                    <div>
                        <h3 className="text-lg font-bold text-slate-800">Faculty Directory ({filteredFaculties.length})</h3>
                        <p className="text-xs text-slate-500">Manage existing faculties, update images and details</p>
                    </div>

                    {/* Filters & Search */}
                    <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                        <input
                            type="text"
                            placeholder="Search name/dept..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900/20"
                        />
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg font-semibold text-slate-700"
                        >
                            <option value="ALL">ALL TYPES</option>
                            <option value="TEACHING">TEACHING STAFF</option>
                            <option value="NON_TEACHING">NON-TEACHING STAFF</option>
                        </select>
                    </div>
                </div>

                {loading ? (
                    <div className="py-12 flex flex-col items-center justify-center text-slate-400">
                        <Loader2 className="animate-spin mb-2" size={32} />
                        <p className="text-xs font-semibold">Loading faculties list...</p>
                    </div>
                ) : filteredFaculties.length === 0 ? (
                    <div className="py-12 text-center text-slate-400">
                        <GraduationCap className="mx-auto mb-2 opacity-50" size={40} />
                        <p className="text-sm font-semibold">No faculty members found.</p>
                        <p className="text-xs">Add your first faculty member using the form above.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredFaculties.map((fac) => (
                            <div
                                key={fac._id}
                                className="bg-slate-50 p-5 rounded-xl border border-slate-200 flex flex-col justify-between hover:shadow-md transition-all"
                            >
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-sm flex-shrink-0 bg-slate-200">
                                            {fac.image ? (
                                                <Image src={fac.image} alt={fac.name} fill className="object-cover" />
                                            ) : (
                                                <User className="w-8 h-8 m-auto text-slate-400 mt-2" />
                                            )}
                                        </div>
                                        <div className="overflow-hidden">
                                            <h4 className="font-bold text-slate-800 text-sm truncate">{fac.name}</h4>
                                            <p className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider truncate">
                                                {fac.designation}
                                            </p>
                                            <span className="inline-block px-2 py-0.5 mt-1 text-[10px] font-bold bg-blue-100 text-blue-800 rounded">
                                                {fac.department}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-1 pt-2 border-t border-slate-200/60 text-xs text-slate-600">
                                        {fac.email && (
                                            <p className="truncate flex items-center gap-1.5">
                                                <Mail size={13} className="text-slate-400" /> {fac.email}
                                            </p>
                                        )}
                                        {fac.phone && (
                                            <p className="truncate flex items-center gap-1.5">
                                                <Phone size={13} className="text-slate-400" /> {fac.phone}
                                            </p>
                                        )}
                                    </div>

                                    {fac.achivements && fac.achivements.length > 0 && (
                                        <div className="pt-2">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                                                Achievements
                                            </p>
                                            <div className="flex flex-wrap gap-1">
                                                {fac.achivements.map((a, i) => (
                                                    <span key={i} className="text-[10px] bg-amber-100/80 text-amber-900 px-1.5 py-0.5 rounded">
                                                        {a}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center justify-end gap-2 pt-4 mt-4 border-t border-slate-200/60">
                                    <button
                                        onClick={() => handleEdit(fac)}
                                        className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors flex items-center gap-1 text-xs font-semibold"
                                    >
                                        <Edit2 size={14} /> Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(fac._id)}
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
