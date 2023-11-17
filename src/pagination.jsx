import Button from "./button";

export default function Pagination({page, func}) {
  return (
    <>
      <div className="page">
        <Button value="<<<" onClick={() => func(page - 1)} />
        <Button value=">>>" onClick={() => func(page + 1)} />
      </div>
    </>
  );
}
