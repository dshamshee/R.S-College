import dbConnect from "@/config/dbConnection";
import UpdatesModel from "@/models/updates";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, FileText, Download, Landmark, Bell, Megaphone } from "lucide-react";
import { Metadata } from "next";

interface PageProps {
    params: Promise<{ id: string }>;
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    try {
        const { id } = await params;
        await dbConnect();
        const update = await UpdatesModel.findById(id);
        
        if (!update) {
            return {
                title: "Document Not Found | Ramdeo Sharda College",
            };
        }

        return {
            title: `${update.title} - RS College`,
            description: update.description.substring(0, 150) + "...",
        };
    } catch (e) {
        return {
            title: "College Update Details",
        };
    }
}

export default async function UpdateDetailPage({ params }: PageProps) {
    const { id } = await params;

    await dbConnect();

    // Verify valid MongoDB ID before querying
    const isValidId = id.match(/^[0-9a-fA-F]{24}$/);
    if (!isValidId) {
        notFound();
    }

    const update = await UpdatesModel.findById(id);

    if (!update) {
        notFound();
    }

    const formatDate = (date: Date) => {
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    // Helper to identify if a URL points to a PDF
    const isPdf = (url: string) => {
        return url.toLowerCase().includes(".pdf");
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Back button */}
                <div className="mb-6">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-blue-950 hover:text-blue-900 transition-colors"
                    >
                        <ArrowLeft size={16} />
                        Back to Home
                    </Link>
                </div>

                {/* Main Card */}
                <article className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
                    {/* Header Banner */}
                    <div className="px-8 py-8 border-b border-slate-100 bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white">
                        <div className="flex items-center gap-3 mb-4">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase ${
                                update.type === "NOTICE" 
                                    ? "bg-blue-100/20 text-blue-200 border border-blue-100/30" 
                                    : update.type === "EXAMINATION"
                                    ? "bg-emerald-100/20 text-emerald-200 border border-emerald-100/30"
                                    : update.type === "TENDER"
                                    ? "bg-orange-100/20 text-orange-200 border border-orange-100/30"
                                    : "bg-purple-100/20 text-purple-200 border border-purple-100/30"
                            }`}>
                                {update.type === "NOTICE" && <Bell size={12} />}
                                {update.type === "EXAMINATION" && <FileText size={12} />}
                                {update.type === "TENDER" && <Landmark size={12} />}
                                {update.type === "NEWS" && <Megaphone size={12} />}
                                {update.type}
                            </span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                            {update.title}
                        </h1>
                        <div className="flex items-center gap-2 mt-4 text-sm text-blue-200">
                            <Calendar size={15} />
                            <span>Published: {formatDate(update.createdAt)}</span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="px-8 py-8">
                        <div className="prose max-w-none text-slate-700 leading-relaxed whitespace-pre-line">
                            {update.description}
                        </div>

                        {/* Attachments Section */}
                        {update.files && update.files.length > 0 && (
                            <div className="mt-10 border-t border-slate-100 pt-8">
                                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                                    <FileText className="text-blue-900" size={20} />
                                    Attached Documents ({update.files.length})
                                </h3>

                                <div className="grid grid-cols-1 gap-6">
                                    {update.files.map((fileUrl, index) => {
                                        const parts = fileUrl.split("/");
                                        const filename = parts[parts.length - 1];
                                        const isDocumentPdf = isPdf(fileUrl);

                                        return (
                                            <div 
                                                key={index} 
                                                className="border border-slate-100 rounded-xl bg-slate-50 p-4 flex flex-col gap-4 shadow-sm"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2 bg-blue-100 text-blue-900 rounded-lg">
                                                            <FileText size={20} />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-semibold text-slate-800 truncate max-w-[280px] sm:max-w-md" title={filename}>
                                                                {filename}
                                                            </p>
                                                            <p className="text-xs text-slate-400">
                                                                {isDocumentPdf ? "PDF Document" : "Image File"}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <a
                                                        href={fileUrl}
                                                        download
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1 px-4 py-2 bg-blue-950 text-white rounded-lg hover:bg-blue-900 transition-colors text-xs font-semibold shadow-sm cursor-pointer"
                                                    >
                                                        <Download size={14} />
                                                        Download
                                                    </a>
                                                </div>

                                                {/* Embedded Preview */}
                                                <div className="mt-2 rounded-lg border border-slate-200 overflow-hidden bg-white">
                                                    {isDocumentPdf ? (
                                                        <iframe
                                                            src={`https://docs.google.com/gview?url=${encodeURIComponent(fileUrl)}&embedded=true`}
                                                            className="w-full h-[500px]"
                                                            style={{ border: "none" }}
                                                            title={`PDF Preview ${index}`}
                                                        />
                                                    ) : (
                                                        // eslint-disable-next-line @next/next/no-img-element
                                                        <img
                                                            src={fileUrl}
                                                            alt={`Attachment ${index + 1}`}
                                                            className="max-h-[500px] w-auto mx-auto object-contain p-2"
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </article>
            </div>
        </div>
    );
}
