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
  wordOccurances: Map<string, number> = new Map();

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
      this.countWordOccurrences();
    };

    reader.onerror = () => {
      this.messageService.error('Hiba történt a fájl beolvasása közben!');
    };

    reader.readAsText(file);
  }

  countWordOccurrences(): void {
    this.wordOccurances.clear();

    if (!this.fileContent) {
      return;
    }

    const words = this.fileContent.trim().split(/\s+/);

    for (const word of words) {
      const cleanWord = word.toLowerCase().replace(/[?;,!.]+$/g, '');

      if (cleanWord.length > 0) {
        const currentCount = this.wordOccurances.get(cleanWord) || 0;
        this.wordOccurances.set(cleanWord, currentCount + 1);
      }
    }

    this.logTopTenWords();
  }

  logTopTenWords(): void {
    const sortedWords = [...this.wordOccurances.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    console.log('--- TOP 10 LEGGYAKORIBB SZÓ ---');
    sortedWords.forEach(([word, count], index) => {
      console.log(`${index + 1}. ${word}: ${count} alkalom`);
    });
    console.log('-------------------------------');
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
