export interface ITeam {
  id: number;
  name: string;
  city: string;
}

export interface ITeamResponse {
  data: ITeam[];
  count: number;
}