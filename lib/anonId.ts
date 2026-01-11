import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';

const COOKIE_NAME = 'anon_id';
const COOKIE_EXPIRY_DAYS = 365;

/**
 * Get or create anonymous user ID
 */
export function getAnonId(): string {
    let anonId = Cookies.get(COOKIE_NAME);

    if (!anonId) {
        anonId = uuidv4();
        Cookies.set(COOKIE_NAME, anonId, {
            expires: COOKIE_EXPIRY_DAYS,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production'
        });
    }

    return anonId;
}
