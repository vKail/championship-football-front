import { ICategory } from "../../categories/interface/categories.interface";
import { ISeason } from "../../seasons/interface/season.interface";


export interface IMatch {
    matchId?:  number;
    homeTeamId:  number;
    awayTeamId:  number;
    category:  number;
    season:    number;
    matchDate: Date | null | string;
    result:    string;
    status:    string;
}

export interface IMatchResponse {
    matchId?:  number;
    homeTeamId:  number;
    homeTeamName: string;
    awayTeamId:  number;
    awayTeamName: string;
    category:  number;
    season:    number;
    matchDate: Date | null | string;
    result:    string;
    status:    string;
}

