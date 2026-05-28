import { AfterViewInit, Component, inject } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-task2-b',
  templateUrl: './task2-b.component.html',
  styleUrls: ['./task2-b.component.less'],
  standalone: false,
})
export class Task2BComponent implements AfterViewInit {
  private messageService = inject(NzMessageService);
  fileName: string;
  fileContent: string;
  fileSize: string;

  constructor() {}

  ngAfterViewInit() {}

  beforeUpload = (file: NzUploadFile): boolean => {
    if (!file.name.endsWith('.txt')) {
      this.messageService.error(
        'Csak .txt kiterjesztésű fájlok feltöltése megengedett!'
      );
      return false;
    }
    this.fileName = file.name;
    const sizeInBytes = file.size;
    this.fileSize = sizeInBytes + ' bájt';
    this.readFile(file as any);
    return false;
  };

  readFile(file: File): void {
    const reader = new FileReader();

    reader.onload = () => {
      this.fileContent = reader.result as string;
      this.messageService.success(
        `A(z) "${this.fileName}" sikeresen beolvasva!`
      );
    };

    reader.onerror = () => {
      this.messageService.error('Hiba történt a fájl beolvasása közben!');
    };

    reader.readAsText(file);
  }
}
