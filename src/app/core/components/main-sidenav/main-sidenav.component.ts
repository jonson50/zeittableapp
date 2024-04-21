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
        label: 'Dashboards',
        icon: 'dashboard',
        active: false,
        url: '',
        children: [
          {
            label: 'Analytics',
            icon: null,
            children: [],
            active: false,
            url: '/dashboards/analytics'
          },
          {
            label: 'Project',
            icon: null,
            children: [],
            active: false,
            url: '/dashboards/project'
          },
          {
            label: 'Finance',
            icon: null,
            children: [],
            active: false,
            url: '/dashboards/finance'
          }
        ]
      },
      {
        label: 'E-Commerce',
        icon: 'storefront',
        children: [
          {
            label: 'Inventory',
            icon: null,
            children: [],
            active: false,
            url: '/ecommerce/inventory'
          },
          {
            label: 'Invoices',
            icon: null,
            children: [],
            active: false,
            url: '/ecommerce/invoices'
          },
          {
            label: 'Checkout Form',
            icon: null,
            children: [],
            active: false,
            url: '/ecommerce/checkout'
          }
        ],
        active: false,
        url: ''
      },
      {
        label: 'Menu1',
        icon: 'star',
        children: [],
        active: false,
        url: ''
      },
      {
        label: 'Pages',
        icon: 'storefront',
        active: false,
        url: '',
        children: [
          {
            label: 'Sign in',
            icon: null,
            active: false,
            url: '',
            children: [
              {
                label: 'Login 1',
                icon: 'star',
                active: false,
                url: '',
                children: [],
              },
              {
                label: 'Login 2',
                icon: 'star',
                active: false,
                url: '',
                children: [],
              },
              {
                label: 'Login 2',
                icon: 'star',
                active: false,
                url: '',
                children: [],
              },
            ]
          },
          {
            label: 'Sign out',
            icon: null,
            active: false,
            url: '',
            children: [
              {
                label: 'Sign out 1',
                icon: 'star',
                children: [],
                active: false,
                url: ''
              },
              {
                label: 'Sign out 2',
                icon: 'star',
                children: [],
                active: false,
                url: ''
              },
            ]
          },
          {
            label: 'Forgot Password',
            icon: null,
            active: false,
            url: '',
            children: [
              {
                label: 'Forgot 1',
                icon: 'star',
                children: [],
                active: false,
                url: ''
              },
              {
                label: 'Forgot 2',
                icon: 'star',
                children: [],
                active: false,
                url: ''
              },
            ]
          },
          {
            label: 'Maintenance',
            icon: null,
            active: false,
            url: '/pages/maintenance',
            children: []
          }
        ],
      },
    ];
    menu.map(item => this.checkUrlInsideChildre(item));
    this.menuList = [...menu];
    this._router.events
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(event => {
        menu.map(item => this.checkUrlInsideChildre(item));
      })
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
