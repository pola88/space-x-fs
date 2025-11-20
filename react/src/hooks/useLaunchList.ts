import { Launch } from "types/launch";
import { useState, useEffect, useMemo } from "react";
import { getLaunches } from "api/launches";

export const useLaunchList = (searchText: string, showAll: boolean) => {
  const [launches, setLaunches] = useState<Map<number, Launch>>(new Map());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const loadLaunches = async () => {
    try {
      setIsLoading(true);
      const launches = await getLaunches();
      const parsedLaunches: Map<number, Launch> = new Map();
      launches.forEach((l: Launch) => {
        parsedLaunches.set(l.flight_number, l);
      });
      setLaunches(parsedLaunches);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadLaunches();
  }, []);

  const updateFavorite = (flightNumber: number) => {
    const launch = launches.get(flightNumber);
    if (!launch) return;
    
    const newLaunches = new Map(launches);
    newLaunches.set(flightNumber, { ...launch, favorite: !launch.favorite });
    setLaunches(newLaunches);
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
  }, [launches, searchText, showAll]);

  return { filteredLaunches, updateFavorite, isLoading };
};