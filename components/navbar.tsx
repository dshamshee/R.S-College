import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

export default function Navbar() {

    return (
        <NavigationMenu className={"bg-blue-900 text-white"}>
            <NavigationMenuList>

                
                {/* Home */}
                <NavigationMenuItem>
                    <NavigationMenuLink href="/">Home</NavigationMenuLink>
                </NavigationMenuItem>

                {/* About Us */}
                <NavigationMenuItem>
                    <NavigationMenuTrigger>About Us</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <NavigationMenuLink href="/about/college">About College</NavigationMenuLink>
                        <NavigationMenuLink href="/about/principal">Our Principal</NavigationMenuLink>
                        <NavigationMenuLink href="/about/vision">Our Vision</NavigationMenuLink>
                        <NavigationMenuLink href="/about/mission">Our Mission</NavigationMenuLink>
                        <NavigationMenuLink href="/about/values">Our Values</NavigationMenuLink>
                    </NavigationMenuContent>
                </NavigationMenuItem>


                {/* Academics */}
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Academics</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <NavigationMenuLink href="/academics/courses">Courses</NavigationMenuLink>
                        <NavigationMenuLink href="/academics/departments">Departments</NavigationMenuLink>
                        <NavigationMenuLink href="/academics/faculties">Faculties</NavigationMenuLink>
                        <NavigationMenuLink href="/academics/admissions">Admissions</NavigationMenuLink>
                        <NavigationMenuLink href="/academics/research">Research</NavigationMenuLink>
                    </NavigationMenuContent>
                </NavigationMenuItem>


                {/* Infrastructure */}
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Infrastructure</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <NavigationMenuLink href="/infrastructure/conference-hall">Conference Hall</NavigationMenuLink>
                        <NavigationMenuLink href="/infrastructure/auditorium">Auditorium</NavigationMenuLink>
                        <NavigationMenuLink href="/infrastructure/laboratories">Laboratories</NavigationMenuLink>
                        <NavigationMenuLink href="/infrastructure/library">Library</NavigationMenuLink>
                        <NavigationMenuLink href="/infrastructure/computer-lab">Computer Lab</NavigationMenuLink>
                        <NavigationMenuLink href="/infrastructure/health">Health Center</NavigationMenuLink>
                        <NavigationMenuLink href="/infrastructure/sports">Sports Complex</NavigationMenuLink>
                    </NavigationMenuContent>
                </NavigationMenuItem>



                {/* Gallery */}
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Gallery</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <NavigationMenuLink href="/gallery/photo">Photo Gallery</NavigationMenuLink>
                        <NavigationMenuLink href="/gallery/video">Video Gallery</NavigationMenuLink>
                    </NavigationMenuContent>
                </NavigationMenuItem>




                {/* Student Zone */}
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Student Zone</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <NavigationMenuLink href="/student/login">Student Login</NavigationMenuLink>
                        <NavigationMenuLink href="/student/registration">Student Registration</NavigationMenuLink>
                        <NavigationMenuLink href="/student/results">Student Results</NavigationMenuLink>
                        <NavigationMenuLink href="/student/attendance">Student Attendance</NavigationMenuLink>
                        <NavigationMenuLink href="/student/fees">Student Fees</NavigationMenuLink>
                        <NavigationMenuLink href="/student/library">Student Library</NavigationMenuLink>
                    </NavigationMenuContent>
                </NavigationMenuItem>


                {/* Contact Us */}
                <NavigationMenuItem>
                    <NavigationMenuLink href="/contact">Contact Us</NavigationMenuLink>
                </NavigationMenuItem>

            </NavigationMenuList>
        </NavigationMenu>
    )
}