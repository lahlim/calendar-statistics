import ExcelJS from 'exceljs';
import { mirror_v1 } from 'googleapis';


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

    events.forEach(event => {
        worksheet.addRow({
            workItem: event.summary,
            date: event.date,
            hours: durationToMinutes(event.duration),
            comment: event.comment,
            start: event.start,
            end: event.end,
            person: "Lassi Mustonen"
        });
    });
    write();

};

const durationToMinutes = (duration: { hours: number, minutes: number; }) => {
    return (duration.hours * 60 + duration.minutes);
};






const write = async () => {

    worksheet.eachRow(function (row, rowNumber) {
        console.log('Row ' + rowNumber + ' = ' + JSON.stringify(row.values));
    });
    await workbook.xlsx.writeFile("testfile.xlsx");
};
