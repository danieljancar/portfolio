import { Component, Input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapEmojiDizzy } from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-placeholder-message',
  standalone: true,
  imports: [NgIcon],
  templateUrl: './placeholder-message.component.html',
  styleUrl: './placeholder-message.component.scss',
  viewProviders: [
    provideIcons({
      bootstrapEmojiDizzy,
    }),
  ],
})
export class PlaceholderMessageComponent {
  @Input() public title: string | undefined;
  @Input() public message: string | undefined;
  @Input() public icon: string | undefined = 'bootstrapEmojiDizzy';
}
