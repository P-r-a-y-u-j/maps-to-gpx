import { db } from './firebase';
import { doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore';

const USAGE_COLLECTION = 'usage';

export const SUPPORT_MILESTONES = [3, 10, 15, 20];
export const SUPPORT_INTERVAL_AFTER_20 = 10; // Every 10 exports after 20

export interface UsageData {
    anonId: string;
    exportCount: number;
    lastExportAt: Date;
    createdAt: Date;
}

/**
 * Track a conversion and return whether to show support prompt
 */
export async function trackConversion(anonId: string): Promise<boolean> {
    try {
        const userDocRef = doc(db, USAGE_COLLECTION, anonId);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
            // First time user
            await setDoc(userDocRef, {
                anonId,
                exportCount: 1,
                lastExportAt: new Date(),
                createdAt: new Date(),
            });
            return false; // Don't show support on first export
        }

        // Increment export count
        await updateDoc(userDocRef, {
            exportCount: increment(1),
            lastExportAt: new Date(),
        });

        const currentCount = (userDoc.data().exportCount || 0) + 1;

        return shouldShowSupportPrompt(currentCount);
    } catch (error) {
        console.error('Error tracking conversion:', error);
        return false;
    }
}

/**
 * Determine if support prompt should be shown based on export count
 */
export function shouldShowSupportPrompt(exportCount: number): boolean {
    // Check if it's one of the initial milestones
    if (SUPPORT_MILESTONES.includes(exportCount)) {
        return true;
    }

    // After 20, show every SUPPORT_INTERVAL_AFTER_20 exports
    if (exportCount > 20 && (exportCount - 20) % SUPPORT_INTERVAL_AFTER_20 === 0) {
        return true;
    }

    return false;
}

/**
 * Get user's current export count
 */
export async function getExportCount(anonId: string): Promise<number> {
    try {
        const userDocRef = doc(db, USAGE_COLLECTION, anonId);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
            return 0;
        }

        return userDoc.data().exportCount || 0;
    } catch (error) {
        console.error('Error getting export count:', error);
        return 0;
    }
}
