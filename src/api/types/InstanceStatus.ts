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
