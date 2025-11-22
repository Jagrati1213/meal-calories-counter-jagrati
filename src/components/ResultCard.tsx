import { CalorieResult } from '@/types/calories';
import React from 'react';

export const ResultCard: React.FC<{ result: CalorieResult }> = ({ result }) => {
  return (
    <div className="mt-6 bg-blue-50 rounded-lg p-4">
      <h3 className="text-lg font-medium text-blue-800">Calorie Results</h3>
      <div className="mt-2 space-y-2">
        <p className="text-sm text-gray-700">
          <span className="font-medium">Dish:</span> {result.dishName}
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-medium">Servings:</span> {result.servings}
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-medium">Calories per serving:</span>{' '}
          {result.caloriesPerServing} kcal
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-medium">Total calories:</span>{' '}
          {result.totalCalories} kcal
        </p>
        <p className="text-xs text-gray-500 mt-2">
          Data source: {result.dataSource}
        </p>
      </div>
    </div>
  );
};