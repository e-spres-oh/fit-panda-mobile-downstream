export type RequestMethod = 'GET' | 'POST' | 'PUT';
export type UserSex = 'male' | 'female';

export enum UserGoal {
  LoseWeight = 'LOSE_WEIGHT',
  MaintainWeight = 'MAINTAIN_WEIGHT',
  GainWeight = 'GAIN_WEIGHT',
}

export type Photo = {
  uri: string;
  name: string;
  type: string;
};

export enum UserActivityLevel {
  Low = 'LOW',
  Moderate = 'MODERATE',
  High = 'HIGH',
  VeryHigh = 'VERY_HIGH',
}

export type UserProfile = {
  name: string;
  sex: string;
  height: number;
  weight: number;
  age: number;
  activity: (typeof UserActivityLevel)[keyof typeof UserActivityLevel];
  goal: (typeof UserGoal)[keyof typeof UserGoal];
  target: number;
  userId: number;
  id?: number;
};
