// Summarize the performance of a delivery route, highlighting key metrics such as average temperature, time taken, and deviations from the planned route.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeRoutePerformanceInputSchema = z.object({
  routeData: z.string().describe('JSON string containing route data including checkpoints with timestamp, temperature, and GPS coordinates.'),
  plannedRoute: z.string().describe('Description of the planned route.'),
});
export type SummarizeRoutePerformanceInput = z.infer<typeof SummarizeRoutePerformanceInputSchema>;

const SummarizeRoutePerformanceOutputSchema = z.object({
  summary: z.string().describe('A summary of the route performance, including average temperature, time taken, and any deviations from the planned route.'),
});
export type SummarizeRoutePerformanceOutput = z.infer<typeof SummarizeRoutePerformanceOutputSchema>;

export async function summarizeRoutePerformance(input: SummarizeRoutePerformanceInput): Promise<SummarizeRoutePerformanceOutput> {
  return summarizeRoutePerformanceFlow(input);
}

const summarizeRoutePerformancePrompt = ai.definePrompt({
  name: 'summarizeRoutePerformancePrompt',
  input: {schema: SummarizeRoutePerformanceInputSchema},
  output: {schema: SummarizeRoutePerformanceOutputSchema},
  prompt: `You are an AI assistant specializing in supply chain analytics. You will receive route data and the planned route for a delivery. Analyze the data and provide a concise summary of the route performance, including key metrics such as average temperature, total time taken, and any significant deviations from the planned route.

Route Data: {{{routeData}}}
Planned Route: {{{plannedRoute}}}

Summary: `,
});

const summarizeRoutePerformanceFlow = ai.defineFlow(
  {
    name: 'summarizeRoutePerformanceFlow',
    inputSchema: SummarizeRoutePerformanceInputSchema,
    outputSchema: SummarizeRoutePerformanceOutputSchema,
  },
  async input => {
    const {output} = await summarizeRoutePerformancePrompt(input);
    return output!;
  }
);
