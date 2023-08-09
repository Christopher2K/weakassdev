import { z } from 'zod';

export const postReportReasonDbName = 'PostReportReason';
export const postReportReasonSchema = z.enum(['OFFENSIVE', 'DUPLICATE']);

export type PostReportReason = z.infer<typeof postReportReasonSchema>;
