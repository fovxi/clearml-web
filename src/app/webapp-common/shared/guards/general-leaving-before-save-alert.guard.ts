import {inject, Signal} from '@angular/core';
import {CanDeactivateFn} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../ui-components/overlay/confirm-dialog/confirm-dialog.component';
import {map} from 'rxjs/operators';

export interface DirtyState {
  isDirty: Signal<boolean>
}


export const generalLeavingBeforeSaveAlertGuard: CanDeactivateFn<DirtyState> = (component) => {
  const dialog = inject(MatDialog);

  if (!component.isDirty()) {
    return true;
  }

  return dialog.open(ConfirmDialogComponent, {
    data: {
      title: '提示',
      body: '您有未保存的更改。要留在此页面继续编辑，还是不保存并离开？',
      yes: '离开',
      no: '留下',
      iconClass: 'al-ico-alert',
      iconColor: 'var(--color-warning)',
      centerText: true,
      width: 440
    }
  }).afterClosed()
    .pipe(map(leave => !!leave));
};
