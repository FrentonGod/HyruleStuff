import axios from "axios";
import React, { useEffect, useState } from "react";
import SearchResult from "../components/SearchResult";

const Compendium = () => {
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [fetchedData, setFetchedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  function handleButtonClick(buttonValue) {
    setSelectedCategory(buttonValue);
  }

  async function fetchData() {
    const { data } = await axios.get(
      `https://botw-compendium.herokuapp.com/api/v2/all`
    );
    const compendiumData = [
      ...data.data.creatures.food,
      ...data.data.creatures.non_food,
      ...data.data.equipment,
      ...data.data.materials,
      ...data.data.monsters,
      ...data.data.treasure,
    ];
    setFetchedData(compendiumData);
    setTimeout(() => setLoading(false), 2000);
  }

  function filterData() {
    setLoading(true);
    if (selectedCategory !== "") {
      setFilteredData(
        fetchedData.filter(
          (item) =>
            item.category === selectedCategory &&
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredData(
        fetchedData.filter((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
    setTimeout(() => setLoading(false), 1000);
  }

  useEffect(() => {
    filterData();
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="mt-40 pb-40 mx-auto px-4 sm:px-6 md:px-8 max-w-6xl">
      <div className="flex flex-col items-center mb-8 mx-10 ">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mb-4">
          <button
            onClick={() => handleButtonClick("creatures")}
            className="px-4 py-2 bg-green-700 text-white rounded-lg font-bold hover:bg-green-600 transition-colors duration-200 ease-linear "
          >
            Creatures
          </button>
          <button
            onClick={() => handleButtonClick("materials")}
            className="px-4 py-2 bg-green-700 text-white rounded-lg font-bold hover:bg-green-600 transition-colors duration-200 ease-linear "
          >
            Materials
          </button>
          <button
            onClick={() => handleButtonClick("equipment")}
            className="px-4 py-2 bg-green-700 text-white rounded-lg font-bold hover:bg-green-600 transition-colors duration-200 ease-linear "
          >
            Equipments
          </button>
          <button
            onClick={() => handleButtonClick("monsters")}
            className="px-4 py-2 bg-green-700 text-white rounded-lg font-bold hover:bg-green-600 transition-colors duration-200 ease-linear "
          >
            Monsters
          </button>
          <button
            onClick={() => handleButtonClick("treasure")}
            className="px-4 py-2 bg-green-700 text-white rounded-lg font-bold hover:bg-green-600 transition-colors duration-200 ease-linear "
          >
            Treasures
          </button>
        </div>
        <div className="max-w-xl w-full">
          <div className="relative">
            <input
              className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 hover:border-green-600"
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </div>
        </div>
      </div>
      <div>
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredData && filteredData.length > 0
              ? filteredData.map((item) => (
                  <SearchResult data={item} key={item.id} />
                ))
              : fetchedData.map((item) => (
                  <SearchResult data={item} key={item.id} />
                ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default Compendium;
