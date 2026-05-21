import { Component, inject, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Mission, Status } from '../tasks/1/A/task1-a.component';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { StatusFilterPipe } from '../_pipes/status-filter.pipe';

@Component({
  selector: 'app-assign-missions',
  templateUrl: './assign-missions.component.html',
  styleUrl: './assign-missions.component.less',
  standalone: false,
})
export class AssignMissionsComponent implements OnInit {
  private cookieService = inject(CookieService);
  private statusFilter = inject(StatusFilterPipe);
  missions: Mission[] = [];
  nodes: NzTreeNodeOptions[] = [];
  Status = Status;

  ngOnInit(): void {
    const missionSaved = this.cookieService.get('missions');
    this.missions = missionSaved ? JSON.parse(missionSaved) : [];

    this.createTree();
  }

  createTree() {
    this.nodes = Object.values(Status).map((statusValue) => {
      const filteredMissions = this.statusFilter.transform(
        this.missions,
        statusValue
      );

      return {
        title: `${statusValue} (${filteredMissions.length})`,
        key: statusValue,
        expanded: true,
        selectable: false,
        children: filteredMissions.map((mission) => ({
          title: mission.name,
          key: mission.id.toString(),
          isLeaf: true,
        })),
      };
    });
  }
}
