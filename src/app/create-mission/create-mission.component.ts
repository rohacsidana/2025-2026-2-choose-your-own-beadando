import { Component, inject, OnInit } from '@angular/core';
import { Difficulty, Mission, Status } from '../tasks/1/A/task1-a.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DataService } from '../_services/data.service';

@Component({
  selector: 'app-create-mission',
  standalone: false,
  templateUrl: './create-mission.component.html',
  styleUrl: './create-mission.component.less',
})
export class CreateMissionComponent implements OnInit {
  missionForm: FormGroup;
  difficulties = Object.values(Difficulty);
  Difficulty = Difficulty;
  private dataService = inject(DataService);
  private fb = inject(FormBuilder);
  private msg = inject(NzMessageService);

  constructor() {}

  ngOnInit(): void {
    this.createForm();

    this.missionForm.get('difficulty').valueChanges.subscribe(() => {
      this.updateStaffValidation();
    });
  }

  createForm() {
    this.missionForm = this.fb.group({
      name: [null, [Validators.required]],
      desc: [null],
      difficulty: [Difficulty.Medium, [Validators.required]],
      requiredStaff: [
        1,
        [Validators.required, Validators.min(1), Validators.max(3)],
      ],
    });
  }

  updateStaffValidation(): void {
    const difficulty = this.missionForm.get('difficulty').value;
    console.log('Difficulty is:', difficulty);
    const staffControl = this.missionForm.get('requiredStaff');
    if (difficulty === Difficulty.Hard) {
      staffControl.setValidators([
        Validators.required,
        Validators.min(2),
        Validators.max(3),
      ]);
    } else {
      staffControl.setValidators([
        Validators.required,
        Validators.min(1),
        Validators.max(3),
      ]);
    }

    staffControl.updateValueAndValidity();
    if (staffControl.invalid) {
      console.log('staff input is INVALID');
      staffControl.markAsDirty();
      staffControl.markAsTouched();
      staffControl.updateValueAndValidity();
    }
  }

  submitForm(): void {
    if (this.missionForm.valid) {
      const missions = this.dataService.getMissions();

      const newMission: Mission = {
        id: Date.now(),
        ...this.missionForm.value,
        status: Status.Open,
        staff: [],
      };

      missions.push(newMission);
      this.dataService.setMissions(missions);

      this.msg.success('Küldetés sikeresen létrehozva!');
      this.createForm();
    } else {
      this.missionForm.markAllAsDirty();
      this.missionForm.updateValueAndValidity();
    }
  }
}
