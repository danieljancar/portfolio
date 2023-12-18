import { Pipe, PipeTransform } from '@angular/core';
import { DateUtil } from '../utils/date.util';

@Pipe({ standalone: true, name: 'relativeTime' })
export class RelativeTimePipe implements PipeTransform {
  transform(value: Date | string): string {
    return DateUtil.getRelativeTimeDescription(value);
  }
}
