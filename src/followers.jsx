import { useEffect } from "react";
import React, { useState } from "react";
import Loader from "./loader";
import Pagination from "./pagination";

export default function Followers({ fol }){
  const [foll, setFol] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 5;
  const finalIndex = page * perPage;
  const initialIndex = finalIndex - perPage;
  const show = foll.slice(initialIndex, finalIndex);
  const totalPage = Math.ceil(foll.length / perPage);
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPage) {
      setPage(newPage);
    }
  };
 

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
          {isLoading ? <Loader /> : (show.length !== 0 ? show.map((f) => (
            <div className="follower">
            <div className="fol_avatar">
              <img src={f.avatar_url} alt="" />
            </div>
            <div className="fol_name">
              <a target="_blank" href={f.html_url}>{f.login}</a>
            </div>
          </div>
          )) : <div className="msg">"No Followers Yet...🥲"</div>)}
         <Pagination page={page} func={handlePageChange}/>
        </section>
    </>
  );
}
