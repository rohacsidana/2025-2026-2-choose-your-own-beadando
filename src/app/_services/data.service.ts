import { inject, Injectable, signal } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Mission, Role, StaffMember } from '../tasks/1/A/task1-a.component';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private cookieService = inject(CookieService);
  currentRole = signal<Role>(Role.Admin);

  setRole(role: Role): void {
    this.currentRole.set(role);
  }

  getStaff(): StaffMember[] {
    const stored = localStorage.getItem('staff');
    return stored ? JSON.parse(stored) : [];
  }

  setStaff(staff: StaffMember[]) {
    localStorage.setItem('staff', JSON.stringify(staff));
  }

  getMissions(): Mission[] {
    const missionSaved = this.cookieService.get('missions');
    return missionSaved ? JSON.parse(missionSaved) : [];
  }

  setMissions(missions: Mission[]) {
    this.cookieService.set('missions', JSON.stringify(missions), 7);
  }
}
