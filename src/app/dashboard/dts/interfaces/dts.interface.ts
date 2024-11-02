import { ITeam } from "../../teams/interfaces/teams.interface";

export interface IDt {
  dtId?: number;
  dni: string;
  firstname: string;
  lastname: string;
  teamId: number;
}


export interface IDtResponse {
  dtId?: number;
  dni: string;
  firstname: string;
  lastname: string;
  teamId: number;
  teamName: string;
}