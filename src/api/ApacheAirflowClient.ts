import { DiscoveryApi } from '@backstage/core-plugin-api';
import fetch from 'cross-fetch';
import qs from 'qs';
import { ApacheAirflowApi } from './ApacheAirflowApi';
import {
  Dag,
  Dags,
  InstanceStatus,
  InstanceVersion,
  ListDagsParams,
} from './types';

export class ApacheAirflowClient implements ApacheAirflowApi {
  discoveryApi: DiscoveryApi;

  constructor({ discoveryApi }: { discoveryApi: DiscoveryApi }) {
    this.discoveryApi = discoveryApi;
  }

  /**
   * List all DAGs in the Airflow instance
   *
   * @remarks
   * All DAGs with a limit of 100 results per request are returned; this may be
   * bogged-down for instances with many DAGs, in which case table pagination
   * should be implemented
   *
   * @param {number} objectsPerRequest records returned per request in pagination
   * @returns {Promise<Dag[]>}
   */
  async listDags({
    objectsPerRequest = 100,
  }: {
    objectsPerRequest: number;
  }): Promise<Dag[]> {
    const dags: Dag[] = [];
    const params: ListDagsParams = {
      limit: objectsPerRequest,
      offset: 0,
    };

    for (;;) {
      const response = await this.fetch<Dags>(`/dags?${qs.stringify(params)}`);
      dags.push(...response.dags);

      if (dags.length >= response.total_entries) {
        break;
      }
      if (typeof params.offset !== 'undefined') {
        params.offset += objectsPerRequest;
      }
    }
    return dags;
  }

  async updateDag(dagId: string, isPaused: boolean): Promise<void> {
    const params = {
      method: 'PATCH',
      body: JSON.stringify({ is_paused: isPaused }),
    };
    await this.fetch(`/dags/${dagId}`, params);
  }

  async getInstanceStatus(): Promise<InstanceStatus> {
    return await this.fetch<InstanceStatus>('/health');
  }

  async getInstanceVersion(): Promise<InstanceVersion> {
    return await this.fetch<InstanceVersion>('/version');
  }

  private async fetch<T = any>(input: string, init?: RequestInit): Promise<T> {
    const proxyUri = `${await this.discoveryApi.getBaseUrl('proxy')}/airflow`;
    const response = await fetch(`${proxyUri}${input}`, init);
    if (!response.ok) throw new Error(response.statusText);
    return await response.json();
  }
}
