import React from "react";
import { Table, Tag } from "antd";

const TimeSheet = () => {
  const dataSource = [
    {
      key: "1",
      date: "25-7-2022",
      inTime: "9:00 am",
      outTime: "6:30 pm",
    },
    {
      key: "2",
      date: "25-7-2022",
      inTime: "9:00 am",
      outTime: "6:30 pm",
    },
  ];

  const columns = [
    {
      title: "Sr no.",
      dataIndex: "date",
      key: "date",
      render: (_, __, idx) => {
        idx + 1;
      },
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "In time",
      dataIndex: "inTime",
      key: "intime",
    },
    {
      title: "Out time ",
      dataIndex: "outTime",
      key: "outTime",
      render: (data) => (
        <div>
          <Tag
            style={{ background: "green", color: "white", fontWeight: 600 }}
            className="bg-green-500 text-white font-medium"
          >
            {data}
          </Tag>
        </div>
      ),
    },
  ];
  return (
    <div className="mt-10 h-[85vh]">
      <div>
        <Table columns={columns} dataSource={dataSource} pagination={false} />
      </div>
    </div>
  );
};

export default TimeSheet;
