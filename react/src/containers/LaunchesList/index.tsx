import { useEffect, useContext, useState, useMemo } from "react";
import { ModeContext } from "contexts/ModeContext";
import { Launch } from "types";
import { LaunchCard, Search, Pagination, CARDS_PER_PAGE } from "components";
import { getLaunches } from "../../api";
import "./index.scss";

export const LaunchesList = () => {
  const [launches, setLaunches] = useState<Map<number, Launch>>(new Map());
  const [searchText, setSearchText] = useState<string>("");
  const { showAll } = useContext(ModeContext);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const loadLaunches = async () => {
    try {
      const launches = await getLaunches();
      const parsedLaunches: Map<number, Launch> = new Map();
      launches.forEach((l: Launch) => {
        parsedLaunches.set(l.flight_number, l);
      });
      setLaunches(parsedLaunches);
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
    const launchesArray: Launch[] = [];
    launches.forEach((l: Launch) => {
      if (searchText) {
        if (l.mission_name.toLowerCase().includes(searchText.toLowerCase())) {
          if (showAll) {
            launchesArray.push(l);
          } else {
            if (l.favorite) {
              launchesArray.push(l);
            }
          }
        }

        return;
      }

      if (showAll) {
        launchesArray.push(l);
        return;
      }

      if (l.favorite) {
        launchesArray.push(l);
        return;
      }
    });

    return launchesArray;
  }, [searchText, showAll, launches]);

  const updateFavorite = (flightNumber: number) => {
    const launch = launches.get(flightNumber);
    if (!launch) return;
    
    const newLaunches = new Map(launches);
    newLaunches.set(flightNumber, { ...launch, favorite: !launch.favorite });
    setLaunches(newLaunches);
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
