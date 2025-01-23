import { randomBytes, scrypt, timingSafeEqual } from 'crypto';
import { promisify } from 'util';

const scryptPromise = promisify(scrypt);

export async function hash(password: string) {
  const salt = randomBytes(8).toString('hex');
  const derivedKey = await scryptPromise(password, salt, 64);
  return salt + ':' + (derivedKey as Buffer).toString('hex');
}

export async function verify(password: string, hash: string) {
  const [salt, key] = hash.split(':');
  const keyBuffer = Buffer.from(key, 'hex');
  const derivedKey = await scryptPromise(password, salt, 64);
  return timingSafeEqual(keyBuffer, derivedKey as Buffer);
}
