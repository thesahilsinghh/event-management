export default function generateSeats(rows = 10, cols = 12) {
    const seatMap = [];
    for (let r = 0; r < rows; r++) {
        const rowLetter = String.fromCharCode(65 + r);
        for (let c = 1; c <= cols; c++) {
            seatMap.push({
                row: rowLetter.trim(),
                number: c,
                isBooked: false
            });
        }
    }
    return seatMap;
}
