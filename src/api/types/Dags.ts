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

export interface ScheduleInterval {
  __type: 'TimeDelta' | 'RelativeDelta' | 'CronExpression';
  days: number;
  seconds: number;
  microseconds: number;
}

export interface Tag {
  name: string;
}
