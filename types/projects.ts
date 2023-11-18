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

export type TPerformanceReview = {
  project_id: number;
  name: string;
  candidate_id: number;
  score: number;
  observations: string;
};
