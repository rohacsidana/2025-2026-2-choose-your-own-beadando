import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { StaffMember } from '../tasks/1/A/task1-a.component';

@Component({
  selector: 'app-staff-manager',
  standalone: false,
  templateUrl: './staff-manager.component.html',
  styleUrl: './staff-manager.component.less',
})
export class StaffManagerComponent implements OnInit {
  staffForm: FormGroup;
  imageChangedEvent: Event | null = null;
  croppedImage: any = '';
  nameRegex = /^\s*(\S+\s+){1,3}\S+\s*$/;
  staff: StaffMember[] = [];
  placeholderPic =
    'https://avatars.akamai.steamstatic.com/6a991cedbf9caf7e0dfd32c5f17f13820c818bf8_full.jpg';
  isEditing = false;
  editingMemberId: number;
  private fb = inject(FormBuilder);
  private msg = inject(NzMessageService);

  constructor() {}

  ngOnInit(): void {
    this.loadStaff();

    this.staffForm = this.fb.group({
      name: [
        null,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(16),
          Validators.pattern(this.nameRegex),
        ],
      ],
      pic: [null],
    });
  }

  loadStaff() {
    const stored = localStorage.getItem('staff');
    this.staff = stored ? JSON.parse(stored) : [];
  }

  fileChangeEvent(event: Event): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent): void {
    const width = event.width || 0;
    const height = event.height || 0;

    if (width > 0 && height > 0) {
      if (width < 32 || height < 32 || width > 1024 || height > 1024) {
        this.msg.error('Nem megfelelő felbontás!');
        this.croppedImage = '';
        this.staffForm.get('pic')?.setValue(null);
      } else {
        const base64Data = event.base64;

        if (base64Data) {
          this.croppedImage = base64Data;
          this.staffForm.get('pic')?.setValue(base64Data);
          this.staffForm.get('pic')?.updateValueAndValidity();
        }
      }
    }
  }

  submitForm() {
    if (this.staffForm.valid) {
      const formValues = this.staffForm.value;

      if (this.isEditing && this.editingMemberId !== null) {
        const index = this.staff.findIndex(
          (m) => m.id === this.editingMemberId
        );
        if (index !== -1) {
          this.staff[index] = {
            id: this.editingMemberId,
            name: formValues.name,
            pic: formValues.pic,
          };
        }
      } else {
        const newMember: StaffMember = {
          id: Date.now(),
          name: formValues.name,
          pic: formValues.pic,
        };
        this.staff.push(newMember);
      }

      localStorage.setItem('staff', JSON.stringify(this.staff));
      this.msg.success(
        this.isEditing ? 'Sikeres módosítás!' : 'Sikeres hozzáadás!'
      );
      this.resetForm();
    }
  }

  resetForm() {
    this.staffForm.reset();
    this.imageChangedEvent = null;
    this.croppedImage = '';
    this.isEditing = false;
    this.editingMemberId = null;
  }

  loadImageFailed() {
    this.msg.error('A kép betöltése sikertelen!');
  }

  deleteMember(id: number) {
    this.staff = this.staff.filter((mem) => mem.id !== id);
    localStorage.setItem('staff', JSON.stringify(this.staff));
    this.loadStaff();
    this.msg.success('Személyzet tagja törölve.');
  }

  editMember(member: StaffMember): void {
    this.isEditing = true;
    this.editingMemberId = member.id;

    this.staffForm.patchValue({
      name: member.name,
      pic: member.pic,
    });
    this.croppedImage = member.pic;

    this.msg.info('Adatok betöltve az űrlapba szerkesztésre.');
  }
}
