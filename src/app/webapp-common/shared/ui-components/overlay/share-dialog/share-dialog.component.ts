import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogRef} from '@angular/material/dialog';
import {IShareDialogConfig} from './share-dialog.model';
import {addMessage} from '@common/core/actions/layout.actions';
import {Store} from '@ngrx/store';
import {shareSelectedExperiments} from '@common/experiments/actions/common-experiments-menu.actions';
import {MESSAGES_SEVERITY} from '@common/constants';
import {DialogTemplateComponent} from '@common/shared/ui-components/overlay/dialog-template/dialog-template.component';
import {ClipboardModule} from 'ngx-clipboard';
import {ClickStopPropagationDirective} from '@common/shared/ui-components/directives/click-stop-propagation.directive';
import {SaferPipe} from '@common/shared/pipes/safe.pipe';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';


@Component({
    selector: 'sm-share-dialog',
    templateUrl: './share-dialog.component.html',
    styleUrls: ['./share-dialog.component.scss'],
    imports: [
        DialogTemplateComponent,
        ClipboardModule,
        ClickStopPropagationDirective,
        SaferPipe,
        MatIcon,
        MatButton,
        MatDialogActions
    ]
})
export class ShareDialogComponent {

  displayX = true;

  title: string;

  public subTitle: string;
  public link: string;
  shared = false;
  public sharedSubtitle: string;
  public privateSubtitle: string;
  private readonly task: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: IShareDialogConfig,
              public dialogRef: MatDialogRef<ShareDialogComponent>,
              private store: Store) {
    this.title = data.title || '';
    this.sharedSubtitle =`<b>任何持有此链接的已注册用户</b>都可只读访问该任务及其全部内容（工件、结果等）。`;
    this.privateSubtitle =  `创建一个可分享链接，为<b>任何收到此链接的已注册用户</b>授予只读权限。`;
    this.task = data.task;

    this.link = data.link || '';
    this.shared = !!data.alreadyShared;
  }

  closeDialog(isConfirmed) {
    this.dialogRef.close({isConfirmed, shared: this.shared});
  }

  copyToClipboardSuccess() {
    this.store.dispatch(addMessage(MESSAGES_SEVERITY.SUCCESS, 'URL 已成功复制'));
  }

  createLink() {
    this.store.dispatch(shareSelectedExperiments({share: !this.shared, task: this.task}));

    this.shared = !this.shared;
  }
}
