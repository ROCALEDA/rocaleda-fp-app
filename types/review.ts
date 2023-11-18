export type TPerformanceReviewPayload = {
  project_id: number;
  name: string;
  candidate_id: number;
  score: number;
  observations: string;
};

export type TTechnicalTestPayload = {
  candidate_id: number;
  name: string;
  score: number;
  observations: string;
};
