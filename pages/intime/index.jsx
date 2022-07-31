import { Progress } from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { hostUrl } from "../../hostUrl";
import success from "../../images/success.gif";

const Intime = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  console.log("router?.query", router?.query?.id);
  const getAttendenceQrCode = () => {
    setLoading(true);
    if (router?.query?.intime) {
      axios
        .put(
          `${hostUrl}/user/updateTime`,
          { is_time_active: true },
          {
            headers: {
              id: router.query?.intime,
            },
          }
        )
        .then((res) => {
          console.log(res);
          setLoading(false);
        })
        .catch((err) => {
          if (err) {
            setLoading(false);
          }
        });
    }
  };
  useEffect(() => {
    getAttendenceQrCode();
    console.log("run");
  }, [router?.query?.intime]);

  return (
    <div className="h-screen  ">
      <h1 className="text-center text-4xl font-bold text-blue-600">
        You can Mark your intime now
      </h1>
      <iframe
        src={"/success.gif"}
        width="700px"
        className="mx-auto"
        height={"100%"}
      ></iframe>
    </div>
  );
};

export default Intime;
