export interface ITeam {
  id: number;
  name: string;
  city: string;
  conference: string;
  state: string;
  logos: string[];
}

export interface ITeamResponse {
  data: ITeam[];
  count: number;
}