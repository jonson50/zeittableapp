import { Component, Inject, Output, Renderer2, inject, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DOCUMENT } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';


@Component({
  selector: 'app-main-header',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatToolbarModule
  ],
  templateUrl: './main-header.component.html',
  styleUrl: './main-header.component.scss'
})
export class MainHeaderComponent {
  constructor(@Inject(DOCUMENT) private document: Document) { }
  private renderer = inject(Renderer2);
  public isDarkMode = false;

  @Output()
  toggleClicked: EventEmitter<void> = new EventEmitter<void>();

  public switchTheme() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) this.renderer.addClass(this.document.body, 'dark')
    else this.renderer.removeClass(this.document.body, 'dark')
  }
}
