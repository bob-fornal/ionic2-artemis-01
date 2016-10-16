
export interface IScheduleType {
  date: string;
  times: Array<ITimesType>
}

export interface ITimesType {
  key: number;
  start: string;
  end: string;
  title: string;
  crew?: {
    captain?: string;
    tactical?: string;
    engineering?: string;
    helm?: string;
    science?: string;
    communications?: string;
  }
}
