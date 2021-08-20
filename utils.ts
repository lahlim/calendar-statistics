// Gets start and end time of event and returns duration in minutes
const getEventDuration = (start:string, end:string) => {
    const [startTime] = start.split(" ");
    const [endTime] = end.split(" ");
    const startDate = new Date(startTime);
    const endDate   = new Date(endTime);
    const diff = Math.abs(startDate.valueOf() - endDate.valueOf());
    const minutes = Math.floor((diff/1000)/60);
    console.log(minutes);
    return minutes;
}


const dataToArray = () => {
    return "";
}

const addDuration = () => {
    return "";
}

export {getEventDuration, addDuration, dataToArray};