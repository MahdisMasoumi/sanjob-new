import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';

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
  imports: [
    RouterOutlet,
    CommonModule,
    RouterLinkActive,
    RouterLink,
    FormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  searchQuery: string = '';

  searchGoogle() {
    if (this.searchQuery.trim()) {
      const forumSearchUrl = `https://forum.sanjob.ca/index.php?q=${encodeURIComponent(
        this.searchQuery
      )}`;
      window.open(forumSearchUrl, '_blank');
    }
  }
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
    if (typeof document !== 'undefined') {
      const navbarCollapse = document.getElementById('navbarNav');
      if (navbarCollapse) {
        navbarCollapse.classList.remove('show');
      }
    }
  }
  navigateTo(link: string) {
    this.router.navigate([link]);
  }
}
