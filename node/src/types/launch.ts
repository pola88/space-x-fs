export interface Launch {
  flight_number: number;
  mission_name: string;
  launch_date_unix: number;
  links: {
    mission_patch: string;
  };
  details: string;
  rocket: {
    rocket_id: string;
    rocket_name: string;
  };
}