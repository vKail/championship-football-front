import { DateValue } from "@nextui-org/react";
import { ITeam } from "../../teams/interfaces/teams.interface";

export interface IPlayer {
  playerId?:   number;
  dni:        string;
  firstname:  string;
  lastname:   string;
  birthdate:  Date  | null | string ;
  bib:        string;
  teamId:     number;
  categoryId: number;
}


export interface IPlayerResponse {
  playerId:     number;
  dni:          string;
  firstname:    string;
  lastname:     string;
  birthdate:    Date | null | string;
  bib:          string;
  teamId:       number;
  teamName:     string;
  categoryId:   number;
  categoryName: string;
}

