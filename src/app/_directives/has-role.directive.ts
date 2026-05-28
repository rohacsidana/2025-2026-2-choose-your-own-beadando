import {
  Directive,
  ElementRef,
  inject,
  input,
  Renderer2,
  effect,
} from '@angular/core';
import { Role } from '../tasks/1/A/task1-a.component';
import { DataService } from '../_services/data.service';

@Directive({
  selector: '[appHasRole]',
  standalone: false,
})
export class HasRoleDirective {
  appHasRole = input<Role>();

  private readonly elRef = inject(ElementRef);
  private renderer = inject(Renderer2);
  private dataService = inject(DataService);

  constructor() {
    effect(() => {
      const currentRole = this.dataService.currentRole();
      const expected = this.appHasRole();

      const hasPermission = currentRole === expected;

      if (hasPermission) {
        this.renderer.setStyle(this.elRef.nativeElement, 'display', '');
      } else {
        this.renderer.setStyle(this.elRef.nativeElement, 'display', 'none');
      }
    });
  }
}
