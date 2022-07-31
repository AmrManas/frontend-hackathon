import Link from "next/link";
import React from "react";
import { FaBars } from "react-icons/fa";

const Sidebars = () => {
  const SidebarArray = [
    {
      name: "Dashboard",
      link: "/dashboard",
      // icon: <MdDashboard />
    },
    {
      name: "Project",
      link: "/project",
      // icon: <MdDashboard />
    },
    {
      name: "Timesheet",
      link: "/timeEntries",
      // icon: <MdDashboard />
    },
    {
      name: "Screenshot",
      link: "/screenshot",
      // icon: <MdDashboard />
    },
    {
      name: "Break",
      link: "/break",
      // icon: <MdDashboard />
    },
  ];
  return (
    <div className="h-[100vh] w-[20%] bg-white shadow-md my-2 rounded-lg">
      <div className="font-medium text-xl border-b py-2 px-2">
        <FaBars
        // onClick={(e) => {
        //   e.stopPropagation();
        // }}
        />
      </div>
      <div className="my-2 item-center text-center font-medium ">
        {SidebarArray?.map((item) => (
          <div
            key={item?.name}
            className="my-2 py-2 text-lg border-b last:border-none"
          >
            {/* <p>{item?.icon}</p> */}
            <Link href={item?.link} className="mb-1">
              {item.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebars;
