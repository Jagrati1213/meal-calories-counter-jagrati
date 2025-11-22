'use client';
import { AuthRoute } from '@/components/AuthRoute';
import { MealForm } from '@/components/MealForm';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { useMealStore } from '@/stores/mealstore';
import { Dialog, DialogContent, DialogTitle, DialogHeader } from '@/components/ui/dialog';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { useState } from 'react';

export default function Dashboard() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const history = useMealStore((state) => state.history);
    
  return (
  <AuthRoute>
      <div className="min-h-screen bg-background text-foreground">
        <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0 space-y-6">
            <div className="flex justify-end items-center">
              <Button onClick={() => setIsFormOpen(true)}>
                <Icons.add className="mr-2 h-4 w-4 hidden md:block" />
                Add Meal
              </Button>
            </div>

            {/* History Section */}
            <div className="bg-card text-card-foreground rounded-lg border shadow-sm">
              <div className="p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold mb-2">Meal History</h2>
                {history.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    No meals tracked yet. Add your first meal!
                  </p>
                ) : (
                 <ScrollArea className="h-[calc(100vh-250px)] sm:h-[500px] -mx-2 sm:-mx-6 px-2 sm:px-6">
                    <div className="space-y-4 pb-2">
                      {history.map((meal, index) => (
                        <div 
                          key={index} 
                          className="p-3 sm:p-4 border rounded-lg hover:bg-accent/30 transition-colors">
                          <div className="space-y-2 sm:space-y-3">
                            {/* First row: Name and Servings */}
                            <div className="flex flex-col md:flex-row justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <Icons.utensils className="h-4 w-4 text-primary flex-shrink-0" />
                                <h3 className="font-medium text-sm sm:text-base line-clamp-1">
                                  {meal.dishName}
                                </h3>
                              </div>
                              <div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground bg-muted/50 px-2 py-1 rounded-md self-start xs:self-auto">
                                <Icons.serving className="h-3 w-3 sm:h-4 sm:w-4" />
                                <span>{meal.servings} {meal.servings === 1 ? 'serving' : 'servings'}</span>
                              </div>
                            </div>
                            {/* Second row: Calories */}
                            <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-xs sm:text-sm text-muted-foreground">
                                  {meal.caloriesPerServing} kcal/serving
                                </span>
                                <span className="text-muted-foreground/50 hidden xs:inline">•</span>
                                <span className="text-xs sm:text-sm font-medium text-primary">
                                  {meal.totalCalories} kcal total
                                </span>
                              </div>
                              
                              {/* Data source tooltip */}
                              <div className="group relative self-end xs:self-auto">
                                <Icons.info className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground hover:text-foreground cursor-pointer" />
                                <div className="absolute right-0 mt-1 sm:mt-2 w-40 sm:w-48 p-2 text-xs bg-popover text-popover-foreground border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                  Source: {meal.dataSource}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                )}
              </div>
            </div>
          </div>
        </main>

        {/* Meal Form Dialog */}
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogContent className="max-w-[330px] sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle></DialogTitle>
            </DialogHeader>
            <MealForm  onClose={() => setIsFormOpen(false)}/>
          </DialogContent>
        </Dialog>
      </div>
  </AuthRoute>
  );
}