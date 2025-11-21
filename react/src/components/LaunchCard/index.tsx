import { Launch } from "types";
import React, { useCallback } from "react";
import { addFavorite, removeFavorite } from "api/favorites";
import { ReactComponent as Star } from "assets/images/star.svg";
import "./index.scss";

interface LaunchCardProps {
  launch: Launch;
  updateFavorite: Function;
}

export const LaunchCard = React.memo(({ launch, updateFavorite }: LaunchCardProps) => {
  const handleClickFavorite = useCallback(async () => {
    await (launch.favorite
      ? removeFavorite(launch.flight_number)
      : addFavorite(launch.flight_number));

    updateFavorite(launch.flight_number);
  }, [launch.flight_number, launch.favorite, updateFavorite]);

  return (
    <div className="launch-card">
      <div
        className="patch"
        style={{ backgroundImage: `url(${launch.mission_patch})` }}
      />
      <div className="content">
        <h3>{launch.mission_name}</h3>
        <span className="details">{launch.details}</span>
        <span className="date">
          {new Date(launch.launch_date_unix).toDateString()}
        </span>
        <Star
          onClick={handleClickFavorite}
          className={launch.favorite ? "active" : ""}
        />
      </div>
    </div>
  );
});
