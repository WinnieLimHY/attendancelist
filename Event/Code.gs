function doGet(request) {
  return HtmlService.createTemplateFromFile('index').evaluate();
}

function include(filename){
  return HtmlService.createHtmlOutputFromFile(filename).getContent(); 
}

function processForm(formObject){
  var url="/Paste your google sheets url at here/";
  var ss=SpreadsheetApp.openByUrl(url);
  var ws=ss.getSheetByName("/Enter your sheet name/");
  var qrCodeUrl = "https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=" + formObject.phoneno;

  ws.appendRow([
    formObject.phoneno,
    formObject.firstname,
    formObject.lastname,
    formObject.lastname + " " + formObject.firstname,
    formObject.table,
    formObject.inputCategory,
    formObject.desc,
    qrCodeUrl
  ]);
}

function onEdit(e) {
    var sheetName = 'AttendanceList';
  var colToWatch = 1;
  var colToStamp = 2;
  var colToStamp2 = 3; 
  if (e.range.columnStart !== colToWatch || e.source.getActiveSheet().getName() !== sheetName) return;
  var writeVal = e.value ? new Date() : '';
  var writeVal2 = e.value ? new Date().toLocaleTimeString() : ''; 
  var range = e.source.getActiveSheet().getRange(e.range.rowStart, colToStamp);
  range.setValue(writeVal);
  range.offset(0, 1).setValue(writeVal2); 

  var sheet1 = 'AttendanceList';
  var sheet2 = 'UserList';
  var colToWatch = 1;
  var colToFill = [4, 5, 6, 7];

  if (e.source.getActiveSheet().getName() == sheet1 && e.range.getColumn() == colToWatch) {
    var editedValue = e.value;
    var sheet2Values = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheet2).getDataRange().getValues();

    for (var i = 0; i < sheet2Values.length; i++) {
      if (sheet2Values[i][0] == editedValue) {
        for (var j = 0; j < colToFill.length; j++) {
          var column = colToFill[j];
          var newValue = sheet2Values[i][column - 1];
          e.range.offset(0, column - colToWatch).setValue(newValue);
        }
        break;
      }
    }
  }
}

