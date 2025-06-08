enum LoggingLevel {
  Info = 'Info',
  Error = 'Error',
  Warning = 'Warning',
  Debug = 'Debug',
}
enum LoggingFormat {
  Standard = '[%level][%date] %text',
  Minimal = '*%level* %text',
}
interface CachingLogger<T extends LoggingLevel, V extends LoggingFormat> {
  cachedLogs: Map<T, string[]>;
  log(logLevel: T, message: string): void;
  getFormat(): V;
}

class Logger<TLevel extends LoggingLevel, TFormat extends LoggingFormat>
  implements CachingLogger<TLevel, TFormat>
{
  cachedLogs: Map<TLevel, string[]> = new Map();

  log(logLevel: TLevel, message: string): void {}
  getFormat(): TFormat {}
}

let logger = new Logger<LoggingLevel, LoggingFormat>(LoggingFormat.Standard);
logger.log(LoggingLevel.Info, 'This is an info message.');
logger.log(LoggingLevel.Info, 'Another message.');
logger.log(LoggingLevel.Error, 'Something went wrong.');
logger.log(LoggingLevel.Warning, 'Be careful with the type assertions.');
logger.log(LoggingLevel.Debug, 'Running the debugger.');

console.log('-----------');
console.log([...logger.cachedLogs.entries()].map((x) => x[1].join('\n')).join('\n'));
