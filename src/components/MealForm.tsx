"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { MealFormData, mealSchema } from "@/lib/meal.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMealStore } from "@/stores/mealstore";
import { toast } from "sonner";
import { Icons } from "./ui/icons";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export function MealForm({ onClose }: { onClose: () => void }) {
  const [isLoading, setIsLoading] = useState(false);
  const { setResult, addToHistory } = useMealStore((state) => state);
  /* //Api is not giving proper response
   const [searchQuery, setSearchQuery] = useState("");
   const [isSearching, setIsSearching] = useState(false);
   const [suggestions, setSuggestions] = useState<Array<{description: string, fdcId: string}>>([]);
   const [selectedDish, setSelectedDish] = useState<{description: string, fdcId: string} | null>(null);
   const foodApiKey = process.env.NEXT_PUBLIC_FOOD_API_KEY; 
  */
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MealFormData>({
    resolver: zodResolver(mealSchema),
    defaultValues: {
      servings: 1,
      dishName: "",
    },
  });

  const onSubmit = async (data: MealFormData) => {
    if (!data.dishName) {
      // toast.error("Please select a dish from the suggestions");
      toast.error("Please Enter the dish name!");
      return;
    }
    // if (!selectedDish) {
    //   toast.error("Please select a dish from the suggestions");
    //   return;
    // }
    setIsLoading(true);
    try {
      const response = await api.post("/get-calories", {
        // dish_name: selectedDish.description,
        dish_name: data.dishName?.trim()?.toLowerCase(),
        servings: data.servings,
      });

      if (response.data) {
        const newResult = {
          dishName: response.data.dish_name,
          servings: response.data.servings,
          caloriesPerServing: response.data.calories_per_serving,
          totalCalories: response.data.total_calories,
          dataSource: response.data.source || "API",
        };

        // Save to auth store
        addToHistory(newResult);
        setResult(newResult);
        toast.success("Meal calculated successfully!");
        reset(); // reset after successfully
        onClose();
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Failed to calculate meal";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  /* const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
     // Clear selected dish if user starts typing again
     if (selectedDish && value !== selectedDish.description) {
       setSelectedDish(null);
     }
  };

  const handleSelectDish = (suggestion: {description: string, fdcId: string}) => {
    setSelectedDish(suggestion);
    setSearchQuery(suggestion.description);
    setSuggestions([]);
  };
  
  // Debounce search effect
  useEffect(() => {
     if (!searchQuery.trim()) {
       setSuggestions([]);
       return;
     }

     const timerId = setTimeout(async () => {
       setIsSearching(true);
       try {
         const response = await fetch(
           `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${foodApiKey}&query=${encodeURIComponent(searchQuery)}&pageSize=5`
         );
         const data = await response.json();
         setSuggestions(
           data.foods?.map((food: any) => ({
             description: food.description,
             fdcId: food.fdcId
           })) || []
         );
       } catch (error) {
         console.error("Error fetching food suggestions:", error);
         toast.error("Failed to fetch food suggestions");
         setSuggestions([]);
       } finally {
         setIsSearching(false);
       }
     }, 300); // 300ms delay

    return () => clearTimeout(timerId);
  }, [searchQuery, foodApiKey]);
  */
  return (
    <div className="border-0 shadow-none">
      <div className="flex flex-col gap-y-1">
        <div className="flex items-center justify-center">
          <div className="p-3 rounded-full bg-primary/10">
            <Icons.utensils className="h-6 w-6 text-primary" />
          </div>
        </div>
        <h1 className="text-center text-2xl">Calculate Meal Calories</h1>
        <p className="text-center text-sm">
          Enter your meal details to get nutritional information
        </p>
      </div>

      <div className="flex flex-col my-6 gap-y-3">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="dishName">Dish Name</Label>
            <div className="relative">
              <Input
                id="dishName"
                placeholder="Search for a dish..."
                // value={searchQuery}
                // onChange={handleInputChange}
                className="pl-10"
                disabled={isLoading}
                {...register("dishName")}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icons.chefHat className="h-4 w-4 text-muted-foreground" />
              </div>

              {/* {isSearching && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <Icons.spinner className="h-4 w-4 animate-spin text-muted-foreground" />
                </div>
              )} */}

              {/* Suggestions dropdown */}
              {/* {!selectedDish && searchQuery && !isSearching && (
                <p className="text-sm text-muted-foreground mt-1">
                  {suggestions.length === 0 && "No results found"}
                </p>
              )}
              {suggestions.length > 0 && !selectedDish && (
                <div className="absolute z-10 mt-1 w-full rounded-md border bg-popover shadow-lg">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={suggestion.fdcId}
                      className="cursor-pointer px-4 py-2 hover:bg-accent"
                      onClick={() => handleSelectDish(suggestion)}
                    >
                      {suggestion.description}
                    </div>
                  ))}
                </div>
              )} */}
            </div>
          </div>

          <div className="space-y-4">
            <Label htmlFor="servings">Servings: </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icons.serving className="h-4 w-4 text-muted-foreground" />
              </div>
              <Input
                type="number"
                id="servings"
                placeholder="2"
                max={50}
                min={1}
                {...register("servings", { valueAsNumber: true })}
                disabled={isLoading}
                className={`mt-1 block w-full p-2 border pl-9 ${
                  errors.servings ? "border-red-300" : "border-gray-300"
                } rounded shadow-sm focus:border-blue-500 focus:ring-blue-500`}
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            // disabled={isLoading || isSearching || !selectedDish}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                Calculating...
              </>
            ) : (
              <>Calculate</>
            )}
          </Button>
        </form>
      </div>

      <div className="flex justify-center my-4">
        <p className="text-xs text-muted-foreground text-center">
          We'll analyze your meal and provide detailed nutritional information.
        </p>
      </div>
    </div>
  );
}
