import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
  NavigationEnd,
} from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLinkActive, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'sanjob';
  isDarkTheme: boolean = false;
  isNavbarOpen: boolean = false;
  showScrollBtn: boolean = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollBtn = window.scrollY > 20;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  constructor(private router: Router) {
    // Close the navbar whenever navigation ends
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.closeNavbar();
      });
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    const body = document.body;

    if (this.isDarkTheme) {
      body.classList.add('dark-theme');
      body.classList.remove('light-theme');
      console.log('Dark theme applied');
    } else {
      body.classList.remove('dark-theme');
      body.classList.add('light-theme');
      console.log('Light theme applied');
    }
  }

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  closeNavbar() {
    this.isNavbarOpen = false;

    // Check if window and document are available (i.e., running in the browser)
    if (typeof document !== 'undefined') {
      const navbarCollapse = document.getElementById('navbarNav');
      if (navbarCollapse) {
        navbarCollapse.classList.remove('show');
      }
    }
  }
  navigateTo(link: string) {
    this.router.navigate([link]); // Adjust the paths as necessary
  }
}
