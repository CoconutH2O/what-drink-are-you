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
    
    // Check if this is a stats request
    if (data.action === 'stats') {
      return getResultStats();
    }
    
    // Otherwise, save to sheet (normal game submission)
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

// Handle OPTIONS preflight requests for CORS
function doOptions(e) {
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT);
}

// Handle GET requests (for testing and stats)
function doGet(e) {
  // Check if requesting stats
  if (e && e.parameter && e.parameter.action === 'stats') {
    return getResultStats();
  }
  
  return ContentService
    .createTextOutput(JSON.stringify({ 
      status: 'ok', 
      message: 'Adventure Game Data Collector is running!' 
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Get result statistics
function getResultStats() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('Responses');
    
    if (!sheet) {
      return ContentService
        .createTextOutput(JSON.stringify({ success: true, stats: {}, total: 0 }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    const data = sheet.getDataRange().getValues();
    const resultColumn = 4; // Column E (0-indexed: 4) = Result (Drink)
    
    // Count each result (skip header row)
    const counts = {};
    let total = 0;
    
    for (let i = 1; i < data.length; i++) {
      const result = data[i][resultColumn];
      if (result) {
        counts[result] = (counts[result] || 0) + 1;
        total++;
      }
    }
    
    // Calculate percentages
    const stats = {};
    for (const [drink, count] of Object.entries(counts)) {
      stats[drink] = {
        count: count,
        percentage: total > 0 ? Math.round((count / total) * 100 * 10) / 10 : 0
      };
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, stats: stats, total: total }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
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
      'Result (Drink)',
      'Style (Plan↔Spontaneous)',
      'Risk (Safety↔Growth)',
      'Value Focus (Tangible↔Experience)',
      'Integration (Separate↔Shared)',
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
    data.values?.style || 0,
    data.values?.risk || 0,
    data.values?.valueFocus || 0,
    data.values?.integration || 0,
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
      style: 5, 
      risk: 4, 
      valueFocus: 3, 
      integration: 6 
    },
    choices: [
      { scene: 'start', choice: 1, text: 'Surprise me!' },
      { scene: 'surprise', choice: 0, text: 'Experimental' }
    ],
    result: 'boba',
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
    'Result (Drink)',
    'Style (Plan↔Spontaneous)',
    'Risk (Safety↔Growth)',
    'Value Focus (Tangible↔Experience)',
    'Integration (Separate↔Shared)',
    'Choices Path',
    'User Agent'
  ];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  sheet.setFrozenRows(1);
  
  Logger.log('✅ Responses sheet created with headers!');
}
