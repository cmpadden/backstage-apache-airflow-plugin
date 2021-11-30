import { createApiRef } from '@backstage/core-plugin-api';
import { Dag, InstanceStatus, InstanceVersion } from './types';

export const apacheAirflowApiRef = createApiRef<ApacheAirflowApi>({
  id: 'plugin.apacheairflow.service',
  description: 'Used by the Apache Airflow plugin to make requests',
});

export type ApacheAirflowApi = {
  listDags(): Promise<Dag[]>;
  updateDag(dagId: string, isPaused: boolean): Promise<any>;
  getInstanceStatus(): Promise<InstanceStatus>;
  getInstanceVersion(): Promise<InstanceVersion>;
};
