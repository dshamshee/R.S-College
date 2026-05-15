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

    return (
        <>
            <style>{animationStyles}</style>
            <Card className={`group relative rounded-md w-[370px] h-[380px] border-l-8 ${borderColor} overflow-hidden bg-background`}>
                <div className="h-full py-2">
                    {/* 
                        - animate-[scrollUp_20s_linear_infinite]: Uses the keyframes defined above
                        - group-hover:[animation-play-state:paused]: Pauses when the Card is hovered
                    */}
                    <div className="flex flex-col px-5 animate-[scrollUp_50s_linear_infinite] group-hover:[animation-play-state:paused]">
                        {[...updates, ...updates].map((update, index) => (
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
                </div>

                {/* Glassmorphism gradient overlays to hide the 'pop' at the edges */}
                <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-background via-background/80 to-transparent pointer-events-none z-10" />
                <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none z-10" />
            </Card>
        </>
    );
};