// lib/utils/index.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatPoints = (points: number): string => {
  return new Intl.NumberFormat('en-NG').format(points);
};

export const formatWeight = (kg: number): string => {
  return `${kg.toFixed(1)} kg`;
};

// FIXED: Consistent date formatting to avoid hydration errors
export const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  // Use a fixed format that will be the same on server and client
  return d.toLocaleDateString('en-GB', { // en-GB uses DD/MM/YYYY
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).replace(/\//g, '/');
};

export const formatDateTime = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatTime = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleTimeString('en-NG', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const pointsToNaira = (points: number): number => {
  return points / 2; // 2 points = ₦1
};

export const nairaToPoints = (naira: number): number => {
  return naira * 2;
};