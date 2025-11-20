/* eslint-disable camelcase */
import { getUserFavorites } from "./favorites";
import { Launch } from "../types/launch";
import { Rocket } from "../types/rocket";

interface ProcessedLaunch {
  favorite: boolean;
  flight_number: number;
  mission_name: string;
  mission_patch: string;
  details: string;
  launch_date_unix: number;
  rocket: {
    rocket_id: string;
    rocket_name: string;
    active: boolean;
    cost_per_launch: number;
    company: string;
  };
}

const parseRockets = (rockets: Rocket[]): Record<string, Rocket> => {
  const rocketMap: Record<string, Rocket> = {};
  rockets.forEach(rocket => {
    rocketMap[rocket.rocket_id] = rocket;
  });
  return rocketMap;
};

export const processLaunches = async (userId: number, launches: Launch[], rockets: Rocket[]): Promise<ProcessedLaunch[]> => {
  const userFavorites = await getUserFavorites(userId);

  const favoriteFlightNumbers = userFavorites.map(favorite => favorite.flight_number);
  const rocketMap = parseRockets(rockets);

  const processedLaunches: ProcessedLaunch[] = launches.map(launch => {
    const rocketId = launch.rocket.rocket_id;
    const rocket = rocketMap[rocketId];
    const favorite = favoriteFlightNumbers.includes(launch.flight_number);
    return {
      favorite,
      flight_number: launch.flight_number,
      mission_name: launch.mission_name,
      mission_patch: launch.links.mission_patch,
      details: launch.details,
      launch_date_unix: launch.launch_date_unix,
      rocket: {
        rocket_id: rocketId,
        rocket_name: rocket.rocket_name,
        active: rocket.active,
        cost_per_launch: rocket.cost_per_launch,
        company: rocket.company,
      },
    };
  });
  return processedLaunches;
};
