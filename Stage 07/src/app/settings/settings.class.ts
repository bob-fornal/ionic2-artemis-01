
export class settings {
  static IsDebug: boolean = true;
  static features: any = {};

  static changedCrew: {
    time_key: number,
    bridge_key: number,
    date: string,
    start: string,
    end: string,
    bridge: {
      key: number,
      title: string,
      crew: {
        status: string;
        captain?: string;
        tactical?: string;
        engineering?: string;
        helm?: string;
        science?: string;
        communications?: string;
      }
    }
  } = null;
}
