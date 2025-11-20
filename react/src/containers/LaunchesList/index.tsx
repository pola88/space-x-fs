import { useEffect, useContext, useState, useMemo } from "react";
import { ModeContext } from "contexts/ModeContext";
import { Launch } from "types";
import { LaunchCard, Search, Pagination, CARDS_PER_PAGE } from "components";
import { getLaunches } from "../../api";
import "./index.scss";

export const LaunchesList = () => {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const { showAll } = useContext(ModeContext);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const loadLaunches = async () => {
    try {
      const launches = await getLaunches();
      setLaunches(launches);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadLaunches();
  }, []);
  
  const onSearchChange = (value: string) => {
    if (value !== searchText) {
      setSearchText(value);
      setCurrentPage(1);
    }
  };

  const filteredLaunches = useMemo(() => {
    return launches.filter((l: Launch) => {
      if (searchText) {
        return l.mission_name.toLowerCase().includes(searchText.toLowerCase()) || l.favorite;
      }
      return showAll || l.favorite;
    });
  }, [searchText, showAll, launches]);

  return (
    <div className="launches-list-container">
      
      <div className="launches-list">
        <div className="search-container">
          <Search value={searchText} onChange={onSearchChange} />
        </div>
        {filteredLaunches
          .filter(
            (_: Launch, i: number) =>
              i >= CARDS_PER_PAGE * (currentPage - 1) &&
              i < CARDS_PER_PAGE * currentPage
          )
          .map((launch, i) => (
            <LaunchCard
              key={launch.flight_number}
              launch={launch}
              updateFavorite={() => {}}
            />
          ))}
          <div className="pagination-container">
          <Pagination
            value={currentPage}
              onChange={setCurrentPage}
              itemsCount={filteredLaunches.length}
            />
        </div>
      </div>
      
    </div>
  );
};
