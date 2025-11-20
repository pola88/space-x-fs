import { useContext, useState } from "react";
import { ModeContext } from "contexts/ModeContext";
import { Launch } from "types";
import { LaunchCard, Search, Pagination, CARDS_PER_PAGE } from "components";
import "./index.scss";
import { useLaunchList } from "hooks/useLaunchList";

export const LaunchesList = () => {
  const [searchText, setSearchText] = useState<string>("");
  const { showAll } = useContext(ModeContext);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { filteredLaunches, updateFavorite } = useLaunchList(searchText, showAll);

  const onSearchChange = (value: string) => {
    if (value !== searchText) {
      setSearchText(value);
      setCurrentPage(1);
    }
  };

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
              updateFavorite={updateFavorite}
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
