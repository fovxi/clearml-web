import {HeaderNavbarTabConfig} from '@common/layout/header-navbar-tabs/header-navbar-tabs-config.types';

export const ORCHESTRATION_ROUTES = [
  {header: '工作节点', featureName: 'workers', link: 'workers-and-queues/workers'},
  {header: '队列', featureName: 'queues', link: 'workers-and-queues/queues'},
] as HeaderNavbarTabConfig[];
