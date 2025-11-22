# CalorieTrack - Meal & Nutrition Tracker

A modern web application to track your meals, monitor calorie intake, and achieve your health goals with an intuitive interface.
live link: https://meal-calories-counter-jagrati.vercel.app/
## 🚀 Features

- **Meal Tracking**: Log your daily meals and snacks
- **Calorie Counting**: Track your daily calorie intake
- **Nutrition Insights**: View detailed nutritional information
- **Responsive Design**: Works on all devices
- **Dark/Light Mode**: Built-in theme support
- **User Authentication**: Secure signup and login

## 🔧 Technologies Used

- **Frontend**: Next.js 14, TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **UI Components**: Shadcn/ui

## 🛠️ Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Jagrati1213/meal-calories-counter-jagrati.git
   cd calorietrack
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn
   # or
   pnpm install
   ```

3. Create a `.env.local` file in the root directory and add your environment variables:

   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
   # Note: The project includes integration with a food search API that is currently disabled
   # NEXT_PUBLIC_FOOD_API_KEY=your_api_key_here
   ```

4. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎯 Project Structure

```
src/
├── app/                  # App router
│   ├── api/              # API routes
│   ├── dashboard/        # Dashboard page
│   ├── login/            # Login page
│   └── register/         # Registration page
├── components/           # Reusable components
│   ├── ui/               # Shadcn/ui components
│   ├── AuthForm.tsx      # Authentication form
│   ├── Header.tsx        # Navigation header
│   └── MealForm.tsx      # Meal input form
├── lib/                  # Utility functions
│   ├── api.ts            # API client
│   └── meal.schema.ts    # Form validation schemas
└── stores/               # State management
    ├── authStore.ts      # Authentication state
    └── mealStore.ts      # Meal tracking state
```

## 🚨 Note About Food Search API

## The application was initially designed to integrate with a food search API for automatic calorie calculation. However, due to API limitations and reliability issues, this feature has been temporarily disabled. The code for this functionality has been commented out but remains in the codebase for future reference. Users can still manually enter their meal information.

### Screenshot:
<img width="1533" height="935" alt="image" src="https://github.com/user-attachments/assets/b5356bf9-c4d4-4b1c-b4db-ece48e5d79c6" />
<img width="1510" height="942" alt="image" src="https://github.com/user-attachments/assets/00a2513b-9f31-4753-a777-4210ce69b11e" />
<img width="1477" height="942" alt="image" src="https://github.com/user-attachments/assets/c0f29533-d2ab-460e-9849-98b605db1709" />
<img width="1561" height="939" alt="image" src="https://github.com/user-attachments/assets/64a4094c-f569-40a7-af9c-bbf3fb09b2ee" />

Made with ❤️ by [Jagrati]
