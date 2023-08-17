import { Pipe, PipeTransform } from '@angular/core';
import { IScenario } from '../models/scenario.model';

@Pipe({
  name: 'searchFilter',
})
export class SearchFilterPipe implements PipeTransform {
  transform<T>(values: T[] | null, field: keyof T, search: string) {
    if (values === null) return values;

    return values.filter((c) => (c[field] as string).toLowerCase().includes(search.toLowerCase()));
  }
}
