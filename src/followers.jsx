import { useEffect } from "react";
import React, { useState } from "react";
import Loader from "./loader";

export default function Followers({ fol }){
  const [foll, setFol] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const foldata = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(fol);
        const data = await res.json();
        setFol(data);
      } catch (error) {
        console.log("Error");
      } finally {
        setIsLoading(false);
      }
    };

    foldata();
  }, [fol]);

  return (
    <>
        <section>
          <div className="repos">
            <h1>Followers</h1>
          </div>
          {isLoading && <Loader />}
          {foll.length !== 0 ? foll.map((f) => (
            <div className="follower">
            <div className="fol_avatar">
              <img src={f.avatar_url} alt="" />
            </div>
            <div className="fol_name">
              <a target="_blank" href={f.html_url}>{f.login}</a>
            </div>
          </div>
          )) : <div className="msg">"No Followers Yet...🥲"</div> }
        </section>
    </>
  );
}
