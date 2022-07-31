import { Avatar, Button, Input } from "antd";
import React from "react";
import Image from "next/image";

import MainLogo from "../../images/main-logo.png";
import { useAtom } from "jotai";
import { userCurrent } from "../../store/currentUser";

const TopBar = () => {
  const { Search } = Input;
  const [user] = useAtom(userCurrent);
  return (
    <div className=" bg-white ">
      <div className="flex gap-3 justify-between w-full p-3 rounded shadow">
        <div className="font-bold text-blue-700">
          <Image src={MainLogo} alt="..." height={50} />
        </div>
        {/* <div className="w-[60%] ">
          <Search style={{ borderRadius: "5px" }} />
        </div> */}
        <div className="flex gap-2 items-center">
          <span className="font-medium text-gray-900 capitalize ">
            {user?.user?.name}
          </span>
          <Avatar className="bg-blue-500">{user?.user?.name[0]}</Avatar>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
