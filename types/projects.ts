export type TProject = {
  id: number;
  name: string;
  is_team_complete: boolean;
  total_positions: number;
  positions: [
    {
      id: number;
      is_open: boolean;
      name: string;
    },
    {
      id: number;
      is_open: boolean;
      name: string;
    }
  ];
};

export type TProfile = {
  candidate_id: number;
  candidate_name: string;
  position_id: number;
  position_name: string;
};

export type TPosition = {
  id: number;
  is_open: boolean;
  name: string;
};
