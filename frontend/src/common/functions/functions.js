export const formatSecondsToHHmm = (_seconds, showSeconds = false) => {
    const hours = Math.floor(_seconds / 3600);
    const minutes = Math.floor((_seconds % 3600) / 60);
    const seconds = _seconds % 60;

    const HHmm = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
    const ss = `${String(seconds).padStart(2, '0')}`

    return `${HHmm}${showSeconds ? ":"+ss : "" }`;
};

export const formatDateToDDMMYYYY = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // `getMonth()` je 0-based
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
};
