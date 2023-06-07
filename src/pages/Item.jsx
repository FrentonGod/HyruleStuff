import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Item = () => {
  const { id } = useParams();
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function separateLocation(locations) {
    const fusedString = Object.values(locations).join(", ");
    return fusedString;
  }

  async function fetchItem() {
    setLoading(true);
    const { data } = await axios.get(
      `https://botw-compendium.herokuapp.com/api/v2/entry/${id}`
    );
    setItem(data.data);
    setTimeout(() => setLoading(false), 100);
  }

  useEffect(() => {
    fetchItem();
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen w-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <>
          <div className="flex flex-col mt-48 mx-16 md:mx-auto max-w-5xl">
            <div className="flex flex-col gap-5 md:gap-0 md:flex-row items-center justify-between w-full px-10">
              <div className="flex items-center justify-center hover:scale-110 transition-all duration-200 text-lg ">
                <Link to="/compendium">
                  <ArrowBackIcon /> Back
                </Link>
              </div>
              <h1 className="text-2xl md:text-5xl font-semibold ">
                {capitalizeFirstLetter(item?.name)}
              </h1>
              <span className="text-lg md:text-2xl  font-semibold">
                {capitalizeFirstLetter(item?.category)}
              </span>
            </div>
            <div className="mt-10 md:mt-32 flex flex-col md:flex-row items-center m-auto gap-7">
              <img src={item?.image} alt={item?.name} />
              <ul>
                <li className="m-6 text-base md:text-xl">
                  {item.common_locations ? (
                    <p>Locations: {separateLocation(item.common_locations)}</p>
                  ) : (
                    <p>Location: Unknown</p>
                  )}
                </li>
                <li className="m-6 text-base md:text-xl">
                  {item.cooking_effect ? (
                    <p>Cooking effect: {item.cooking_effect}</p>
                  ) : null}
                </li>
                <li className="m-6 text-base md:text-xl flex items-center">
                  {item.hearts_recovered > 0 ? (
                    <p>
                      Heal: {item.hearts_recovered} <FavoriteIcon />
                    </p>
                  ) : null}
                </li>
              </ul>
            </div>
            {item.description ? (
              <p className="mt-4 mb-8 md:mt-32 text-base md:text-xl max-w-[100%] md:max-w-2xl md:mx-auto">
                {item.description}
              </p>
            ) : (
              <p className="mt-10 md:mt-32 text-xl max-w-2xl mx-10 md:mx-auto">
                No description available
              </p>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Item;
