import { Cipher } from './contracts/cipher';
import { PartialMessageEncoder } from './contracts/implemented/partialMessageEncoder';
import { Language } from './contracts/language';
import { MessageEncoder } from './contracts/messageEncoder';

enum TypeOperation {
  Encoded = 'Encoded',
  Decoded = 'Decoded',
  Both = 'Both',
}
export class LanguageMessageEncoder<
    TLang extends Language,
    TCipher extends Cipher<TLang>
  >
  extends PartialMessageEncoder
  implements MessageEncoder
{
  private encoded = 0;
  private decoded = 0;

  constructor(lang: TLang, ciper: TCipher) {
    super(lang, ciper);
  }

  public encodeMessage(secretMessage: unknown) {
    if (typeof secretMessage !== 'string' || secretMessage.length === 0) {
      return 'No message.';
    }

    let prevMessage = '';
    let strippedMessage = this.stripForbiddenSymbols(secretMessage);
    while (strippedMessage !== prevMessage) {
      prevMessage = strippedMessage;
      strippedMessage = this.stripForbiddenSymbols(prevMessage);
    }
    const isCompatible = this.language.isCompatibleToCharset(prevMessage);
    if (!isCompatible) {
      return 'Message not compatible.';
    }

    const result = this.cipher.encipher(prevMessage);
    this.encoded += result.length;
    return result;
  }
  public decodeMessage(secretMessage: unknown): string {
    if (typeof secretMessage !== 'string' || secretMessage.length === 0) {
      return 'No message.';
    }
    const isCompatible = this.language.isCompatibleToCharset(secretMessage);
    if (!isCompatible) {
      return 'Message not compatible.';
    }
    const result = this.cipher.decipher(secretMessage);
    this.decoded += result.length;
    return result;
  }
  public totalProcessedCharacters(type: keyof typeof TypeOperation): string {
    let totalChars = 0;
    if (type === TypeOperation.Encoded) {
      totalChars = this.encoded;
    } else if (type === TypeOperation.Decoded) {
      totalChars = this.decoded;
    } else if (type === TypeOperation.Both) {
      totalChars = this.encoded + this.decoded;
    }
    return `Total processed characters count: ${totalChars}`;
  }
}
