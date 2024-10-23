import { ITeam } from "../../teams/interfaces/teams.interface";

export interface IPlayer {
  player_id: string;
  dni: string;
  firstname: string;
  lastname: string;
  bib: string;
  team: ITeam;
}
