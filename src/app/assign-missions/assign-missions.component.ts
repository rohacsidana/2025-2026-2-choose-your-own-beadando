import { Component, inject, OnInit } from '@angular/core';
import { Mission, StaffMember, Status } from '../tasks/1/A/task1-a.component';
import { NzFormatEmitEvent, NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { StatusFilterPipe } from '../_pipes/status-filter.pipe';
import { DataService } from '../_services/data.service';

@Component({
  selector: 'app-assign-missions',
  templateUrl: './assign-missions.component.html',
  styleUrl: './assign-missions.component.less',
  standalone: false,
})
export class AssignMissionsComponent implements OnInit {
  private dataService = inject(DataService);
  private statusFilter = inject(StatusFilterPipe);

  missions: Mission[] = [];
  nodes: NzTreeNodeOptions[] = [];
  Status = Status;

  selectedMission: Mission;
  staff: StaffMember[] = [];
  selectedStaffIds: number[] = [];
  isModalVisible = false;

  ngOnInit(): void {
    this.staff = this.dataService.getStaff();
    this.missions = this.dataService.getMissions();

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
        this.selectedStaffIds = this.selectedMission.staff
          ? [...this.selectedMission.staff]
          : [];

        this.isModalVisible = true;
      }
    }
  }

  onStaffChange(currentSelection: number[]): void {
    const maxAllowed = this.selectedMission.requiredStaff || 0;
    if (currentSelection.length > maxAllowed) {
      this.selectedStaffIds = currentSelection.slice(0, maxAllowed);
    }
  }

  saveStaffAssignment(): void {
    if (this.selectedStaffIds.length !== this.selectedMission.requiredStaff)
      return;

    this.selectedMission.staff = this.selectedStaffIds;
    this.dataService.setMissions(this.missions);

    this.closeModal();
    this.createTree();
  }

  closeModal(): void {
    this.isModalVisible = false;
    this.selectedMission = null;
    this.selectedStaffIds = [];
  }
}
