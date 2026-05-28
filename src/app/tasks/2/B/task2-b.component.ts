import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import Mark from 'mark.js';

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

  searchTerm: string = '';

  @ViewChild('pre') preElement: ElementRef<HTMLPreElement>;
  private mark: Mark | null = null;

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

  highlight(): void {
    if (!this.mark) {
      this.mark = new Mark(this.preElement.nativeElement);
    }

    this.mark.unmark({
      done: () => {
        if (!this.searchTerm) {
          return;
        }

        this.mark.mark(this.searchTerm, {
          caseSensitive: false,
          separateWordSearch: false,
        });
      },
    });
  }
}
