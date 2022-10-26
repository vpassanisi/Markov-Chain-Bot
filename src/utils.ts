export function logMagenta(str: string) {
  console.log("\x1b[35m%s\x1b[0m", str);
}

export function logRed(str: string) {
  console.log("\x1b[31m%s\x1b[0m", str);
}

export function logGreen(str: string) {
  console.log("\x1b[32m%s\x1b[0m", str);
}

export function randomInRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
