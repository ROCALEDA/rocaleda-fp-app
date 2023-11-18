export type TUser = {
  token: string;
  role: string;
  id: string | null;
} | null;

export type TCandidate = {
  fullname: string;
  soft_skills: { description: string; id: number; name: string }[];
  tech_skills: { description: string; id: number; name: string }[];
  user_id: string;
};
