function doGet() {
  var template = HtmlService.createTemplateFromFile('index');
  template.data = getTableData();
  return template.evaluate();
}

function getTableData() {
  var sheet = SpreadsheetApp.openByUrl('/Paste your google sheets url at here/').getSheetByName("/Enter the sheet name/");
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

