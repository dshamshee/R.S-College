import Link from "next/link"
import { Card, CardContent } from "./ui/card"

export const LinkCard = ({ icon, title, link }: { icon: React.ReactNode, title: string, link: string }) => {
    return (
        <Link href={link} className="block group">
            <Card className="rounded-lg border border-slate-100 bg-white hover:border-blue-400 hover:shadow-sm transition-all duration-200 w-full h-[140px] flex flex-col items-center justify-center">
                <CardContent className="p-0 flex flex-col items-center justify-center gap-3">
                    {/* Minimal Icon: Removed heavy scaling, added subtle color shift */}
                    <div className="text-slate-400 group-hover:text-blue-600 transition-colors duration-200">
                        {icon}
                    </div>
                    {/* Minimal Title: Reduced weight and size for a cleaner look */}
                    <p className="text-slate-600 group-hover:text-slate-900 font-medium text-center px-3 text-xs md:text-sm tracking-tight">
                        {title}
                    </p>
                </CardContent>
            </Card>
        </Link>
    )
}