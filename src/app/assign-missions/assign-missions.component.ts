import {
  Component,
  inject,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Mission, Status } from '../tasks/1/A/task1-a.component';
import { NzFormatEmitEvent, NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { StatusFilterPipe } from '../_pipes/status-filter.pipe';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-assign-missions',
  templateUrl: './assign-missions.component.html',
  styleUrl: './assign-missions.component.less',
  standalone: false,
})
export class AssignMissionsComponent implements OnInit {
  private cookieService = inject(CookieService);
  private statusFilter = inject(StatusFilterPipe);
  private modalService = inject(NzModalService);
  missions: Mission[] = [];
  nodes: NzTreeNodeOptions[] = [];
  Status = Status;
  @ViewChild('missionDetailsTpl', { static: true })
  missionDetailsTpl: TemplateRef<any>;
  selectedMission: Mission;

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

  onNodeClick(event: NzFormatEmitEvent): void {
    const node = event.node;

    if (node.isLeaf) {
      const missionId = +node.key;

      const selectedMission = this.missions.find((m) => m.id === missionId);

      if (selectedMission) {
        this.selectedMission = selectedMission;
        this.openDetailsModal();
      }
    }
  }

  openDetailsModal(): void {
    this.modalService.create({
      nzTitle: 'Küldetés részletei',
      nzContent: this.missionDetailsTpl,
      nzFooter: null,
      nzCentered: true,
      nzOnCancel: () => {
        this.selectedMission = null;
      },
    });
  }
}
