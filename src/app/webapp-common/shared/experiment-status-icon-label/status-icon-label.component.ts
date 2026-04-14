import {ChangeDetectionStrategy, Component, computed, input} from '@angular/core';
import {EXPERIMENTS_STATUS_LABELS} from '~/features/experiments/shared/experiments.const';
import {TASKS_STATUS} from '@common/tasks/tasks.constants';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIcon} from '@angular/material/icon';
import {TitleCasePipe} from '@angular/common';

@Component({
    selector: 'sm-status-icon-label',
    templateUrl: './status-icon-label.component.html',
    styleUrls: ['./status-icon-label.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatProgressSpinnerModule,
    MatIcon,
    TitleCasePipe
  ]
})
export class StatusIconLabelComponent {

  showLabel = input(true);
  showIcon = input(true);
  enableSpinner = input(false);
  status = input<string>();
  type = input();
  progress = input();
  inline = input(true);
  externalStatusLabels = input<Record<string, string>>(null);
  protected readonly experimentsStatusLabels = computed(() => this.externalStatusLabels() || EXPERIMENTS_STATUS_LABELS);

  protected showSpinner = computed(() => [
    TASKS_STATUS.IN_PROGRESS,
    TASKS_STATUS.FAILED,
    TASKS_STATUS.STOPPED,
    '运行中',
    '失败',
    '已中止'
  ].includes(this.status()));

  statusIcon = computed(() => {
    switch (this.status()) {
      case 'created':
      case 'draft':
      case 'Draft':
      case '草稿':
        return 'al-ico-status-draft';
      case 'completed':
      case 'stopped':
      case 'closed':
      case 'Final':
      case 'Ready':
      case 'available':
      case 'committed':
      case '已完成':
      case '最终版本':
      case '可用':
        return 'al-ico-completed';
      case 'committing':
      case 'in_progress':
      case 'Uploading':
      case 'active':
      case 'routing':
      case '上传中':
      case '运行中':
        return 'al-ico-running';
      case 'failed':
      case '失败':
        return 'al-ico-dialog-x';
      case 'queued':
      case 'pending':
      case '等待中':
        return 'al-ico-pending';
      case 'published':
      case 'publishing':
      case '已发布':
        return 'al-ico-published';
      default:
        return '';
    }
  });
}
