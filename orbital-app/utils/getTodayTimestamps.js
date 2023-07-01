export default function getTodayTimestamps(){
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const startOfDayTimestamp = startOfDay.getTime();

    const currentTimestamp = Date.now();

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    const endOfDayTimestamp = endOfDay.getTime();

    return {
        startOfDay: startOfDayTimestamp,
        current: currentTimestamp,
        endOfDay: endOfDayTimestamp
    };
};
