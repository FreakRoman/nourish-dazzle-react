import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { initialActivities, initialCustomers, initialMessages, initialNotes, initialPlans, initialCoaches, mealTemplates } from "../data/appData";

const STORAGE_KEY = "yukthaahara_demo_data_v1";
const AppDataContext = createContext(null);

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (error) {
    console.warn("Unable to load demo data", error);
  }
  return { coaches: initialCoaches, customers: initialCustomers, plans: initialPlans, activities: initialActivities, notes: initialNotes, messages: initialMessages, meals: mealTemplates };
}

export function AppDataProvider({ children }) {
  const [data, setData] = useState(loadState);
  const [toast, setToast] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const notify = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2400);
  };

  const getCustomer = (id) => data.customers.find((c) => c.id === Number(id));
  const getCoach = (id) => data.coaches.find((c) => c.id === Number(id));
  const getCustomerPlan = (customerId) => data.plans.find((p) => p.customerId === Number(customerId));

  const addCoach = ({ name, email, specialization, phone }) => {
    const id = Math.max(0, ...data.coaches.map((c) => c.id)) + 1;
    const coach = { id, userId: 1000 + id, name, email, specialization, phone, status: "Active", customers: 0, rating: 5.0 };
    setData((prev) => ({ ...prev, coaches: [...prev.coaches, coach] }));
    notify(`${name} added as a coach.`);
    return coach;
  };

  const addCustomer = ({ name, email, phone, coachId, goal }) => {
    const id = Math.max(100, ...data.customers.map((c) => c.id)) + 1;
    const customer = { id, userId: 1000 + id, name, email, phone, coachId: Number(coachId) || data.coaches[0]?.id || null, age: 28, height: 170, weight: 72, targetWeight: 66, goal: goal || "General Wellness", progress: 0, status: "New", joined: new Date().toISOString().slice(0, 10), streak: 0, water: 0, waterGoal: 8, steps: 0, stepsGoal: 8000, workout: false };
    setData((prev) => ({ ...prev, customers: [...prev.customers, customer] }));
    notify(`${name} added as a customer.`);
    return customer;
  };

  const assignCoach = (customerId, coachId) => {
    setData((prev) => {
      const customers = prev.customers.map((c) => c.id === Number(customerId) ? { ...c, coachId: Number(coachId) } : c);
      const coaches = prev.coaches.map((coach) => ({ ...coach, customers: customers.filter((c) => c.coachId === coach.id).length }));
      return { ...prev, customers, coaches };
    });
    notify("Coach assignment updated.");
  };

  const updateCustomer = (customerId, patch) => {
    setData((prev) => ({ ...prev, customers: prev.customers.map((c) => c.id === Number(customerId) ? { ...c, ...patch } : c) }));
  };

  const toggleMeal = (customerId, mealId) => {
    const key = `meals_${customerId}`;
    setData((prev) => {
      const current = prev[key] || [];
      const next = current.includes(mealId) ? current.filter((id) => id !== mealId) : [...current, mealId];
      return { ...prev, [key]: next };
    });
  };

  const completedMeals = (customerId) => data[`meals_${customerId}`] || [];

  const logActivity = (customerId, entry) => {
    const activity = { id: Date.now(), customerId: Number(customerId), date: new Date().toISOString().slice(0, 10), ...entry };
    setData((prev) => ({ ...prev, activities: [activity, ...prev.activities], customers: prev.customers.map((c) => c.id === Number(customerId) ? { ...c, weight: Number(entry.weight) || c.weight, water: Number(entry.water) || c.water, steps: Number(entry.steps) || c.steps, workout: Boolean(entry.workout) } : c) }));
    notify("Today's activity has been saved.");
  };

  const addNote = (customerId, coachId, text) => {
    if (!text.trim()) return;
    const note = { id: Date.now(), customerId: Number(customerId), coachId: Number(coachId), text: text.trim(), date: new Date().toISOString().slice(0, 10) };
    setData((prev) => ({ ...prev, notes: [note, ...prev.notes] }));
    notify("Coach note added.");
  };

  const savePlan = (customerId, coachId, patch) => {
    setData((prev) => {
      const existing = prev.plans.find((p) => p.customerId === Number(customerId));
      if (existing) {
        return { ...prev, plans: prev.plans.map((p) => p.id === existing.id ? { ...p, ...patch, coachId: Number(coachId) } : p) };
      }
      const plan = { id: Date.now(), customerId: Number(customerId), coachId: Number(coachId), name: patch.name || "Custom Plan", calories: Number(patch.calories) || 2000, protein: Number(patch.protein) || 120, carbs: Number(patch.carbs) || 220, fat: Number(patch.fat) || 60, startDate: new Date().toISOString().slice(0, 10), endDate: "2026-09-30", status: "Active" };
      return { ...prev, plans: [plan, ...prev.plans] };
    });
    notify("Nutrition plan saved.");
  };

  const sendMessage = (senderId, receiverId, text) => {
    if (!text.trim()) return;
    const message = { id: Date.now(), senderId: Number(senderId), receiverId: Number(receiverId), text: text.trim(), timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
    setData((prev) => ({ ...prev, messages: [...prev.messages, message] }));
  };

  const resetDemo = () => {
    const fresh = { coaches: initialCoaches, customers: initialCustomers, plans: initialPlans, activities: initialActivities, notes: initialNotes, messages: initialMessages, meals: mealTemplates };
    setData(fresh);
    localStorage.removeItem(STORAGE_KEY);
    notify("Demo data reset.");
  };

  const value = useMemo(() => ({ data, toast, getCustomer, getCoach, getCustomerPlan, addCoach, addCustomer, assignCoach, updateCustomer, toggleMeal, completedMeals, logActivity, addNote, savePlan, sendMessage, resetDemo }), [data, toast]);
  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  const context = useContext(AppDataContext);
  if (!context) throw new Error("useAppData must be used inside AppDataProvider");
  return context;
}
