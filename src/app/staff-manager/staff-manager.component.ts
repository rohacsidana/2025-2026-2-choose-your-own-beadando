import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-staff-manager',
  imports: [],
  templateUrl: './staff-manager.component.html',
  styleUrl: './staff-manager.component.less',
})
export class StaffManagerComponent implements OnInit {
  staffForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private msg: NzMessageService
  ) {}

  ngOnInit(): void {
    this.staffForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(16)]],
      pic: [null, [Validators.required]],
    });
  }
}
