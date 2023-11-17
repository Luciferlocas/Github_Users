import React, { useRef, useEffect } from "react";

export default function Cursor() {
  const blobRef = useRef(null);

  useEffect(() => {
    const blob = blobRef.current;

    document.body.onpointermove = (event) => {
      const { clientX, clientY } = event;

      blob.animate(
        {
          left: `${clientX}px`,
          top: `${clientY}px`,
        },
        {
          duration: 1000,
          fill: "forwards",
        }
      );
    };
  }, [blobRef]);

  return (
    <>
      <div ref={blobRef} id="blob"></div>
      <div className="blur"></div>
    </>
  );
}
