import { renderInTestApp, TestApiProvider } from '@backstage/test-utils';
import React from 'react';
import { ApacheAirflowApi, apacheAirflowApiRef } from '../../api';
import { HomePage } from './HomePage';

describe('<HomePage />', () => {
  const mockApi: jest.Mocked<ApacheAirflowApi> = {
    getInstanceStatus: jest.fn().mockResolvedValue({
      metadatabase: { status: 'healthy' },
      scheduler: { status: 'healthy' },
    }),
    getInstanceVersion: jest.fn().mockResolvedValue({
      version: 'v2.0.0',
    }),
    listDags: jest.fn().mockResolvedValue([
      {
        dag_id: 'mock_dag_1',
      },
    ]),
  } as any;

  it('homepage should render', async () => {
    const { getByText } = await renderInTestApp(
      <TestApiProvider apis={[[apacheAirflowApiRef, mockApi]]}>
        <HomePage />
      </TestApiProvider>,
    );
    expect(getByText('Apache Airflow')).toBeInTheDocument();
  });
});
