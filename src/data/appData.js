export const initialCoaches = [
  { id: 1, userId: 2, name: "Priya Sharma", email: "coach@nourish.com", specialization: "Weight Management", phone: "+91 98765 43210", status: "Active", customers: 18, rating: 4.9 },
  { id: 2, userId: 4, name: "Rahul Mehta", email: "rahul@nourish.com", specialization: "Sports Nutrition", phone: "+91 98765 12345", status: "Active", customers: 14, rating: 4.8 },
  { id: 3, userId: 5, name: "Ananya Rao", email: "ananya@nourish.com", specialization: "Women's Wellness", phone: "+91 99887 11223", status: "Active", customers: 21, rating: 4.9 },
];

export const initialCustomers = [
  { id: 101, userId: 3, name: "Siva Reddy", email: "customer@nourish.com", phone: "+91 98765 44444", coachId: 1, age: 25, height: 175, weight: 78, targetWeight: 70, goal: "Weight Loss", progress: 72, status: "On Track", joined: "2026-06-14", streak: 12, water: 6, waterGoal: 8, steps: 6842, stepsGoal: 8000, workout: true },
  { id: 102, userId: 6, name: "Arjun Kumar", email: "arjun@nourish.com", phone: "+91 98765 12121", coachId: 1, age: 29, height: 180, weight: 91, targetWeight: 82, goal: "Weight Loss", progress: 54, status: "Needs Attention", joined: "2026-05-23", streak: 5, water: 4, waterGoal: 8, steps: 4210, stepsGoal: 8000, workout: false },
  { id: 103, userId: 7, name: "Sneha Reddy", email: "sneha@nourish.com", phone: "+91 99887 11222", coachId: 2, age: 27, height: 165, weight: 64, targetWeight: 58, goal: "Fitness", progress: 81, status: "Excellent", joined: "2026-05-04", streak: 21, water: 7, waterGoal: 8, steps: 9245, stepsGoal: 8000, workout: true },
  { id: 104, userId: 8, name: "Vikram Singh", email: "vikram@nourish.com", phone: "+91 98888 22222", coachId: 2, age: 31, height: 176, weight: 84, targetWeight: 78, goal: "Recomposition", progress: 63, status: "On Track", joined: "2026-06-02", streak: 9, water: 5, waterGoal: 8, steps: 7320, stepsGoal: 9000, workout: true },
  { id: 105, userId: 9, name: "Meera Iyer", email: "meera@nourish.com", phone: "+91 99999 11111", coachId: 3, age: 34, height: 160, weight: 69, targetWeight: 62, goal: "Women's Wellness", progress: 44, status: "Needs Attention", joined: "2026-07-01", streak: 3, water: 3, waterGoal: 8, steps: 3800, stepsGoal: 7000, workout: false },
  { id: 106, userId: 10, name: "Aditya Rao", email: "aditya@nourish.com", phone: "+91 97777 33333", coachId: 3, age: 28, height: 178, weight: 76, targetWeight: 72, goal: "Performance", progress: 77, status: "Excellent", joined: "2026-05-18", streak: 17, water: 8, waterGoal: 8, steps: 10120, stepsGoal: 9000, workout: true },
];

export const initialPlans = [
  { id: 501, customerId: 101, coachId: 1, name: "Thrive 30-Day", calories: 2100, protein: 130, carbs: 235, fat: 62, startDate: "2026-07-25", endDate: "2026-08-24", status: "Active" },
  { id: 502, customerId: 102, coachId: 1, name: "Reset 14-Day", calories: 1900, protein: 115, carbs: 205, fat: 58, startDate: "2026-08-05", endDate: "2026-08-19", status: "Review" },
  { id: 503, customerId: 103, coachId: 2, name: "Performance Fuel", calories: 2300, protein: 145, carbs: 265, fat: 65, startDate: "2026-07-30", endDate: "2026-08-29", status: "Active" },
  { id: 504, customerId: 104, coachId: 2, name: "Balanced Recomp", calories: 2200, protein: 150, carbs: 220, fat: 70, startDate: "2026-08-02", endDate: "2026-09-01", status: "Active" },
  { id: 505, customerId: 105, coachId: 3, name: "Wellness Reset", calories: 1750, protein: 105, carbs: 185, fat: 55, startDate: "2026-08-01", endDate: "2026-08-28", status: "Review" },
  { id: 506, customerId: 106, coachId: 3, name: "Strength + Energy", calories: 2400, protein: 160, carbs: 270, fat: 68, startDate: "2026-07-28", endDate: "2026-08-27", status: "Active" },
];

export const mealTemplates = [
  { id: 1, type: "Breakfast", name: "Vegetable oats + 2 eggs", calories: 410, protein: 24, time: "08:00" },
  { id: 2, type: "Snack", name: "Greek yogurt + berries", calories: 190, protein: 15, time: "11:00" },
  { id: 3, type: "Lunch", name: "Rice, dal, grilled paneer & salad", calories: 560, protein: 29, time: "13:30" },
  { id: 4, type: "Snack", name: "Apple + peanut butter", calories: 220, protein: 7, time: "17:00" },
  { id: 5, type: "Dinner", name: "Roti + chicken curry + vegetables", calories: 590, protein: 36, time: "20:00" },
];

export const initialActivities = [
  { id: 1, customerId: 101, date: "2026-08-20", weight: 78, water: 6, steps: 6842, workout: true, calories: 1820, note: "Good energy today." },
  { id: 2, customerId: 101, date: "2026-08-19", weight: 78.3, water: 7, steps: 8120, workout: true, calories: 1940, note: "Completed planned meals." },
  { id: 3, customerId: 103, date: "2026-08-20", weight: 64, water: 7, steps: 9245, workout: true, calories: 2110, note: "Strong training session." },
];

export const initialNotes = [
  { id: 1, customerId: 101, coachId: 1, text: "Ask Siva to increase water to 8 glasses and keep dinner protein consistent.", date: "2026-08-20" },
  { id: 2, customerId: 102, coachId: 1, text: "Follow up on missed workouts this week.", date: "2026-08-19" },
  { id: 3, customerId: 103, coachId: 2, text: "Excellent adherence. Consider progressive calorie increase on training days.", date: "2026-08-20" },
];

export const initialMessages = [
  { id: 1, senderId: 2, receiverId: 3, text: "Good morning Siva! Keep your water goal in focus today 🌿", timestamp: "09:12" },
  { id: 2, senderId: 3, receiverId: 2, text: "Will do. I have my lunch prepped already.", timestamp: "09:21" },
];
