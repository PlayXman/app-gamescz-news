/*
 * Manually run the tasks here https://console.cloud.google.com/cloudscheduler
 */
import {onSchedule} from "firebase-functions/v2/scheduler";

// Initialize the Firebase Admin SDK
import {initializeApp} from "firebase-admin/app";
import {gamesCzRssDownloadHandler} from "./GamesCzRssDownload";
initializeApp();

// Scheduled for every day at 18:00 AEDT
export const gamesCzRssDownload = onSchedule("every day 07:00", gamesCzRssDownloadHandler);
