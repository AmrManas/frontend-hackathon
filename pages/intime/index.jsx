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
    if (router?.query?.id) {
      axios
        .put(
          `${hostUrl}/user/updateTime`,
          {},
          {
            headers: {
              id: router.query?.id,
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
  }, [router?.query?.id]);

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
