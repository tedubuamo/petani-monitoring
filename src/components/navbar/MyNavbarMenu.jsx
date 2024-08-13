import { NavbarMenuItem, NavbarMenu } from "@nextui-org/react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLineChart,
  faHome,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
import ProfileButton from "./ProfileButton";
import { poppins } from "@/app/fonsts";

const MyNavbarMenu = ({ activeIndex }) => {
  return (
    <NavbarMenu
      className="text-[#D0D0D0] border-black border-t-1.5 px-0 w-[40%] gap-y-4 shadow-large navbar"
      motionProps={{ initial: false, exit: false }}
    >
      <div>
        <ProfileButton />
      </div>
      <NavbarMenuItem className={activeIndex == 0 ? "text-[#81FE05]" : ""}>
        <Link
          color="foreground"
          href="/"
          className="flex flex-row gap-1 text-medium"
        >
          <FontAwesomeIcon icon={faHome} size="lg" className="basis-1/3" />
          <p className={"basis-2/3 " + poppins.className}>Dashboard</p>
        </Link>
      </NavbarMenuItem>
      <NavbarMenuItem className={activeIndex == 1 ? "text-[#81FE05]" : ""}>
        <Link
          color="foreground"
          href="http://localhost:3001/prediksi"
          className="flex flex-row gap-1 text-medium"
        >
          <FontAwesomeIcon icon={faLineChart} size="lg" className="basis-1/3" />
          <p className={"basis-2/3 " + poppins.className}>Prediksi</p>
        </Link>
      </NavbarMenuItem>
      <NavbarMenuItem className={activeIndex == 2 ? "text-[#81FE05]" : ""}>
        <Link
          color="foreground"
          href="http://localhost:3001/bantuan"
          className="flex flex-row gap-1 text-medium"
        >
          <FontAwesomeIcon
            icon={faCircleQuestion}
            size="lg"
            className="basis-1/3"
          />
          <p className={"basis-2/3 " + poppins.className}>Bantuan</p>
        </Link>
      </NavbarMenuItem>
      <NavbarMenuItem className={activeIndex == 3 ? "text-[#81FE05]" : ""}>
        <Link
          color="foreground"
          href="#"
          className="flex flex-row gap-1 text-medium"
        >
          <FontAwesomeIcon
            icon={faArrowRightFromBracket}
            size="lg"
            className="basis-1/3"
          />
          <p className={"basis-2/3 " + poppins.className}>Logout</p>
        </Link>
      </NavbarMenuItem>
    </NavbarMenu>
  );
};

export default MyNavbarMenu;
