import { useEffect } from "react";
import React, { useState } from "react";
import Loader from "./loader";
import Pagination from "./pagination";

export default function Followers({ fol }){
  const [foll, setFol] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 5;
  const lastIndex = page * perPage;
  const firstIndex = lastIndex - perPage;
  const set = foll.slice(firstIndex, lastIndex);
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
        console.log("Error loading followers,", error);
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
          {isLoading ? <Loader /> : (set.length !== 0 ? set.map((f) => (
            <div className="follower">
            <div className="fol_avatar">
              <img src={f.avatar_url} alt="" />
            </div>
            <div className="fol_name">
              <a target="_blank" href={f.html_url}>{f.login}</a>
            </div>
          </div>
          )) : <div className="msg">"No Followers Yet...🥲"</div>)}
         {foll.length > 5 ? (
          <Pagination page={page} func={handlePageChange} />
        ) : null}
        </section>
    </>
  );
}
