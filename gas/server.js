// Global Variable
const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1wofshc1cvejdoHHZe4KhaAGm9NPgzv9Scwm51XNHTBM/edit?gid=0#gid=0";

// get meeting rooms table
function getMeetingRoomsTable() {
  const ss = SpreadsheetApp.openByUrl(SHEET_URL);
  const table = ss.getSheetByName(MEETINGROOMS_SHEET_NAME);
  return table;
}

// get meeting booking table
function getBookingsTable() {
  const ss = SpreadsheetApp.openByUrl(SHEET_URL);
  const table = ss.getSheetByName(BOOKINGS_SHEET_NAME);
  return table;
}

// Helper: Format data to JSON
function formatDataToJson(sheetName, data) {
  let table;
  if (sheetName === MEETINGROOMS_SHEET_NAME) table = getMeetingRoomsTable();
  if (sheetName === BOOKINGS_SHEET_NAME) table = getBookingsTable();

  const headers = table.getRange(1, 1, 1, table.getLastColumn()).getValues();
  const headerValues = headers[0];

  const allData = data.map((row) => {
    const subData = {};
    headerValues.forEach((header, i) => {
      subData[header] = row[i];
    });
    return subData;
  });

  return allData;
}

/**
 * Helper: Get row by column value
 * for get data
 */
function getRowByColumnValue(sheetName, columnValue, columnName) {
  let table;
  if (sheetName === MEETINGROOMS_SHEET_NAME) table = getMeetingRoomsTable();
  if (sheetName === BOOKINGS_SHEET_NAME)
    table = getBookingsTable();

  const dataValues = table.getDataRange().getValues();
  const headers = dataValues[0];
  const columnIndex = headers.indexOf(columnName);

  if (columnIndex !== 0) return null;

  for (let i = 1; i < dataValues.length; i++) {
    if (dataValues[i][columnIndex] === columnValue) {
      return i + 1;
    }
  }

  return null;
}
