function createLogMethod(
  originalMethod: (...args: Array<any>) => void,
  key: string,
  level?: string
) {
  const prefix = level ? `[${level}][${key}]` : `[${key}]`;
  return (...args: Array<any>) => {
    const newArgs = args.map(arg => arg.toString()).join(' ').split('\n');
    newArgs.forEach(arg => {
      originalMethod(prefix, arg);
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
