import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const Home = () => {
  let isRun = useRef(false);

  //   const data = ["1", "2", "3"];
  const [data, setData] = useState(null);
  useEffect(() => {
    if (isRun.current) return;
    isRun.current = true;
    const token = localStorage.getItem("react-token");
    console.log(token);
    axios
      .get("http://localhost:5000/about", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      {data &&
        data.map((item, index) => {
          return <h1 key={index}>{item}</h1>;
        })}
    </>
  );
};

export default Home;
