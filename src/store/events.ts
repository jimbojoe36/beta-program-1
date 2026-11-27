import {create} from 'zustand'
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";


export type CalendarEvent = {
    id: string;
    date: string;
    title: string;
    location?: string;
    activityType?: string;
    start: string;
    end: string;
    description?: string;
    allDay: boolean;
    recommended?: boolean; 
}

type EventsState = {
    events: CalendarEvent[];
    addEvent: (e: Omit<CalendarEvent, "id">) => void;
    updateEvent: (id: string, changes: Partial<Omit<CalendarEvent, "id">>) => void;
    deleteEvent: (id: string) => void; 
    acceptRecommendation: (id: string) => void;
    declineRecommendation: (id: string) => void;
}; 

export const useEvents = create<EventsState>()(
    persist(
    (set) => ({
    events: [], 
    addEvent: (e) =>
        set((s) => ({events: [...s.events, {...e, id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}` }]})),
    
    updateEvent: (id, changes) => 
        set((s) => ({
        events: s.events.map((e) => (e.id === id ? {...e, ...changes } : e)),
    })),
    deleteEvent: (id) => 
        set((s) => ({events: s.events.filter((e) => e.id !== id)}))
    ,

    acceptRecommendation: (id: string) =>
    set((s) => ({
        events: s.events.map((e) => (e.id === id ? { ...e, recommended: false } : e)),

    })),
    declineRecommendation: (id: string) =>
        set((s) => ({ events: s.events.filter((e) => e.id !== id) })),
}),
    {
        name: "events-storage2", 
        storage: createJSONStorage(() => AsyncStorage),
        partialize: (s) => ({events: s.events}),
    }
    
)   
);
