import fetch from 'cross-fetch';
import { ApacheAirflowApi, Dags, InstanceStatus, InstanceVersion } from './ApacheAirflowApi';
import { DiscoveryApi } from '@backstage/core-plugin-api';

export class ApacheAirflowClient implements ApacheAirflowApi {
  discoveryApi: DiscoveryApi;

  constructor({ discoveryApi }: { discoveryApi: DiscoveryApi }) {
    this.discoveryApi = discoveryApi;
  }

  private async fetch<T = any>(input: string, init?: RequestInit): Promise<T> {
    // As configured previously for the backend proxy
    const proxyUri = `${await this.discoveryApi.getBaseUrl('proxy')}/airflow`;

    // TODO: implement pagination - possibly just support query paramters

    const resp = await fetch(`${proxyUri}${input}`, init);
    if (!resp.ok) throw new Error(resp.statusText);
    return await resp.json();
  }

  async listDags(): Promise<Dags> {
    return await this.fetch<Dags>('/dags');
  }

  async getInstanceStatus(): Promise<InstanceStatus> {
    return await this.fetch<InstanceStatus>('/health');
  }

  async getInstanceVersion(): Promise<InstanceVersion> {
    return await this.fetch<InstanceVersion>('/version');
  }
}
