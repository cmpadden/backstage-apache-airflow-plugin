export interface Dags {
  dags: Dag[];
  total_entries: number;
}

export interface Dag {
  dag_id: string;
  root_dag_id?: string;
  is_paused?: boolean;
  is_active?: boolean;
  is_subdag?: boolean;
  fileloc: string;
  file_token: string;
  owners: string[];
  description?: string;
  schedule_interval: ScheduleInterval;
  tags: Tag[];
}

export interface TimeDelta {
  __type: 'TimeDelta';
  days: number;
  seconds: number;
  microseconds: number;
}

export interface RelativeDelta {
  __type: 'RelativeDelta';
  years: number;
  months: number;
  days: number;
  leapdays: number;
  hours: number;
  minutes: number;
  seconds: number;
  microseconds: number;
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  microsecond: number;
}

export interface CronExpression {
  __type: 'CronExpression';
  value: string;
}

// discrimant union of possible schedule interval types
export type ScheduleInterval = TimeDelta | RelativeDelta | CronExpression;

export interface Tag {
  name: string;
}
