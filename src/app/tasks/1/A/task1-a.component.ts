import { Component } from '@angular/core';

enum Functions {
  StaffManager = 'StaffManager',
  CreateMission = 'CreateMission',
  AssignMissions = 'AssignMissions',
  MissionManager = 'MissionManager'
}
export interface StaffMember {
  id: number;
  name: string;
  pic: string;
}

enum Difficulty {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard',
}

enum Status {
  Open = 'Open',
  InProgress = 'In Progress',
  Closed = 'Closed',
  Failed = 'Failed',
}
interface Mission {
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

  constructor() { }
  
}
