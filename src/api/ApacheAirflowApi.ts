import { createApiRef } from '@backstage/core-plugin-api';
import { Dags, InstanceStatus, InstanceVersion } from './types';

export const apacheAirflowApiRef = createApiRef<ApacheAirflowApi>({
  id: 'plugin.apacheairflow.service',
  description: 'Used by the Apache Airflow plugin to make requests',
});

export type ApacheAirflowApi = {
  listDags(): Promise<Dags>;
  getInstanceStatus(): Promise<InstanceStatus>;
  getInstanceVersion(): Promise<InstanceVersion>;
};
