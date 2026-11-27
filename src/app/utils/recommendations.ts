import type { CalendarEvent } from "@/store/events";

export const day_start = "07:00"; 
export const day_end = "22:00"; 

const min_gap = 30;
const max_suggestions = 4;

const suggestions = [
    { title: "Reading", activityType: "Leisure", minutes: 60 },
    { title: "Walk", activityType: "Exercise", minutes: 30 },
    { title: "Study", activityType: "Study", minutes: 90 },
    { title: "Stretching", activityType: "Exercise", minutes: 30 },
    { title: "Swimming", activityType: "Exercise", minutes: 60 }, 
    { title: "Chores", activityType: "Productivity", minutes: 30}, 
    { title: "Homework", activityType: "Productivity", minutes: 90}, 
    { title: "Drawing", activityType: "Leisure", minutes: 60}
];

const toMin = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
};

const toHHMM = (totalMinutes: number): string => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}`;
};

export function buildRecommendations(
    dayEvents: CalendarEvent[],
    date: string
): Omit<CalendarEvent, "id">[] {

    const busy = dayEvents
    .filter((e) => !e.recommended && !e.allDay)
    .sort((a, b) => a.start.localeCompare(b.start));

    const dayEnd = toMin(day_end);
    let cursor = toMin(day_start);
    const gaps: [number, number][] = [];

     for (const e of busy) {
        const gapEnd = Math.min(toMin(e.start), dayEnd);
        if (gapEnd - cursor >= min_gap) {
            gaps.push([cursor, gapEnd]);
        } 
        cursor = Math.max(cursor, toMin(e.end));
    }
    if (dayEnd - cursor >= min_gap) {
        gaps.push([cursor, dayEnd]);
    } 

    return gaps.slice(0, max_suggestions).map(([from, to], i) => {
        const gapLength = to - from;
        const validSuggestions = suggestions.filter((e) => e.minutes <= gapLength);
        const s = validSuggestions[Math.floor(Math.random() * validSuggestions.length)];

        const length = Math.min(s.minutes, to - from);
        return {
            date,
            title: s.title,
            activityType: s.activityType,
            location: "",
            description: "",
            start: toHHMM(from),
            end: toHHMM(from + length),
            allDay: false,
            recommended: true,
        };
    });
}