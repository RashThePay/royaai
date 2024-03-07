'use client'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, Link, Button } from "@nextui-org/react";
import Icon from "@/components/Icon"
import { usePathname } from "next/navigation";



export default function RoyaNavbar() {
  const currentPath = usePathname();
  return (
    <Navbar className="bg-transparent backdrop-blur-none backdrop-saturate-1 max-w-[100dvw]" >

      <NavbarContent className="flex gap-4 w-full" justify="center">
        <NavbarBrand>
          <Link href="/">
            <p className=" font-bold text-xl text-foreground">رویا.<span className="text-primary">آ</span>.یی</p>
          </Link>
        </NavbarBrand>

        <NavbarItem>
          <Link color={(currentPath == "/basic") ? 'primary' : 'foreground'} href="/basic">
            <Icon name="sparkle" />
            <span className="hidden sm:inline">رویاباف</span>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color={(currentPath == "/advanced") ? 'primary' : 'foreground'} href="/advanced">
            <Icon name="sparkles" />
            <span className="hidden sm:inline">پیشرفته</span>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color={(currentPath == "/gallery") ? 'primary' : 'foreground'} href="/gallery">
            <Icon name="rectangles-mixed" />
            <span className="hidden sm:inline">گالری</span>
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
