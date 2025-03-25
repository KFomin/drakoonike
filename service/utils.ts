import base64 from "base-64";

/**
 * Decodes a Base64 encoded string.
 */
export function decode(encodedText: string): string {
    return base64.decode(encodedText);
}

/**
 * Decodes a ROT13 encoded string.
 */
export function decodeROT13(encodedText: string): string {
    let decoded = '';
    for (let c of encodedText) {
        if (/[a-zA-Z]/.test(c)) {
            const base = c <= 'Z' ? 'A' : 'a';
            c = String.fromCharCode(((c.charCodeAt(0) - base.charCodeAt(0) + 13) % 26) + base.charCodeAt(0));
        }
        decoded += c;
    }
    return decoded;
}
