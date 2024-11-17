export function getNearest15MinuteInterval(date: Date): string {
    const roundedDate = roundToNearest15Minutes(date)
    const currentHours = roundedDate.getHours();
    const currentMinutes = date.getMinutes();

    const ampm = currentHours >= 12 ? "PM" : "AM";
    const formattedHours = currentHours % 12 || 12;
    const formattedMinutes = (currentMinutes % 60).toString().padStart(2, "0");

    return `${formattedHours}:${formattedMinutes} ${ampm}`;
}

export function roundToNearest15Minutes(date: Date) {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const roundedMinutes = Math.round(minutes / 15) * 15;

    if (roundedMinutes === 60) {
        hours = (hours + 1) % 24;
    }

    const newDate = new Date(date);
    newDate.setMinutes(roundedMinutes);
    newDate.setSeconds(0);
    newDate.setMilliseconds(0);

    return newDate;
}
export function setTimeOnDate(date: Date, time: string): Date {
    const [timePart, ampm] = time.split(" ");
    const [hours, minutes] = timePart.split(":");
    let hour = parseInt(hours);

    if (ampm === "PM" && hour !== 12) {
        hour += 12;
    } else if (ampm === "AM" && hour === 12) {
        hour = 0;
    }

    const newDate = new Date(date.getTime());
    newDate.setHours(hour, parseInt(minutes));
    return newDate;
}