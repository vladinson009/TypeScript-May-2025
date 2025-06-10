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
  protected override stripForbiddenSymbols(message: string) {
    let forbiddenSymbols = PartialMessageEncoder.forbiddenSymbols;
    forbiddenSymbols.forEach((x) => (message = message.replaceAll(x, '')));
    return message;
  }
  public encodeMessage(secretMessage: unknown) {
    if (typeof secretMessage !== 'string' || secretMessage.length === 0) {
      return 'No message.';
    }

    const strippedMessage = this.stripForbiddenSymbols(secretMessage);
    const isCompatible = this.language.isCompatibleToCharset(strippedMessage);

    if (!isCompatible) {
      return 'Message not compatible.';
    }

    const result = this.cipher.encipher(strippedMessage);
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
