import ExcelJS from 'exceljs';


const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet('Logging in siberia');

worksheet.columns = [
    { header: 'WorkItem', key: 'workItem', width: 20, },
    { header: 'Date', key: 'date', width: 10, },
    { header: 'Start', key: 'start', width: 10 },
    { header: 'End', key: 'end', width: 10 },
    { header: 'Hours', key: 'hours', width: 10, },
    { header: 'Person', key: 'person', width: 20, },
    { header: 'Comment', key: 'comment', width: 10, },
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
            worksheet.addRow({
                workItem: parseWorkItemNumber(event.summary),
                date: event.date,
                hours: durationToHours(event.duration),
                comment: event.comment,
                start: event.start,
                end: event.end,
                person: "Lassi Mustonen"
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

    worksheet.eachRow(function (row, rowNumber) {
        console.log('Row ' + rowNumber + ' = ' + JSON.stringify(row.values));
    });
    await workbook.xlsx.writeFile("testfile.xlsx");
};
