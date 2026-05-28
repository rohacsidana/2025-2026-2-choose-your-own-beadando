import { Component, inject, OnInit } from '@angular/core';
import { Mission, Status } from '../tasks/1/A/task1-a.component';
import { DataService } from '../_services/data.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-mission-manager',
  templateUrl: './mission-manager.component.html',
  styleUrl: './mission-manager.component.less',
  standalone: false,
})
export class MissionManagerComponent implements OnInit {
  private dataService = inject(DataService);
  private message = inject(NzMessageService);

  missions: Mission[] = [];
  statuses = Object.values(Status);
  Status = Status;

  ngOnInit(): void {
    this.missions = this.dataService.getMissions();
  }

  isStaff(): boolean {
    return this.dataService.currentRole() === 'Staff';
  }

  drop(event: CdkDragDrop<Mission[]>, targetStatus: Status): void {
    const movedMissionId = event.item.data;
    const mission = this.missions.find((m) => m.id === movedMissionId);

    if (!mission) return;

    // check staff
    const assignedCount = mission.staff ? mission.staff.length : 0;
    if (assignedCount < mission.requiredStaff) {
      this.message.error(
        `A küldetés nem mozgatható! Hiányzó személyzet (${assignedCount}/${mission.requiredStaff} fő beosztva).`
      );
      return;
    }

    const currentStatus = mission.status;
    if (!this.canMoveTo(currentStatus, targetStatus)) {
      return;
    }

    mission.status = targetStatus;
    this.missions = [...this.missions];
    this.dataService.setMissions(this.missions);

    this.message.success(
      `Küldetés sikeresen áthelyezve a(z) "${targetStatus}" oszlopba.`
    );
  }

  canMoveTo(currentStatus: Status, targetStatus: Status): boolean {
    if (currentStatus === Status.Open) {
      if (targetStatus !== Status.InProgress) {
        this.message.error('Nyitott küldetést először el kell kezdeni...');
        return false;
      }
    } else if (currentStatus === Status.InProgress) {
      if (targetStatus === Status.Open) {
        this.message.error(
          'Már elkezdett küldetést nem lehet visszaállítani "Nyitott" állapotba!'
        );
        return false;
      }
    } else if (
      currentStatus === Status.Closed ||
      currentStatus === Status.Failed
    ) {
      this.message.error(
        'Lezárt vagy sikertelen küldetés státusza már nem módosítható!'
      );
      return false;
    }

    return true;
  }
}
