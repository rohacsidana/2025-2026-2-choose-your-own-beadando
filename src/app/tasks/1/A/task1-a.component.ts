import { Component } from '@angular/core';

enum Functions {
  StaffManager = 'StaffManager',
  CreateMission = 'CreateMission',
  AssignMissions = 'AssignMissions',
  MissionManager = 'MissionManager',
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
export class Task1AComponent {
  func: Functions | null = null;
  Functions = Functions;

  constructor() {}
}
