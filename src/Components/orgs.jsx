import { useEffect } from "react";
import React, { useState } from "react";
import Pagination from "./pagination.jsx";
import Loader from "./loader.jsx";

export default function Orgs({ orgs }) {
  const [orgsData, setOrgsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 5;
  const lastIndex = page * perPage;
  const firstIndex = lastIndex - perPage;
  const set = orgsData.slice(firstIndex, lastIndex);
  const totalPage = Math.ceil(orgsData.length / perPage);
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPage) {
      setPage(newPage);
    }
  };

  useEffect(() => {
    const orgData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(orgs);
        const data = await res.json();
        setOrgsData(data);
      } catch (error) {
        console.log("No orgs found,", error);
      } finally {
        setIsLoading(false);
      }
    };

    orgData();
  }, [orgs]);

  return (
    <>
      <section>
        <div className="repos">
          <h1>Organisations</h1>
        </div>
        {isLoading && <Loader />}
        {set.length !== 0 ? (
          set.map((org) => (
            <div className="orgname" key={org.id}>
              <div>
                <a href={org.html_url}>
                  Name - {org.login}
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="msg">"No Organization Found...🥲"</div>
        )}
        {orgsData.length > 5 ? (
          <Pagination page={page} func={handlePageChange} />
        ) : null}
      </section>
    </>
  );
}
