import { poppins } from "@/app/fonsts";
import { NavbarItem } from "@nextui-org/react";
import Link from "next/link";

const MyNavbarItems = ({ activeIndex }) => {
    return (
        <>
            <NavbarItem
                className={
                    poppins.className + " " + (activeIndex == 0 ? "text-[#81FE05]" : "")
                }
            >
                <Link
                    color="foreground"
                    href="#"
                >
                    Dashboard
                </Link>
            </NavbarItem>
            <NavbarItem
                className={
                    poppins.className + " " + (activeIndex == 1 ? "text-[#81FE05]" : "")
                }
            >
                <Link
                    color="foreground"
                    href="#"
                >
                    Prediksi
                </Link>
            </NavbarItem>
            <NavbarItem
                className={
                    poppins.className + " " + (activeIndex == 2 ? "text-[#81FE05]" : "")
                }
            >
                <Link
                    color="foreground"
                    href="#"
                >
                    Bantuan
                </Link>
            </NavbarItem>
            <NavbarItem
                className={
                    poppins.className + " " + (activeIndex == 3 ? "text-[#81FE05]" : "")
                }
            >
                <Link
                    color="foreground"
                    href="#"
                >
                    Logout
                </Link>
            </NavbarItem>
        </>
    );
};

export default MyNavbarItems;