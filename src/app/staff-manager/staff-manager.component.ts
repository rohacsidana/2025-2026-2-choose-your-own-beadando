import { Component, OnInit } from '@angular/core';
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

  constructor(
    private fb: FormBuilder,
    private msg: NzMessageService
  ) {}

  ngOnInit(): void {
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
    console.log('Form értékei:', this.staffForm.value);
    if (this.staffForm.valid) {
      const storedStaff = localStorage.getItem('staff');
      const staffList: StaffMember[] = storedStaff
        ? JSON.parse(storedStaff)
        : [];

      const newMember: StaffMember = {
        id: Date.now(),
        name: this.staffForm.value.name,
        pic: this.staffForm.value.pic,
      };

      staffList.push(newMember);
      localStorage.setItem('staff', JSON.stringify(staffList));
      this.msg.success('Személyzet sikeresen hozzáadva!');
      this.resetForm();
    }
  }

  resetForm() {
    this.staffForm.reset();
    this.imageChangedEvent = null;
    this.croppedImage = '';
  }

  imageLoaded(image: LoadedImage) {}
  cropperReady() {}
  loadImageFailed() {
    this.msg.error('A kép betöltése sikertelen!');
  }
}
