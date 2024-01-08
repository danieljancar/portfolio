import { Injectable } from '@angular/core';
import { Legal, LegalJson } from '../types/legal.type';
import * as legalData from '../../assets/legal/legal.json';

@Injectable({
  providedIn: 'root',
})
export class LegalService {
  private legals: Legal[] = (legalData as LegalJson).files;

  constructor() {}

  getLegalByFile(file: string): Legal | undefined {
    return this.legals.find(legal => legal.file === file);
  }
}
