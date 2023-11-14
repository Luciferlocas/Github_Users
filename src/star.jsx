// import { useEffect } from "react";
// import React, { useState } from "react";
// import Loader from "./loader";

// export default function Star({ str }){
//   const [star, setStar] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     const stardata = async () => {
//       try {
//         setIsLoading(true);
//         const res = await fetch(str);
//         const data = await res.json();
//         console.log(data);
//         setStar(data);
//       } catch (error) {
//         console.log("Error");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     stardata();
//   }, [str]);

//   return (
//     <>
        
//     </>
//   );
// }
