
export interface IScheduleType {
  date: string;
  times: Array<ITimesType>
}

export interface ITimesType {
  key: number;
  start: string;
  end: string;
  bridges: Array<IBridgeType>;
}

export interface IBridgeType {
  key: number,
  title: string,
  crew: ICrewType
}

export interface ICrewType {
  status?: IStatusType;
  captain?: string;
  tactical?: string;
  engineering?: string;
  helm?: string;
  science?: string;
  communications?: string;
}

export interface IStatusType {
  captain: string,
  tactical: string,
  engineering: string,
  helm: string,
  science: string,
  communications: string,
  any_filled: boolean
}
