import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'latest',
  pure: false,
})
class LatestPipe implements PipeTransform {
  transform(value: () => any) {
    return value();
  }
}
