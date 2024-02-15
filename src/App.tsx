import AppBar from "./components/AppBar";
import ReviewCards from "./components/ReviewCards";
import { useState, useEffect } from "react";
import socket from "./socket";

const App = () => {
  const [reviews, setReviews] = useState<any>([]);
  let skt = socket.connect();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    skt.on("newReviews", (data: any) => {
      console.log(data);
      let now = new Date().valueOf();
      let values: string[] = [];
      for (const k in data["records"]) {
        let diff = Math.abs(
          now - new Date(data["records"][k]["time"]).valueOf()
        );
    // difference set to 5 days instead of 48 hours
        if (diff / 36e5 <= 120) {
          data["records"][k]["time"] = new Date(data["records"][k]["time"])
            .toUTCString()
            .slice(0, -3);
          values.push(data["records"][k]);
        }
      }
      setReviews(values);
    });
  }, [skt, reviews]);

  const fetchData = async () => {
    const response = await fetch("http://localhost:3000/api/reviews");
    const data = await response.json();
    console.log(data);
    let now = new Date().valueOf();
    let values: string[] = [];
    for (const k in data["data"]["records"]) {
      let diff = Math.abs(
        now - new Date(data["data"]["records"][k]["time"]).valueOf()
      );

      if (diff / 36e5 <= 120) {
        data["data"]["records"][k]["time"] = new Date(
          data["data"]["records"][k]["time"]
        )
          .toUTCString()
          .slice(0, -3);
        values.push(data["data"]["records"][k]);
      }
    }
    setReviews(values);
  };
  return (
    <div
      className="container-fluid"
      style={{
        margin: "0px",
        padding: "0px",
      }}
    >
      <AppBar></AppBar>
      <ReviewCards records={reviews}></ReviewCards>
    </div>
  );
};

export default App;
