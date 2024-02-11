import React from "react";
import { Navbar, Typography } from "@material-tailwind/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBurger, faCarrot } from "@fortawesome/free-solid-svg-icons";
import { NavBarConfig } from "~/types/types";

export default function NavbarDefault() {
  const [openNav, setOpenNav] = React.useState(false);

  const config: NavBarConfig = {
    appName: "Meal Planner",
    items: [
      {
        name: "Ingredients",
        icon: faCarrot,
        link: "/Ingredients",
      },
      {
        name: "Meals",
        icon: faBurger,
        link: "/Meals",
      },
    ],
  };

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {config.items.map((item) => (
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="flex items-center gap-x-2 p-1 font-medium"
        >
          <a href={item.link} className="flex items-center">
            <FontAwesomeIcon className="pr-1" icon={item.icon} />
            {item.name}
          </a>
        </Typography>
      ))}
    </ul>
  );

  return (
    <Navbar className="mx-auto mt-4 max-w-screen-xl px-4 py-2 lg:px-8 lg:py-4">
      <div className="text-blue-gray-900 container mx-auto flex items-center justify-between">
        <Typography
          as="a"
          href="#"
          className="mr-4 cursor-pointer py-1.5 font-medium"
        >
          {config.appName}
        </Typography>
        <div className="hidden lg:block">{navList}</div>
        <div className="flex items-center gap-x-1"></div>
      </div>
    </Navbar>
  );
}
