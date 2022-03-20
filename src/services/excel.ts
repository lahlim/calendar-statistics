import ExcelJS from 'exceljs';
import { DateTime } from 'luxon';


const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet('Logging in siberia');

worksheet.columns = [
    { header: 'Username / Login', key: 'person', width: 20, },
    { header: 'WorkItem', key: 'workItem', width: 10, },
    { header: 'Comment', key: 'comment', width: 15, },
    { header: 'Start Date', key: 'date', width: 10, },
    { header: 'Start time', key: 'start', width: 10 },
    { header: 'End time', key: 'end', width: 10 },
];


interface FormattedEvent {
    workItem: string;
    date: Date;
    summary: string;
    duration: { hours: number, minutes: number; };
    comment: string,
    start: string,
    end: string,
    person: string;
}


export const addRows = (events: FormattedEvent[]) => {
    let sorted: FormattedEvent[] = events.sort((a: FormattedEvent, b: FormattedEvent) => (a.start > b.start) ? 1 : ((b.start > a.start) ? -1 : 0));
    sorted = events.sort((a: FormattedEvent, b: FormattedEvent) => (a.date < b.date) ? 1 : ((b.date < a.date) ? -1 : 0));

    try {
        sorted.forEach(event => {
            const date = DateTime.fromFormat(`${event.date}`, 'dd.MM.yyyy');
            const start = DateTime.fromISO(`${event.start}`);
            const end = DateTime.fromISO(`${event.end}`);
            worksheet.addRow({
                person: "Lassi Mustonen",
                workItem: parseWorkItemNumber(event.summary),
                date: date.toFormat('M/d/yyyy'),
                comment: event.comment,
                start: start.toFormat("h:mm a"),
                end: end.toFormat("h:mm a"),
            });
        });
        write();
    } catch (error) {
        console.log(error);
    }


};

const parseWorkItemNumber = (summary: string) => {
    if (summary.toLowerCase() === "lounas") return summary.toLowerCase();
    const items = summary.split("-");
    return items[1];
};

const durationToHours = (duration: { hours: number, minutes: number; }) => {
    return duration.hours + duration.minutes / 60;
};

const write = async () => {
    try {
        await workbook.xlsx.writeFile("output.xlsx");
    } catch (err) {
        console.log(err);
    }
};
