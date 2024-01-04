import { Pipe, PipeTransform } from '@angular/core';
import { DateUtil } from '../utils/date.util';

@Pipe({ standalone: true, name: 'relativeTime' })
export class RelativeTimePipe implements PipeTransform {
  transform(value: Date | string | undefined): string {
    if (value === undefined) {
      return '';
    }
    return DateUtil.getRelativeTimeDescription(value);
  }
}
