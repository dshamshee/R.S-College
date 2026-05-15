"use client"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

import { Menu } from "lucide-react"
import Link from "next/link"

const navItems = [
    {
        title: "About Us",
        links: [
            { label: "About College", href: "/about/college" },
            { label: "Our Principal", href: "/about/principal" },
        ],
    },
    {
        title: "Academics",
        links: [
            { label: "Courses", href: "/academics/courses" },
            { label: "Departments", href: "/academics/departments" },
            { label: "Faculties", href: "/academics/faculties" },
            { label: "Admissions", href: "/academics/admissions" },
            { label: "Research", href: "/academics/research" },
        ],
    },
    {
        title: "Infrastructure",
        links: [
            { label: "Conference Hall", href: "/infrastructure/conference" },
            { label: "Auditorium", href: "/infrastructure/auditorium" },
            { label: "Laboratories", href: "/infrastructure/laboratories" },
            { label: "Library", href: "/infrastructure/library" },
            { label: "Computer Lab", href: "/infrastructure/computer-lab" },
            { label: "Health Center", href: "/infrastructure/health" },
            { label: "Sports Complex", href: "/infrastructure/sports" },
        ],
    },
    {
        title: "Gallery",
        links: [
            { label: "Photo Gallery", href: "/gallery/photo" },
            { label: "Video Gallery", href: "/gallery/video" },
        ],
    },
    {
        title: "Student Zone",
        links: [
            { label: "Holidays", href: "/student/holidays" },
            { label: "Time Table", href: "/student/time-table" },
            { label: "Syllabus", href: "/student/syllabus" },
            { label: "Results", href: "/student/results" },
        ],
    },
]

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full bg-[#002b5b] text-white shadow-md">

            {/* Desktop Navbar */}
            <div className="hidden lg:flex justify-center">
                <NavigationMenu>
                    <NavigationMenuList>

                        {/* Home */}
                        <NavigationMenuItem>
                            <NavigationMenuLink
                                href="/"
                                className="px-4 py-2 hover:bg-white/10 hover:text-white transition-colors"
                            >
                                Home
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                        {/* Dynamic Items */}
                        {navItems.map((item) => (
                            <NavigationMenuItem key={item.title}>

                                <NavigationMenuTrigger className="bg-transparent hover:text-black text-white">
                                    {item.title}
                                </NavigationMenuTrigger>

                                <NavigationMenuContent>
                                    <div className="flex min-w-[240px] flex-col gap-1 bg-white p-3 text-black shadow-lg">

                                        {item.links.map((link) => (
                                            <NavigationMenuLink
                                                key={link.href}
                                                href={link.href}
                                                className="rounded-md px-3 py-2 text-sm transition-colors hover:bg-slate-100"
                                            >
                                                {link.label}
                                            </NavigationMenuLink>
                                        ))}

                                    </div>
                                </NavigationMenuContent>

                            </NavigationMenuItem>
                        ))}

                        {/* Contact */}
                        <NavigationMenuItem>
                            <NavigationMenuLink
                                href="/contact"
                                className="px-4 py-2 hover:bg-white/10 hover:text-white transition-colors"
                            >
                                Contact Us
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                    </NavigationMenuList>
                </NavigationMenu>
            </div>

            {/* Mobile Navbar */}
            <div className="flex h-16 items-center justify-between px-4 lg:hidden">

                {/* Logo */}
                <h1 className="text-lg font-bold tracking-wide">
                    R.S College
                </h1>

                {/* Mobile Menu */}
                <Sheet>

                    <SheetTrigger className="rounded-md p-2 hover:bg-white/10">
                        <Menu size={28} />
                    </SheetTrigger>

                    <SheetContent
                        side="right"
                        className="w-[85%] overflow-y-auto border-none bg-[#002b5b] text-white sm:w-[350px]"
                    >
                        <div className="mt-8 flex flex-col gap-2">

                            {/* Home */}
                            <Link
                                href="/"
                                className="rounded-md px-4 py-3 text-base font-medium transition-colors hover:bg-white/10"
                            >
                                Home
                            </Link>

                            {/* Accordion */}
                            <Accordion className="w-full">

                                {navItems.map((item, index) => (
                                    <AccordionItem
                                        key={item.title}
                                        value={`item-${index}`}
                                        className="border-white/10"
                                    >

                                        <AccordionTrigger className="px-4 hover:no-underline">
                                            {item.title}
                                        </AccordionTrigger>

                                        <AccordionContent>
                                            <div className="flex flex-col gap-1 pl-2">

                                                {item.links.map((link) => (
                                                    <a
                                                        key={link.href}
                                                        href={link.href}
                                                        className="rounded-md px-4 py-2 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                                                    >
                                                        {link.label}
                                                    </a>
                                                ))}

                                            </div>
                                        </AccordionContent>

                                    </AccordionItem>
                                ))}

                            </Accordion>

                            {/* Contact */}
                            <a
                                href="/contact"
                                className="rounded-md px-4 py-3 text-base font-medium transition-colors hover:bg-white/10"
                            >
                                Contact Us
                            </a>

                        </div>
                    </SheetContent>

                </Sheet>

            </div>
        </nav>
    )
}