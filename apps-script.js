/**
 * Google Apps Script for Quiz Leaderboard
 * This script handles GET and POST requests to manage quiz scores in Google Sheets
 */

function doGet(e) {
  // Handle GET requests - both leaderboard fetch and score submission
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    
    // Check if this is a score submission
    if (e.parameter && e.parameter.action === 'submit') {
      // Handle score submission via GET
      const data = e.parameter;
      
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
      
      return ContentService
        .createTextOutput(JSON.stringify({
          success: true,
          message: 'Score submitted successfully',
          timestamp: timestamp.toISOString(),
          data: processedData
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Default: fetch leaderboard data
    const data = sheet.getDataRange().getValues();
    
    // Skip header row
    const headers = data[0];
    const rows = data.slice(1);
    
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
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        data: leaderboard,
        count: leaderboard.length
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
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
    const sheet = SpreadsheetApp.getActiveSheet();
    
    // Log incoming data for debugging
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
  const sheet = SpreadsheetApp.getActiveSheet();
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
  
  return 'Sheet setup complete!';
}
