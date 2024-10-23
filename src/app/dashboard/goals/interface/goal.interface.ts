import { IMatch } from "../../matches/interface/matches.interface";
import { IPlayer } from "../../players/interface/player.interface";
import { ITeam } from "../../teams/interfaces/teams.interface";

export interface IGoal {
    goal_id: string;
    player: IPlayer;
    match: IMatch;
    minute: number;
    team: ITeam;
}