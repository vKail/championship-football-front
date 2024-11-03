import { IMatch } from "../../matches/interface/matches.interface";
import { IPlayer } from "../../players/interface/player.interface";
import { ITeam } from "../../teams/interfaces/teams.interface";

export interface IGoal {
    goalId?:  number;
    matchId:  number;
    playerId: number;
    teamId:   number;
    minute:   number;
}

export interface IGoalsResponse {
    goalId:     number;
    matchId:    number;
    playerId:   number;
    playerName: string;
    teamId:     number;
    teamName:   string;
    minute:     number;
}

