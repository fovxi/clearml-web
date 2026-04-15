import { Injectable } from '@angular/core';
import {Store} from '@ngrx/store';
import {filter} from 'rxjs/operators';
import {updateUsageStats} from '../actions/usage-stats.actions';
import {selectPromptUser} from '../reducers/usage-stats.reducer';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '@common/shared/ui-components/overlay/confirm-dialog/confirm-dialog.component';
import {ConfigurationService} from '@common/shared/services/configuration.service';

@Injectable({
  providedIn: 'root'
})
export class UsageStatsService {

  constructor(
    private store: Store<any>,
    private dialog: MatDialog,
  ) {

    if (!ConfigurationService.globalEnvironment.demo) {
      this.store.select(selectPromptUser)
        .pipe(filter(prompt => !!prompt))
        .subscribe(() => {
          const dialogRef = this.dialog.open(ConfirmDialogComponent,
            {
              data: {
                title: '帮助我们改进平台',
                body: `请允许服务器发送匿名使用统计信息，以便我们更好地了解平台使用情况并持续改进。<BR>
  你可以在个人资料页面更改此设置。`,
                yes: '同意',
                no: '拒绝',
                iconClass: 'i-terms',
              }
            });

          dialogRef.afterClosed().subscribe((allowed: boolean) => {
            this.store.dispatch(updateUsageStats({allowed}));
          });
        });
    }
  }
}
