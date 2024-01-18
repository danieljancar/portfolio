import { Component, Input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapEmojiDizzy } from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-placeholder-message',
  standalone: true,
  imports: [NgIcon],
  template: `
    <div class="items-center flex flex-col justify-center">
      <ng-icon class="text-2xl mb-3" name="{{ icon }}" />
      @if (title) {
        <h1 class="text-2xl mb-2">{{ title }}</h1>
      }
      <p class="text-lg">
        {{ message }}
      </p>
    </div>
  `,
  styles: [],
  viewProviders: [
    provideIcons({
      bootstrapEmojiDizzy,
    }),
  ],
})
export class PlaceholderMessageComponent {
  @Input() public title: string | undefined = 'Oops!';
  @Input() public message: string | undefined = 'Something went wrong.';
  @Input() public icon: string | undefined = 'bootstrapEmojiDizzy';
}
