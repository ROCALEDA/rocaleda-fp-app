export type TInterview = {
  subject: string;
  client_name: string;
  realization_date: string;
  score: number | null;
};

export type TTechnicalTest = {
  candidate_id: number;
  name: string;
  observations: string;
  open_position_id: number;
  scheduled: string;
  score: number;
};
