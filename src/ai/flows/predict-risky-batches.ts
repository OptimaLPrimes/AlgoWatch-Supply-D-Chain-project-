'use server';
/**
 * @fileOverview An AI agent that analyzes historical batch data to detect risky batches and predict potential temperature breaches.
 *
 * - predictRiskyBatches - A function that handles the prediction of risky batches.
 * - PredictRiskyBatchesInput - The input type for the predictRiskyBatches function.
 * - PredictRiskyBatchesOutput - The return type for the predictRiskyBatches function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictRiskyBatchesInputSchema = z.object({
  batchData: z
    .string()
    .describe('Historical batch data, including temperature logs, GPS locations, and timestamps.'),
  temperatureThreshold: z
    .number()
    .describe('The temperature threshold above which a batch is considered at risk.'),
});
export type PredictRiskyBatchesInput = z.infer<typeof PredictRiskyBatchesInputSchema>;

const PredictRiskyBatchesOutputSchema = z.object({
  isRisky: z.boolean().describe('Whether the batch is predicted to be at risk of temperature breach.'),
  riskFactors: z
    .string()
    .describe('The factors contributing to the risk, such as historical temperature fluctuations or route characteristics.'),
  suggestedActions: z
    .string()
    .describe('Suggested actions to mitigate the risk, such as adjusting the route or improving temperature control.'),
});
export type PredictRiskyBatchesOutput = z.infer<typeof PredictRiskyBatchesOutputSchema>;

export async function predictRiskyBatches(
  input: PredictRiskyBatchesInput
): Promise<PredictRiskyBatchesOutput> {
  return predictRiskyBatchesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictRiskyBatchesPrompt',
  input: {schema: PredictRiskyBatchesInputSchema},
  output: {schema: PredictRiskyBatchesOutputSchema},
  prompt: `You are an AI assistant specializing in supply chain risk analysis, particularly for temperature-sensitive goods.

You are provided with historical batch data, including temperature logs, GPS locations, and timestamps. Your task is to analyze this data and predict whether a batch is at risk of a temperature breach.

Consider factors such as:
- Historical temperature fluctuations
- Route characteristics (e.g., weather conditions, traffic delays)
- Time of year
- Origin and destination locations

Based on your analysis, determine whether the batch is likely to exceed the specified temperature threshold. If so, identify the key risk factors and suggest actions to mitigate the risk.

Here is the batch data:
{{{batchData}}}

Temperature Threshold: {{{temperatureThreshold}}}
`,
});

const predictRiskyBatchesFlow = ai.defineFlow(
  {
    name: 'predictRiskyBatchesFlow',
    inputSchema: PredictRiskyBatchesInputSchema,
    outputSchema: PredictRiskyBatchesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
