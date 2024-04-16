import { User } from "./user";

export interface State {
    _id?: string;
    user: User;
    actualState: string;
    startOnline: Date;
    finishOnline: Date;
    lastConnection: Date
  }