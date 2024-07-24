export function blackF(text: string) {
  return `\x1b[30m ${text} \x1b[0m`;
}
export function greenF(text: string) {
  return `\x1b[32m ${text} \x1b[0m`;
}

export function greenB(text: string) {
  return `\x1b[42m ${text} \x1b[0m`;
}

export function yellowF(text: string) {
  return `\x1b[33m ${text} \x1b[0m`;
}
export function blueF(text: string) {
  return `\x1b[34m ${text} \x1b[0m`;
}

export function megentaF(text: string) {
  return `\x1b[35m ${text} \x1b[0m`;
}

export function whiteF(text: string) {
  return `\x1b[37m${text}\x1b[0m`;
}
export function whiteB(text: string) {
  return `\x1b[47m${text}\x1b[0m`;
}

export function redF(text: string) {
  return `\x1b[31m ${text} \x1b[0m`;
}

// Font Stle;
export function bold(text: string) {
  return `\x1b[1m${text}\x1b[0m`;
}
