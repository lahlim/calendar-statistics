export const time_convert = (min: number) => {
    var hours = Math.floor(min / 60);
    var minutes = min % 60;
    return { hours, minutes };
};

export const datesAreOnSameDay = (first: Date, second: Date) =>
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate();
