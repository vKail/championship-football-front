import { ICategory } from "../../categories/interface/categories.interface";
import { IDt } from "../../dts/interfaces/dts.interface";


export interface ITeam {
  teamId?: number;
  name:        string;
  playerIds:   number[];
  categoryIds: number[];
}

