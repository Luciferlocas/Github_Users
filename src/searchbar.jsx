import React, { useState } from "react";
import Profile from "./profile";
import Loader from "./loader";

export default function SearchBar() {
  const [userInput, setUserInput] = useState("");
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const submitted = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(`https://api.github.com/users/${userInput}`);
      const data = await res.json();
      if(data.message === "Not Found"){
        alert(`${userInput} not found. PLease enter a valid username`);
        return(
          <></>
        );
      }
      setData(data);
    } catch (error) {
        console.log("Error, try reloding")
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="forum">
        <form onSubmit={submitted}>
          <input
            className="inputfield"
            type="text"
            placeholder="Search-in the Username (i.e luciferlocas)"
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="enter"
            style={{ opacity: userInput.length > 0 ? 1 : 0.4 }}
          >
            Search
          </button>
        </form>
      </div>
      {isLoading && <Loader />}
      <Profile data={data} />
    </>
  );
}
