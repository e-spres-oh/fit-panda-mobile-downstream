import React from 'react';
import { createRequestOptions } from '../utils/utils';
import { BASE_URL, endpoints } from '../endpoints';
import { UserActivityLevel, UserGoal, UserProfile } from '../types';

export interface IStore {
  isAuthenticated(): boolean;
  getToken(): string | null;
  getUserId(): number | undefined;
  getUser(): UserProfile;

  register(email: string, password: string): Promise<void>;
  login(email: string, password: string): Promise<void>;
  updateUser(user: UserProfile): Promise<void>;
  updateStoredUser(data: Partial<UserProfile>): void;
  getUserProfile(): Promise<void>;

  computeTDEE(): number;
}

const activityMultiplier = {
  [UserActivityLevel.Low]: 1.2,
  [UserActivityLevel.Moderate]: 1.375,
  [UserActivityLevel.High]: 1.55,
  [UserActivityLevel.VeryHigh]: 1.725,
};

export class RootStore implements IStore {
  authenticated: boolean = false;
  user: UserProfile = {
    name: '',
    sex: '',
    height: 0,
    weight: 0,
    age: 0,
    activity: UserActivityLevel.Low,
    goal: UserGoal.LoseWeight,
    target: 0,
    userId: 0,
  };

  token: string = '';

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  getToken(): string | null {
    return this.token;
  }

  getUserId(): number {
    return this.user.userId;
  }

  getUser(): UserProfile {
    return this.user;
  }

  updateStoredUser(data: Partial<UserProfile>): void {
    this.user = { ...this.user, ...data };
  }

  async register(email: string, password: string) {
    try {
      const response = await fetch(
        `${BASE_URL}${endpoints.Register}`,
        createRequestOptions('POST', undefined, { email, password })
      );

      const result = await response.json();
      if (response.ok) {
        this.updateStoredUser({ userId: result.id });
      } else {
        throw new Error(result.message);
      }
    } catch (e) {
      console.log('Failed to create Fit-Panda user');
    }
  }

  async login(email: string, password: string) {
    try {
      const response = await fetch(
        `${BASE_URL}${endpoints.Login}`,
        createRequestOptions('POST', undefined, { email, password })
      );
      const result = await response.json();
      if (response.ok) {
        this.token = result.access_token;
        this.authenticated = true;
      } else {
        this.authenticated = false;
      }
    } catch (e) {
      this.authenticated = false;
      console.log(e);
      console.log('Failed to login Fit-Panda user');
    }
  }

  async updateUser(user: UserProfile) {
    try {
      delete user.id;
      console.log('Updated agter delete user', user);
      const response = await fetch(
        `${BASE_URL}${endpoints.Profile}`,
        createRequestOptions('POST', this.token, { ...user })
      );
      if (!response.ok) {
        throw new Error('Failed to update user');
      }
    } catch (e) {
      console.log(e);
      console.log('Failed to update Fit-Panda user');
    }
  }

  async getUserProfile() {
    try {
      const response = await fetch(
        `${BASE_URL}${endpoints.Profile}`,
        createRequestOptions('GET', this.token)
      );
      const result = await response.json();
      if (result.ok) {
        this.user = result;
        console.log('fetched user', JSON.stringify(this.user));
      }
    } catch (e) {
      console.log(e);
      console.log('Failed to fetch Fit-Panda user');
    }
  }

  computeBMR = (): number => {
    return this.user.sex === 'male'
      ? 66 + 13.7 * this.user.weight + 5 * this.user.height - 6.8 * this.user.age
      : 655 + 9.6 * this.user.weight + 1.8 * this.user.height - 4.7 * this.user.age;
  };

  computeTDEE = (): number => {
    return this.user.goal === UserGoal.MaintainWeight
      ? this.computeBMR() * activityMultiplier[this.user.activity]
      : this.user.goal === UserGoal.LoseWeight
      ? this.computeBMR() * activityMultiplier[this.user.activity] - 500
      : this.computeBMR() * activityMultiplier[this.user.activity] + 300;
  };
}

export const RootContext = React.createContext<IStore>(new RootStore());
