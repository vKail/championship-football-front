import { ICategory } from "../../categories/interface/categories.interface";
import { ISeason } from "../../seasons/interface/season.interface";

export interface IMatch {
    match_id: string;
    date: string;
    team_1: string;
    team_2: string;
    result: string;
    status: string;
    season: ISeason;
    category: ICategory;
}