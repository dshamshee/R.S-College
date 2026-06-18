import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { UpdatesType } from "@/models/updates";
import Link from "next/link";

export const UpdatesCard = ({ updates, borderColor }: { updates: UpdatesType[], borderColor: string }) => {
    
    const formatDate = (dateValue: Date | string) => {
        const date = typeof dateValue === 'string' ? new Date(dateValue) : dateValue;
        if (isNaN(date.getTime())) return "Invalid Date";
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    // We define the keyframes as a string to inject into a style tag if the config is missing
    const animationStyles = `
        @keyframes scrollUp {
            0% { transform: translateY(0); }
            100% { transform: translateY(-50%); }
        }
    `;

    const hasUpdates = updates && updates.length > 0;
    const shouldScroll = updates && updates.length > 3;

    return (
        <>
            <style>{animationStyles}</style>
            <Card className={`group relative rounded-md w-[370px] h-[380px] border-l-8 ${borderColor} overflow-hidden bg-background`}>
                <div className="h-full py-2">
                    {!hasUpdates ? (
                        <div className="h-full flex items-center justify-center px-6 text-center">
                            <span className="text-sm text-slate-400 font-medium">No announcements published yet.</span>
                        </div>
                    ) : (
                        <div className={`flex flex-col px-5 ${shouldScroll ? 'animate-[scrollUp_50s_linear_infinite] group-hover:[animation-play-state:paused]' : ''}`}>
                            {(shouldScroll ? [...updates, ...updates] : updates).map((update, index) => (
                                <CardHeader key={`${update._id}-${index}`} className="px-0 py-3 border-b border-border/40 last:border-0">
                                    <CardTitle>
                                        <Link
                                            className="hover:text-primary font-semibold flex flex-col items-start transition-all duration-300 hover:underline"
                                            href={`/updates/${update._id}`}
                                        >
                                            <span className="text-sm leading-snug">
                                                {update.title.charAt(0).toUpperCase() + update.title.slice(1).toLowerCase()}
                                            </span>
                                            <span className="text-[10px] text-muted-foreground mt-1" suppressHydrationWarning>
                                                {formatDate(update.createdAt)}
                                            </span>
                                        </Link>
                                    </CardTitle>
                                </CardHeader>
                            ))}
                        </div>
                    )}
                </div>

                {hasUpdates && shouldScroll && (
                    <>
                        {/* Glassmorphism gradient overlays to hide the 'pop' at the edges */}
                        <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-background via-background/80 to-transparent pointer-events-none z-10" />
                        <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none z-10" />
                    </>
                )}
            </Card>
        </>
    );
};