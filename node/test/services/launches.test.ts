import { processLaunches } from "../../src/services/launches";

const launches = require("../mockData/launches.json");
const rockets = require("../mockData/rockets.json");


describe("Launches Service", () => {
  it("should return the launches", async () => {
    const outputLaunches = await processLaunches(1, launches, rockets);
    expect(outputLaunches).toEqual([
      {
        flight_number: 1,
        mission_name: "FalconSat",
        mission_patch: "https://images2.imgbox.com/40/e3/GypSkayF_o.png",
        details: "Engine failure at 33 seconds and loss of vehicle",
        rocket: {
          rocket_id: "falcon1",
          rocket_name: "Falcon 1",
          active: false,
          cost_per_launch: 6700000,
          company: "SpaceX"
        }
      },
      {
        flight_number: 2,
        mission_name: "DemoSat",
        mission_patch: "https://images2.imgbox.com/be/e7/iNqsqVYM_o.png",
        details: "Successful first stage burn and transition to second stage, maximum altitude 289 km, Premature engine shutdown at T+7 min 30 s, Failed to reach orbit, Failed to recover first stage",
        rocket: {
          rocket_id: "falcon1",
          rocket_name: "Falcon 1",
          active: false,
          cost_per_launch: 6700000,
          company: "SpaceX"
        }
      },
      {
        flight_number: 3,
        mission_name: "Trailblazer",
        mission_patch: "https://images2.imgbox.com/4b/bd/d8UxLh4q_o.png",
        details: "Residual stage 1 thrust led to collision between stage 1 and stage 2",
        rocket: {
          rocket_id: "falcon1",
          rocket_name: "Falcon 1",
          active: false,
          cost_per_launch: 6700000,
          company: "SpaceX"
        }
      },
      {
        flight_number: 6,
        mission_name: "Falcon 9 Test Flight",
        mission_patch: "https://images2.imgbox.com/d6/12/yxne8mMD_o.png",
        details: null,
        rocket: {
          rocket_id: "falcon9",
          rocket_name: "Falcon 9",
          active: true,
          cost_per_launch: 50000000,
          company: "SpaceX"
        }
      },
      {
        flight_number: 55,
        mission_name: "Falcon Heavy Test Flight",
        mission_patch: "https://images2.imgbox.com/33/1a/ujrnfkna_o.png",
        details: "The launch was a success, and the side boosters landed simultaneously at adjacent ground pads. Drone ship landing of the central core failed. Final burn to heliocentric mars-earth orbit was successful after the second stage and payload passed through the Van Allen belts.",
        rocket: {
          rocket_id: "falconheavy",
          rocket_name: "Falcon Heavy",
          active: true,
          cost_per_launch: 90000000,
          company: "SpaceX"
        }
      }
    ]);
  });
});