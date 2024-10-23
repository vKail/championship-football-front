import { ICategory } from "../../categories/interface/categories.interface";
import { IDt } from "../../dts/interfaces/dts.interface";

export interface ITeam {
  team_id: string;
  name: string;
  dt: IDt;
  category: ICategory;
}
