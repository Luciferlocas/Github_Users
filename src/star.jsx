import React, { useState } from "react";
import { useEffect } from "react";
import Loader from "./loader";
import Button from "./button";
import Pagination from "./pagination";

export default function Starred({ link }) {
  const [str, setStar] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 5;
  const lastIndex = page * perPage;
  const firstIndex = lastIndex - perPage;
  const set = str.slice(firstIndex, lastIndex);
  const totalPage = Math.ceil(str.length / perPage);
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPage) {
      setPage(newPage);
    }
  };

  useEffect(() => {
    const foldata = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`https://api.github.com/users/${link}/starred`);
        const data = await res.json();
        setStar(data);
      } catch (error) {
        console.log("Error");
      } finally {
        setIsLoading(false);
      }
    };

    foldata();
  }, []);

  return (
    <>
      <section>
        <div className="repos">
          <h1>Starred</h1>
        </div>
        {isLoading ? (
          <Loader />
        ) : set.length !== 0 ? (
          set.map((f) => (
            <div className="owner_info">
              <div>
                <a target="_blank" href={f.html_url}>Name - <Button value={f.name} color="red"/></a>
              </div>
              <div className="owner">
                <div className="own_avatar">
                  <img src={f.owner.avatar_url} alt="" />
                </div>
                <div className="own_name">
                  <a target="_blank" href={f.owner.html_url}>
                    {f.owner.login}
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="msg">"No Starred Repo Yet...😮‍💨"</div>
        )}
        {str.length > 5 ? (
          <Pagination page={page} func={handlePageChange}/>
        ) : null}
      </section>
    </>
  );
}
