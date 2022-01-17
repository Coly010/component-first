import { Pipe, PipeTransform } from '@angular/core';
import type { SelectorResult } from '../types';

@Pipe({
  name: 'latest',
  pure: false,
})
export class LatestPipe<T> implements PipeTransform {
  transform(value: SelectorResult<T>): T {
    return value();
  }
}
