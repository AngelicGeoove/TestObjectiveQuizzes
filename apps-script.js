/**
 * Google Apps Script for Quiz Leaderboard
 * This script handles GET and POST requests to manage quiz scores in Google Sheets
 */

function doGet(e) {
  // Handle GET requests - both leaderboard fetch and score submission
  try {
    // Get the first sheet explicitly (most common issue is wrong sheet selected)
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheets()[0]; // Get first sheet
    
    // Log incoming request for debugging
    console.log('doGet called with parameters:', e.parameter);
    console.log('Using sheet:', sheet.getName());
    console.log('Parameter keys:', Object.keys(e.parameter || {}));
    console.log('Action parameter:', e.parameter?.action);
    console.log('Has submit action?', e.parameter?.action === 'submit');
    
    // Check if this is a score submission
    if (e.parameter && (e.parameter.action === 'submit' || e.parameter.indexNumber)) {
      console.log('Processing score submission...');
      
      // Handle score submission via GET
      const data = e.parameter;
      console.log('Raw submission data:', data);
      console.log('All parameters received:', Object.keys(data));
      
      // Ensure data is properly typed
      const processedData = {
        indexNumber: String(data.indexNumber || ''),
        category: String(data.category || ''),
        correctAnswers: Number(data.correctAnswers) || 0,
        totalQuestions: Number(data.totalQuestions) || 0,
        percentage: Number(data.percentage) || 0,
        questionsAnswered: Number(data.questionsAnswered) || 0,
        date: String(data.date || ''),
        time: String(data.time || '')
      };
      
      console.log('Processed submission data:', processedData);
      
      // Validate required fields - be more lenient with validation
      const required = ['indexNumber', 'category'];
      const missing = [];
      for (let field of required) {
        if (!processedData[field] || processedData[field] === '') {
          missing.push(field);
        }
      }
      
      if (missing.length > 0) {
        const errorMsg = `Missing required fields: ${missing.join(', ')}. Received: ${JSON.stringify(data)}`;
        console.log('Validation error:', errorMsg);
        throw new Error(errorMsg);
      }
      
      console.log('Validation passed, adding to sheet...');
      
      // Add timestamp
      const timestamp = new Date();
      
      // Get current row count before adding
      const beforeCount = sheet.getLastRow();
      console.log('Sheet rows before adding:', beforeCount);
      
      // Prepare the row data
      const newRow = [
        timestamp,
        processedData.indexNumber,
        processedData.category,
        processedData.correctAnswers,
        processedData.totalQuestions,
        processedData.percentage,
        processedData.questionsAnswered,
        processedData.date,
        processedData.time
      ];
      
      console.log('Adding row to sheet:', newRow);
      
      // Append new row
      sheet.appendRow(newRow);
      
      // Verify the row was added
      const afterCount = sheet.getLastRow();
      console.log('Sheet rows after adding:', afterCount);
      
      const successResponse = {
        success: true,
        message: 'Score submitted successfully',
        timestamp: timestamp.toISOString(),
        data: processedData,
        debug: {
          rowsBefore: beforeCount,
          rowsAfter: afterCount,
          rowAdded: afterCount > beforeCount
        }
      };
      
      console.log('Returning success response:', successResponse);
      
      return ContentService
        .createTextOutput(JSON.stringify(successResponse))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    console.log('Fetching leaderboard data...');
    
    // Default: fetch leaderboard data
    const data = sheet.getDataRange().getValues();
    console.log('Sheet data retrieved, rows:', data.length);
    
    // Skip header row if it exists
    if (data.length === 0) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: true,
          data: [],
          count: 0,
          message: 'No data found in sheet'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    const headers = data[0];
    const rows = data.slice(1);
    
    console.log('Headers:', headers);
    console.log('Data rows:', rows.length);
    
    // Convert to array of objects
    const leaderboard = rows.map(row => {
      const entry = {};
      headers.forEach((header, index) => {
        entry[header.toLowerCase().replace(/\s+/g, '')] = row[index];
      });
      return entry;
    });
    
    // Sort by percentage (descending), then by total questions (descending)
    leaderboard.sort((a, b) => {
      if (b.percentage !== a.percentage) {
        return b.percentage - a.percentage;
      }
      return b.totalquestions - a.totalquestions;
    });
    
    console.log('Returning leaderboard with', leaderboard.length, 'entries');
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        data: leaderboard,
        count: leaderboard.length
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.log('Error in doGet:', error);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  // Handle POST requests - submit new scores
  try {
    // Get the first sheet explicitly
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheets()[0]; // Get first sheet
    
    // Log incoming data for debugging
    console.log('doPost called, using sheet:', sheet.getName());
    console.log('Received POST data:', e);
    
    // Parse the POST data
    let data;
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
        console.log('Parsed JSON data:', data);
      } catch (jsonError) {
        console.log('JSON parse failed, trying form data:', jsonError);
        data = e.parameter;
      }
    } else if (e.parameter) {
      data = e.parameter;
    } else {
      throw new Error('No data received');
    }
    
    // Ensure data is properly typed
    const processedData = {
      indexNumber: String(data.indexNumber || ''),
      category: String(data.category || ''),
      correctAnswers: Number(data.correctAnswers) || 0,
      totalQuestions: Number(data.totalQuestions) || 0,
      percentage: Number(data.percentage) || 0,
      questionsAnswered: Number(data.questionsAnswered) || 0,
      date: String(data.date || ''),
      time: String(data.time || '')
    };
    
    console.log('Processed data:', processedData);
    
    // Validate required fields
    const required = ['indexNumber', 'category', 'date', 'time'];
    for (let field of required) {
      if (!processedData[field] || processedData[field] === '') {
        throw new Error(`Missing required field: ${field}`);
      }
    }
    
    // Add timestamp
    const timestamp = new Date();
    
    // Append new row
    sheet.appendRow([
      timestamp,
      processedData.indexNumber,
      processedData.category,
      processedData.correctAnswers,
      processedData.totalQuestions,
      processedData.percentage,
      processedData.questionsAnswered,
      processedData.date,
      processedData.time
    ]);
    
    const successResponse = {
      success: true,
      message: 'Score submitted successfully',
      timestamp: timestamp.toISOString(),
      data: processedData
    };
    
    console.log('Returning success response:', successResponse);
    
    return ContentService
      .createTextOutput(JSON.stringify(successResponse))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.log('Error in doPost:', error);
    
    const errorResponse = {
      success: false,
      error: error.toString()
    };
    
    return ContentService
      .createTextOutput(JSON.stringify(errorResponse))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function setupSheet() {
  // Helper function to set up the sheet headers
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheets()[0]; // Get first sheet
  
  console.log('Setting up sheet:', sheet.getName());
  
  const headers = [
    'Timestamp',
    'Index Number', 
    'Quiz Category',
    'Score',
    'Total Questions',
    'Percentage',
    'Questions Answered',
    'Date',
    'Time'
  ];
  
  // Clear and set headers
  sheet.clear();
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Format headers
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#4285f4');
  headerRange.setFontColor('white');
  
  // Auto-resize columns
  sheet.autoResizeColumns(1, headers.length);
  
  console.log('Sheet setup complete for:', sheet.getName());
  return 'Sheet setup complete for: ' + sheet.getName();
}

function testSubmission() {
  // Test function to manually submit a score and verify it works
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheets()[0]; // Get first sheet
    
    console.log('Testing submission on sheet:', sheet.getName());
    
    // Create test data
    const testData = {
      indexNumber: 'TEST123',
      category: 'CSE',
      correctAnswers: 8,
      totalQuestions: 10,
      percentage: 80,
      questionsAnswered: 10,
      date: '2024-01-01',
      time: '12:00:00'
    };
    
    console.log('Testing with data:', testData);
    
    // Add timestamp
    const timestamp = new Date();
    
    // Get current row count before adding
    const beforeCount = sheet.getLastRow();
    console.log('Rows before:', beforeCount);
    
    // Append new row
    const newRow = [
      timestamp,
      testData.indexNumber,
      testData.category,
      testData.correctAnswers,
      testData.totalQuestions,
      testData.percentage,
      testData.questionsAnswered,
      testData.date,
      testData.time
    ];
    
    console.log('Adding row:', newRow);
    sheet.appendRow(newRow);
    
    // Get row count after adding
    const afterCount = sheet.getLastRow();
    console.log('Rows after:', afterCount);
    
    if (afterCount > beforeCount) {
      console.log('SUCCESS: Row was added to sheet!');
      return `Test submission successful! Row added to sheet "${sheet.getName()}". Rows: ${beforeCount} → ${afterCount}`;
    } else {
      console.log('ERROR: No row was added to sheet!');
      return `Test submission failed! No row was added to sheet "${sheet.getName()}".`;
    }
    
  } catch (error) {
    console.log('Error in test submission:', error);
    return 'Test submission failed: ' + error.toString();
  }
}

function debugSheet() {
  // Debug function to check sheet status
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheets()[0]; // Get first sheet
    const sheetName = sheet.getName();
    const rowCount = sheet.getLastRow();
    const colCount = sheet.getLastColumn();
    
    console.log('Sheet name:', sheetName);
    console.log('Last row:', rowCount);
    console.log('Last column:', colCount);
    
    if (rowCount > 0) {
      const data = sheet.getDataRange().getValues();
      console.log('Sheet data:', data);
      return {
        sheetName: sheetName,
        rowCount: rowCount,
        colCount: colCount,
        data: data
      };
    } else {
      return {
        sheetName: sheetName,
        rowCount: rowCount,
        colCount: colCount,
        message: 'Sheet is empty'
      };
    }
    
  } catch (error) {
    console.log('Error in debug:', error);
    return 'Debug failed: ' + error.toString();
  }
}
