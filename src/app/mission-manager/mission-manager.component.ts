import { Component, inject, OnInit } from '@angular/core';
import { Mission, Status } from '../tasks/1/A/task1-a.component';
import { DataService } from '../_services/data.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { StatusFilterPipe } from '../_pipes/status-filter.pipe';

@Component({
  selector: 'app-mission-manager',
  templateUrl: './mission-manager.component.html',
  styleUrl: './mission-manager.component.less',
  standalone: false,
})
export class MissionManagerComponent implements OnInit {
  private dataService = inject(DataService);

  missions: Mission[] = [];
  statuses = Object.values(Status);
  Status = Status;

  ngOnInit(): void {
    this.missions = this.dataService.getMissions();
  }

  drop(event: CdkDragDrop<Mission[]>, targetStatus: Status): void {
    if (event.previousContainer !== event.container) {
      const movedMissionId = event.item.data;
      const mission = this.missions.find((m) => m.id === movedMissionId);

      if (mission) {
        mission.status = targetStatus;
        this.missions = [...this.missions];
        this.dataService.setMissions(this.missions);
      }
    }
  }
}
