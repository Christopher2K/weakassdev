import { z } from 'zod';

export const postReportOutcomeDbName = 'PostReportOutcome';
export const postReportOutcomeSchema = z.enum(['APPROVED', 'REJECTED']);

export type PostReportOutcome = z.infer<typeof postReportOutcomeSchema>;
