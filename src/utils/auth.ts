import { createHash, createHmac } from 'crypto';

const JWT_SECRET = process.env.JWT_SECRET || 'desamakmur-secret';

export function hashPassword(password: string) {
  return createHash('sha256').update(password).digest('hex');
}

function base64url(value: string | Buffer) {
  return Buffer.from(value)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function encodeJson(value: object) {
  return base64url(JSON.stringify(value));
}

export function signToken(payload: { userId: number; email: string; role: string }) {
  const header = encodeJson({ alg: 'HS256', typ: 'JWT' });
  const body = encodeJson(payload);
  const signature = base64url(createHmac('sha256', JWT_SECRET).update(`${header}.${body}`).digest());
  return `${header}.${body}.${signature}`;
}

export function verifyToken(token: string) {
  const parts = token.split('.');
  if (parts.length !== 3) {
    return null;
  }

  const [header, body, signature] = parts;
  const expected = base64url(createHmac('sha256', JWT_SECRET).update(`${header}.${body}`).digest());
  if (signature !== expected) {
    return null;
  }

  try {
    return JSON.parse(Buffer.from(body, 'base64').toString('utf8')) as {
      userId: number;
      email: string;
      role: string;
    };
  } catch {
    return null;
  }
}  