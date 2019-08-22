function createLogMethod(
  originalMethod: (...args: Array<any>) => void,
  key: string,
  level?: string
) {
  const prefix = level ? `[${level}][${key}]` : `[${key}]`;
  return (...args: Array<any>) => {
    args.forEach(arg => {
      if (typeof(arg) === 'string') {
        arg.split('\n').forEach(argPart => {
          originalMethod(prefix, argPart);
        });
      }
    });
  }
}

export function createLogger(key: string) {
  return Object.assign({}, console, {
    log: createLogMethod(console.log, key),
    info: createLogMethod(console.info, key, 'INFO'),
    error: createLogMethod(console.error, key, 'ERROR')
  });
}
