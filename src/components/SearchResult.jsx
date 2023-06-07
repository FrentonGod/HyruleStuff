import React from "react";
import { Link } from "react-router-dom";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const SearchResult = ({ data }) => {
  return (
    <Link
      to={`/item/${data.id}`}
      className="p-4 bg-white border border-black rounded-2xl hover:bg-[#a9ffa9] transition-colors duration-300 ease-linear flex flex-col items-center "
    >
      <img loading="lazy" src={data.image} alt={data.name} />
      <h1 className="text-black mt-4 font-bold ">
        {capitalizeFirstLetter(data.name)}
      </h1>
      <h2 className="font-semibold">{capitalizeFirstLetter(data.category)}</h2>
    </Link>
  );
};

export default SearchResult;
