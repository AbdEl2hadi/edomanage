import { init } from "@paralleldrive/cuid2"

export const generateId = init({ length: 12 })

export function generateRandomEmail() {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';

    // Helper to generate a random string of a specific length
    const randStr = (len: number) => Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join('');

    const user = randStr(10);      // e.g., "z9k2m5p1vx"
    const domain = randStr(8);    // e.g., "q8n3w2r1"
    const tld = ['com', 'net', 'org', 'io', 'edu'][Math.floor(Math.random() * 5)];

    return `${user}@${domain}.${tld}`;
}

// Example outputs:
// "m92nzpql10@k8v2n1x3.io"
// "x81b6v5r3p@a9z2m1w4.net"
// "q2p9l0v1n8@z3x8r2w1.com"
