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

export type TPerformanceReview = {
  candidate_id: number;
  name: string;
  observations: string;
  project_id: number;
  scheduled: string;
  score: number;
};
