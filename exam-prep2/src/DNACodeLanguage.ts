import { Language } from './contracts/language';

type DNABase = 'A' | 'C' | 'G' | 'T';
export class DNACodeLanguage implements Language {
  private readonly _charset: Set<DNABase> = new Set(['A', 'C', 'G', 'T']);

  public get charset() {
    return this._charset;
  }

  public isCompatibleToCharset(sample: string): boolean {
    const isCompatible = [...sample].every(
      (x) => this.charset.has(x as DNABase)
      //   const isMatch = [...this.charset].findIndex((el) => x === el);
    );
    return isCompatible;
  }
}
