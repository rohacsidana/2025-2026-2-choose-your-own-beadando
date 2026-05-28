import { Component, inject, OnInit } from '@angular/core';
import { DataService } from 'src/app/_services/data.service';

enum Functions {
  StaffManager = 'StaffManager',
  CreateMission = 'CreateMission',
  AssignMissions = 'AssignMissions',
  MissionManager = 'MissionManager',
}

export enum Role {
  Admin = 'Admin',
  Staff = 'Staff',
}

export interface StaffMember {
  id: number;
  name: string;
  pic: string;
}

export enum Difficulty {
  Easy = 'Könnyű',
  Medium = 'Közepes',
  Hard = 'Nehéz',
}

export enum Status {
  Open = 'Nyitott',
  InProgress = 'Folyamatban',
  Closed = 'Lezárt',
  Failed = 'Sikertelen',
}

export interface Mission {
  id: number;
  name: string;
  desc: string;
  difficulty: Difficulty;
  status: Status;
  requiredStaff: number;
  staff: number[];
}

@Component({
  selector: 'app-task1-a',
  templateUrl: './task1-a.component.html',
  styleUrls: ['./task1-a.component.less'],
  standalone: false,
})
export class Task1AComponent implements OnInit {
  func: Functions | null = null;
  Functions = Functions;
  Role = Role;
  private dataService = inject(DataService);

  currentRole: Role = Role.Admin;
  staffList: StaffMember[] = [];
  selectedStaffId;

  constructor() {}

  ngOnInit(): void {
    this.loadStaffList();
    this.dataService.setRole(this.currentRole);
  }

  loadStaffList(): void {
    this.staffList = this.dataService.getStaff();
  }

  selectRole(role: Role): void {
    this.currentRole = role;
    this.dataService.setRole(role);
    if (role === Role.Admin) {
      this.selectedStaffId = null;
    } else {
      this.func = null;
      this.loadStaffList();
    }
  }
}
