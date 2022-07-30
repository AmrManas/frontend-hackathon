import { Avatar, Button, Input } from "antd";
import React from "react";

const TopBar = () => {
  const { Search } = Input;
  return (
    <div className=" bg-white ">
      <div className="flex gap-3 justify-between w-full my-3 p-3 rounded shadow">
        <div className="font-bold text-blue-700">Logo</div>
        <div className="w-[60%] ">
          <Search style={{ borderRadius: "5px" }} />
        </div>
        <div className="flex gap-2">
          <Button type="primary">Break</Button>
          <Avatar className="bg-blue-500">GS</Avatar>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
