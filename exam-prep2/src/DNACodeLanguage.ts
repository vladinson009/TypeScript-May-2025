import { Language } from './contracts/language';
type DNABase = 'A' | 'C' | 'G' | 'T';
export class DNACodeLanguage implements Language {
  private readonly _charset: Set<DNABase> = new Set(['A', 'C', 'G', 'T']);
  public get charset(): Set<DNABase> {
    return this._charset;
  }
  public isCompatibleToCharset(message: string): boolean {
    return [...message].every((char) => this._charset.has(char as DNABase));
  }
}
