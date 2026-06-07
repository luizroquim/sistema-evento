// src/utils/scoreCalculator.ts

// Definimos o que a função espera receber
interface Criterion {
  id: string;
  weight: number;
}

export function calculateWeightedGrade(
  scores: Record<string, string>, 
  criteria: Criterion[]
) {
  let totalScore = 0;
  let totalWeight = 0;
  let filledCount = 0;

  criteria.forEach(crit => {
    const val = scores[crit.id];
    
    if (val && !isNaN(Number(val))) {
      totalScore += Number(val) * crit.weight;
      totalWeight += crit.weight;
      filledCount++;
    }
  });

  const isComplete = filledCount === criteria.length && criteria.length > 0;
  const average = totalWeight > 0 ? (totalScore / totalWeight).toFixed(2) : '0.00';

  return { 
    isComplete, 
    average 
  };
}