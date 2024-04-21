import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, ViewChild, inject } from '@angular/core';
import { MatDrawerMode, MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MainSidenavComponent } from '../main-sidenav/main-sidenav.component';
import { MainHeaderComponent } from '../main-header/main-header.component';
import { BreakpointObserver, LayoutModule } from '@angular/cdk/layout';
import { RouterOutlet } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface NavConfig {
  mode: MatDrawerMode;
  hasBackdrop: boolean;
 }

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    LayoutModule,
    RouterOutlet,
    MainSidenavComponent,
    MainHeaderComponent,
    MatIconModule
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainLayoutComponent {
  private observer = inject(BreakpointObserver);
  private readonly destroyRef = inject(DestroyRef)

  public navConf: NavConfig = {
    hasBackdrop: false,
    mode: 'side'
  }

  @ViewChild('sidenav')
  public sidenav!: MatSidenav;
  public isMobile = false;

  ngOnInit() {
    this.isMobile = this.observer.isMatched('(max-width: 599px)');
  }

  ngAfterViewInit(): void {
    this.observer.observe(['(max-width: 800px)'])
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe((screenSize) => {
      if(screenSize.matches) {
        this.isMobile = true;
        this.sidenav.close();
      } else {
        this.isMobile = false;
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

  toggleSideNav(){
    this.sidenav.toggle();
  }
}
