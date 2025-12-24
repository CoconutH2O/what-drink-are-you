/**
 * Google Apps Script for Adventure Game Data Collection
 * =====================================================
 * 
 * SETUP INSTRUCTIONS:
 * 
 * 1. Go to Google Sheets and create a new spreadsheet
 * 2. Go to Extensions > Apps Script
 * 3. Delete any existing code and paste this entire file
 * 4. Save the project (Ctrl+S / Cmd+S)
 * 5. Click "Deploy" > "New deployment"
 * 6. Select type: "Web app"
 * 7. Set "Execute as" to "Me"
 * 8. Set "Who has access" to "Anyone"
 * 9. Click "Deploy" and authorize when prompted
 * 10. Copy the Web App URL and paste it in your app.js CONFIG.GOOGLE_SCRIPT_URL
 * 
 * The script will automatically create headers on first submission.
 */

// Handle POST requests from the game
function doPost(e) {
  try {
    // Parse incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Save to sheet
    saveToSheet(data);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    Logger.log('Error in doPost: ' + error.toString());
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle GET requests (for testing)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ 
      status: 'ok', 
      message: 'Adventure Game Data Collector is running!' 
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Main function to save data to sheet
function saveToSheet(data) {
  // Get active spreadsheet and sheet
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('Responses');
  
  // Create sheet if it doesn't exist
  if (!sheet) {
    sheet = ss.insertSheet('Responses');
    // Add headers
    const headers = [
      'Timestamp',
      'Session ID',
      'Start Time',
      'End Time',
      'Result',
      'Risk Score',
      'Growth Score',
      'Stability Score',
      'Innovation Score',
      'Choices Path',
      'User Agent'
    ];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  
  // Format choices as a readable path
  let choicesPath = '';
  if (data.choices && Array.isArray(data.choices)) {
    choicesPath = data.choices.map(c => `${c.scene}[${c.choice}]`).join(' → ');
  }
  
  // Prepare row data
  const rowData = [
    new Date().toISOString(),
    data.sessionId || '',
    data.startTime || '',
    data.endTime || '',
    data.result || '',
    data.values?.risk || 0,
    data.values?.growth || 0,
    data.values?.stability || 0,
    data.values?.innovation || 0,
    choicesPath,
    data.userAgent || ''
  ];
  
  // Append the row
  sheet.appendRow(rowData);
  
  // Log for debugging
  Logger.log('Data saved: ' + JSON.stringify(data));
  
  return true;
}

/**
 * TEST FUNCTION - Run this directly in Apps Script to test
 * Go to Run > testDataInsertion
 */
function testDataInsertion() {
  // Create test data (simulating what the game sends)
  const testData = {
    sessionId: 'test_' + new Date().getTime(),
    startTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    values: { 
      risk: 5, 
      growth: 4, 
      stability: 3, 
      innovation: 6 
    },
    choices: [
      { scene: 'start', choice: 0, text: 'Mountain path' },
      { scene: 'mountain', choice: 1, text: 'Summit' }
    ],
    result: 'adventurer',
    userAgent: 'Test from Apps Script'
  };
  
  // Call saveToSheet directly (bypasses doPost)
  try {
    saveToSheet(testData);
    Logger.log('✅ Test successful! Check your Responses sheet.');
  } catch (error) {
    Logger.log('❌ Test failed: ' + error.toString());
  }
}

/**
 * Run this to manually create the Responses sheet with headers
 */
function createResponsesSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('Responses');
  
  if (sheet) {
    Logger.log('Responses sheet already exists!');
    return;
  }
  
  sheet = ss.insertSheet('Responses');
  const headers = [
    'Timestamp',
    'Session ID', 
    'Start Time',
    'End Time',
    'Result',
    'Risk Score',
    'Growth Score',
    'Stability Score',
    'Innovation Score',
    'Choices Path',
    'User Agent'
  ];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  sheet.setFrozenRows(1);
  
  Logger.log('✅ Responses sheet created with headers!');
}
