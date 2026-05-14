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
        <NavigationMenu className={"bg-[#002b5b] text-white"}>
            <NavigationMenuList>

                
                {/* Home */}
                <NavigationMenuItem className={'hover:text-black'}>
                    <NavigationMenuLink href="/">Home</NavigationMenuLink>
                </NavigationMenuItem>

                {/* About Us */}
                <NavigationMenuItem className={'hover:text-black'}>
                    <NavigationMenuTrigger>About Us</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <NavigationMenuLink href="/about/college">About College</NavigationMenuLink>
                        <NavigationMenuLink href="/about/principal">Our Principal</NavigationMenuLink>
                    </NavigationMenuContent>
                </NavigationMenuItem>


                {/* Academics */}
                <NavigationMenuItem className={'hover:text-black'}>
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
                <NavigationMenuItem className={'hover:text-black'}>
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
                <NavigationMenuItem className={'hover:text-black'}>
                    <NavigationMenuTrigger>Gallery</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <NavigationMenuLink href="/gallery/photo">Photo Gallery</NavigationMenuLink>
                        <NavigationMenuLink href="/gallery/video">Video Gallery</NavigationMenuLink>
                    </NavigationMenuContent>
                </NavigationMenuItem>




                {/* Student Zone */}
                <NavigationMenuItem className={'hover:text-black'}>
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
                <NavigationMenuItem className={'hover:text-black'}>
                    <NavigationMenuLink href="/contact">Contact Us</NavigationMenuLink>
                </NavigationMenuItem>

            </NavigationMenuList>
        </NavigationMenu>
    )
}