/*
 * Copyright 2020 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

//https://airflow.apache.org/docs/apache-airflow/stable/stable-rest-api-ref.html#operation/get_dags

////////////////////////////////////////////////////////////////////////////////
//                                    DAGs                                    //
////////////////////////////////////////////////////////////////////////////////

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

////////////////////////////////////////////////////////////////////////////////
//                              Instance Status                               //
////////////////////////////////////////////////////////////////////////////////

export interface InstanceStatus {
  metadatabase: MetadatabaseStatus;
  scheduler: SchedulerStatus;
}

export interface MetadatabaseStatus {
  status: 'healthy' | 'unhealthy';
}

export interface SchedulerStatus {
  status: 'healthy' | 'unhealthy';
  latest_scheduler_heartbeat?: string;
}

////////////////////////////////////////////////////////////////////////////////
//                              Instance Version                              //
////////////////////////////////////////////////////////////////////////////////

export interface InstanceVersion {
  version: string;
  git_version?: string;
}
