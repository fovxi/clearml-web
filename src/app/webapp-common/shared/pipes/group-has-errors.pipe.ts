import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'groupHasErrors',
  })
export class GroupHasErrorsPipe implements PipeTransform {
  transform(formValueChanged, invalid): string {
    return invalid ? '分组配置无效' : '';
  }
}
