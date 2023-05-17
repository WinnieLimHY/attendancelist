function doGet() {
  var template = HtmlService.createTemplateFromFile('index');
  template.data = getTableData();
  return template.evaluate();
}

function getTableData() {
  var sheet = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/10EfSdCJGQnG_PNxq2E8Dc2GipTvG4CM04Zazf5Pmvdc/edit#gid=0').getSheetByName("UserList");
  var range = sheet.getRange("A:H");
  var values = range.getValues();
  var data = [];
  for (var i = 1; i < values.length; i++) {
    var row = values[i];
    if (row.some(function(cell) { return cell !== ''; })) { 
      var rowData = [];
      rowData.push(i); //push no为 first roll
      for (var j = 0; j < row.length; j++) {
        if (j == 7) {
          rowData.push("<img src='" + row[j] + "'/>");
        } else {
          rowData.push(row[j]);
        }
      }
      data.push(rowData);
    }
  }
  return data;
}

