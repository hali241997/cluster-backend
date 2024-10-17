export enum TimezoneEnum {
  week = 'week',
  month = 'month',
  year = 'year',
}

export interface ClusterModel {
  name: string
  id: string
  data: ClusterData[]
}

export interface ClusterData {
  date: string
  readIops: string
  writeIops: string
  readThroughput: string
  writeThroughput: string
}
