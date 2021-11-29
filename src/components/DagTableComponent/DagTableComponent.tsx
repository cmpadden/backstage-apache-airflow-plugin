/*
 * Copyright 2021 Colton Padden <colton.padden@fastmail.com>
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
import {
  Progress,
  StatusError,
  StatusOK,
  Table,
  TableColumn,
} from '@backstage/core-components';
import { useApi } from '@backstage/core-plugin-api';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Switch from '@material-ui/core/Switch';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import React from 'react';
import { useAsync } from 'react-use';
import { apacheAirflowApiRef } from '../../api';
import { Dag, Dags, ScheduleInterval } from '../../api/types';
import { ScheduleIntervalLabel } from '../ScheduleIntervalLabel';

type DenseTableProps = {
  dags: Dag[];
};

const columns: TableColumn[] = [
  {
    title: 'Paused',
    field: 'is_paused',
    render: (row: Partial<Dag>) => (
      <Tooltip title="Pause/Unpause DAG">
        <Switch checked={row.is_paused} />
      </Tooltip>
    ),
    width: '5%',
  },
  {
    title: 'DAG',
    field: 'dag_id',
    render: (row: Partial<Dag>) => (
      <div>
        <Typography variant="subtitle2" gutterBottom noWrap>
          {row.dag_id}
        </Typography>
        <Box display="flex" alignItems="center">
          {row.tags?.map(tag => (
            <Chip label={tag.name} size="small" />
          ))}
        </Box>
      </div>
    ),
    width: '45%',
  },
  {
    title: 'Owner',
    field: 'owners',
    render: (row: Partial<Dag>) => (
      <Box display="flex" alignItems="center">
        {row.owners?.map(owner => (
          <Chip label={owner} size="small" />
        ))}
      </Box>
    ),
    width: '10%',
  },
  {
    title: 'Active',
    render: (row: Partial<Dag>) => (
      <Box display="flex" alignItems="center">
        {row.is_active ? <StatusOK /> : <StatusError />}
        <Typography variant="body2">
          {row.is_active ? 'Active' : 'Inactive'}
        </Typography>
      </Box>
    ),
    width: '10%',
  },
  {
    title: 'Schedule',
    render: (row: Partial<Dag>) => (
      <ScheduleIntervalLabel interval={row.schedule_interval} />
    ),
  },
];

export const DenseTable = ({ dags }: DenseTableProps) => {
  return (
    <Table
      title="DAGs"
      options={{ pageSize: 5 }}
      columns={columns}
      data={dags}
    />
  );
};

export const DagTableComponent = () => {
  const apiClient = useApi(apacheAirflowApiRef);
  const { value, loading, error } = useAsync(async (): Promise<Dags> => {
    return await apiClient.listDags();
  }, []);

  if (loading) {
    return <Progress />;
  } else if (error) {
    return <Alert severity="error">{error.message}</Alert>;
  }

  return <DenseTable dags={value?.dags || []} />;
};
