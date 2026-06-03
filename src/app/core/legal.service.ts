import { Injectable } from '@angular/core';
import legalData from '../data/legal.json';
import { Legal, LegalJson } from './models/legal.model';

@Injectable({ providedIn: 'root' })
export class LegalService {
  private readonly files = (legalData as LegalJson).files;

  getLegalByFile(file: string): Legal | undefined {
    return this.files.find(legal => legal.file === file);
  }

  getFiles(): string[] {
    return this.files.map(legal => legal.file);
  }
}
