import { ICategory } from "../../categories/interface/categories.interface";
import { ISeason } from "../../seasons/interface/season.interface";
import { ITeam } from "../../teams/interfaces/teams.interface";

export interface ILeaderboard {
    leaderboard_id: string;
    season: ISeason;
    category: ICategory;
    team: ITeam;
    points: number;
    matches_won: number;
    matches_draw: number;
    matches_lost: number;
    goals_scored: number;
}