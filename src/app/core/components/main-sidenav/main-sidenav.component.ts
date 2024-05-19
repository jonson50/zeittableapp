import { Component, DestroyRef, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export interface MenuItem {
  label: string;
  icon: string | null;
  active: boolean;
  url: string;
  children: MenuItem[];
}

@Component({
  selector: 'app-main-sidenav',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    MatListModule,
    MatExpansionModule,
    MatIconModule
  ],
  templateUrl: './main-sidenav.component.html',
  styleUrl: './main-sidenav.component.scss'
})
export class MainSidenavComponent {
  private readonly _router = inject(Router);
  private readonly destroyRef = inject(DestroyRef)

  currentUrl = '';
  panelOpenState = false;
  menuList: MenuItem[] = [];

  ngOnInit() {
    const menu = [
      {
        label: 'Dashboard',
        icon: 'dashboard',
        children: [],
        active: false,
        url: '/dashboard'
      },
      {
        label: 'Time Entry',
        icon: 'calendar_month',
        children: [],
        active: false,
        url: '/time-entry'
      },
      {
        label: 'Admin',
        icon: 'shield_person',
        active: false,
        url: '',
        children: [
          {
            label: 'Employees',
            icon: null,
            children: [],
            active: false,
            url: '/admin/employees'
          },
        ]
      },

    ];
    menu.forEach(item => this.checkUrlInsideChildre(item));
    this.menuList = [...menu];
    this._router.events
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(() => menu.map(item => this.checkUrlInsideChildre(item)))
  }

  checkUrlInsideChildre(menu: MenuItem) {
    const currentUrl = this._router.url;

    const children = menu.children.map(childMenu => {
      if (childMenu.children.length) { this.checkUrlInsideChildre(childMenu) }
      childMenu.active = childMenu.url.includes(currentUrl)
      return childMenu
    });
    menu.active = children.map(a => a.active).includes(true);
    menu.children = children;
    return menu
  }
}
