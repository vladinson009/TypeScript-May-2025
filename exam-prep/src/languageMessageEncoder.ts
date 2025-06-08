import { Cipher } from './contracts/cipher';
import { PartialMessageEncoder } from './contracts/implemented/partialMessageEncoder';
import { Language } from './contracts/language';
import { MessageEncoder } from './contracts/messageEncoder';

enum Operations {
  'Encoded' = 'Encoded',
  'Decoded' = 'Decoded',
  'Both' = 'Both',
}
type TotalProcessedCharactersParam = Parameters<
  MessageEncoder['totalProcessedCharacters']
>[0];

export class LanguageMessageEncoder<
    TLowerCaseCL extends Language,
    TCaesarC extends Cipher<TLowerCaseCL>
  >
  extends PartialMessageEncoder
  implements MessageEncoder
{
  private lowerCaseCharactersOnlyLanguage: TLowerCaseCL;
  private caesarCipher: TCaesarC;

  private static countSet = new Map<Operations, number>();

  constructor(lowerCase: TLowerCaseCL, ceaserCipher: TCaesarC) {
    super(lowerCase, ceaserCipher);
    this.lowerCaseCharactersOnlyLanguage = lowerCase;
    this.caesarCipher = ceaserCipher;
  }

  // ! Encode Message method
  public encodeMessage(secretMessage: unknown): string {
    if (typeof secretMessage !== 'string' || secretMessage.length == 0) {
      return 'No message.';
    }
    let prevMessage = '';
    let strippedMessage = this.stripForbiddenSymbols(secretMessage);
    while (strippedMessage !== prevMessage) {
      prevMessage = strippedMessage;
      strippedMessage = this.stripForbiddenSymbols(prevMessage);
    }
    const lengthCount = LanguageMessageEncoder.countSet.get(Operations.Encoded);
    if (lengthCount) {
      LanguageMessageEncoder.countSet.set(
        Operations.Encoded,
        lengthCount + prevMessage.length
      );
    } else {
      LanguageMessageEncoder.countSet.set(Operations.Encoded, prevMessage.length);
    }

    const isCompatible =
      this.lowerCaseCharactersOnlyLanguage.isCompatibleToCharset(prevMessage);
    if (!isCompatible) {
      return 'Message not compatible.';
    }
    return this.caesarCipher.encipher(prevMessage);
  }
  // ! Decode Message method
  public decodeMessage(secretMessage: unknown): string {
    if (typeof secretMessage !== 'string' || secretMessage.length == 0) {
      return 'No message.';
    }
    const isCompatible =
      this.lowerCaseCharactersOnlyLanguage.isCompatibleToCharset(secretMessage);
    if (!isCompatible) {
      return 'Message not compatible.';
    }
    const lengthCount = LanguageMessageEncoder.countSet.get(Operations.Decoded);
    if (lengthCount) {
      LanguageMessageEncoder.countSet.set(
        Operations.Decoded,
        lengthCount + secretMessage.length
      );
    } else {
      LanguageMessageEncoder.countSet.set(Operations.Decoded, secretMessage.length);
    }
    return this.caesarCipher.decipher(secretMessage);
  }
  // ! Total Processed Characters method
  public totalProcessedCharacters(type: TotalProcessedCharactersParam): string {
    let countChars = 0;
    if (type == Operations.Encoded) {
      countChars = LanguageMessageEncoder.countSet.get(Operations.Encoded) ?? 0;
    } else if (type == Operations.Decoded) {
      countChars = LanguageMessageEncoder.countSet.get(Operations.Decoded) ?? 0;
    } else {
      const encodedLength =
        LanguageMessageEncoder.countSet.get(Operations.Encoded) ?? 0;
      const decodedLength =
        LanguageMessageEncoder.countSet.get(Operations.Decoded) ?? 0;
      countChars = encodedLength + decodedLength;
    }
    return `Total processed characters count: ${countChars}`;
  }
}
