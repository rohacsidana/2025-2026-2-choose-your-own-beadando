import { Pipe, PipeTransform } from '@angular/core';
import { Mission, Status } from '../tasks/1/A/task1-a.component';

@Pipe({
  name: 'statusFilter',
})
export class StatusFilterPipe implements PipeTransform {
  transform(missions: Mission[], status: Status): Mission[] {
    return missions.filter((mission) => mission.status === status);
  }
}
