import {TIME_INTERVALS} from '@common/workers-and-queues/workers-and-queues.consts';
import {MetricsPlotEvent} from '~/business-logic/model/events/metricsPlotEvent';

export interface IOption {
  label: string;
  value: string;
}

export type TableSelectionState = 'All' | 'Partial' | 'None';

export const TIME_FORMAT_STRING = 'MMM d yyyy H:mm';

export const ICONS = {
  ALERT: 'al-ico-alert',
  CHART: 'al-ico-info-max',
  QUEUED: 'al-ico-manage-queue',
  RETRY: 'al-ico-retry',
  ENQUEUE: 'al-ico-enqueue',
  DEQUEUE: 'al-ico-dequeue',
  STOPPED: 'al-ico-abort',
  STOPPED_ALL: 'al-ico-abort-all',
  FAILED: 'al-ico-dialog-x',
  FALSE: 'al-ico-dialog-x',
  PUBLISHED: 'al-ico-publish',
  SHOW: 'al-ico-show',
  ARCHIVE: 'al-ico-archive',
  RESTORE: 'al-ico-restore',
  COMPARE: 'al-ico-compare',
  HIDE: 'al-ico-hide',
  LIST: 'al-ico-list-view',
  REMOVE: 'al-ico-trash',
  MOVE_TO: 'al-ico-move-to',
  PLUGIN: 'al-ico-plugin',
  ADD: 'fa-plus',
  TABLE: 'al-ico-table-view',
  DETAILS: 'al-ico-experiment-view',
  EDIT: 'al-ico-edit',
  RESET: 'al-ico-reset',
  CLONE: 'al-ico-clone',
  EXTEND: 'al-ico-extend',
  DOWNLOAD: 'al-ico-download',
  WORKER: 'al-ico-workers',
  TAG: 'al-ico-tag',
  SHARE: 'al-ico-shared-item',
  ARROW_DOWN: 'al-ico-ico-chevron-down',
  ARROW_UP: 'al-ico-ico-chevron-up',
  RUN: 'al-ico-run',
  METADATA: 'al-ico-metadata',
  ID: 'al-ico-id',
  CHECK: 'al-ico-success',
  PALETTE: 'al-ico-palette'
};

export type IconNames = keyof typeof ICONS;
export type IconsValues = typeof ICONS[keyof typeof ICONS];

export const PALLET = {
  blue25: '#f8f8ff',
  blue50: '#eff0ff', //239,240,255
  blue100: '#dee3ff', //222,227,255
  blue200: '#c7ceff', //199,206,255
  blue250: '#adb6ff',
  blue280: '#a0a9ff',
  blue300: '#8f99ff', //143,153,255
  blue400: '#707bd4', //112,123,212
  blue450: '#6470be',
  blue480: '#5c68ad',
  blue500: '#4a538f', //74,83,143
  blue550: '#424b7f',
  blue570: '#394473',
  blue600: '#333b62', //51,59,98
  blue650: '#2c3355',
  blue700: '#252b49', //37,43,73
  blue800: '#1d223d', //29,34,61
  blue900: '#151a2f', //21,26,47
  blue950: '#101322', //16,19,34
};

export enum ThemeEnum {
  Dark = 'dark',
  Light = 'light'
}

export type MessageSeverityEnum = 'success' | 'error' | 'info' | 'warn';
export const MESSAGES_SEVERITY = {
  SUCCESS: 'success' as MessageSeverityEnum,
  ERROR: 'error' as MessageSeverityEnum,
  INFO: 'info' as MessageSeverityEnum,
  WARN: 'warn' as MessageSeverityEnum
};

export const rootProjectsPageSize = 50;

export const timeFrameOptions: IOption[] = [
  {label: '3 小时', value: (3 * TIME_INTERVALS.HOUR).toString()},
  {label: '6 小时', value: (6 * TIME_INTERVALS.HOUR).toString()},
  {label: '12 小时', value: (12 * TIME_INTERVALS.HOUR).toString()},
  {label: '1 天', value: (TIME_INTERVALS.DAY).toString()},
  {label: '1 周', value: (TIME_INTERVALS.WEEK).toString()},
  {label: '1 个月', value: (TIME_INTERVALS.MONTH).toString()}
];

export type ReportsApiMultiplotsResponse = Record<string, Record<string, Record<string, Record<string, {
          name: string;
          plots: MetricsPlotEvent[];
        }>>>>;
