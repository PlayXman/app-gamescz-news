/*
 * Manually run the tasks here https://console.cloud.google.com/cloudscheduler
 */
import {onSchedule} from "firebase-functions/v2/scheduler";

// Initialize the Firebase Admin SDK
import {initializeApp} from "firebase-admin/app";
import {gamesCzRssDownloadHandler} from "./GamesCzRssDownload";
initializeApp();

export const gamesCzRssDownload = onSchedule("every day 17:45 (Australia/Melbourne)", gamesCzRssDownloadHandler);
