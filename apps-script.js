/**
 * Google Apps Script for Quiz Leaderboard
 * This script handles GET and POST requests to manage quiz scores in Google Sheets
 */

function doGet(e) {
  // Handle GET requests - fetch leaderboard data
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
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
    
    const response = ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        data: leaderboard,
        count: leaderboard.length
      }))
      .setMimeType(ContentService.MimeType.JSON);
    
    // Add CORS headers
    return response;
      
  } catch (error) {
    const response = ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
    
    return response;
  }
}

function doPost(e) {
  // Handle POST requests - submit new scores
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    
    // Parse the POST data - handle both JSON and form data
    let data;
    if (e.postData && e.postData.contents) {
      try {
        // Try JSON first
        data = JSON.parse(e.postData.contents);
      } catch (jsonError) {
        // If JSON fails, try form data
        data = e.parameter;
      }
    } else if (e.parameter) {
      data = e.parameter;
    } else {
      throw new Error('No data received');
    }
    
    // Convert string numbers to actual numbers
    if (typeof data.correctAnswers === 'string') data.correctAnswers = parseInt(data.correctAnswers);
    if (typeof data.totalQuestions === 'string') data.totalQuestions = parseInt(data.totalQuestions);
    if (typeof data.percentage === 'string') data.percentage = parseFloat(data.percentage);
    if (typeof data.questionsAnswered === 'string') data.questionsAnswered = parseInt(data.questionsAnswered);
    
    // Validate required fields
    const required = ['indexNumber', 'category', 'correctAnswers', 'totalQuestions', 'percentage', 'questionsAnswered', 'date', 'time'];
    for (let field of required) {
      if (data[field] === undefined || data[field] === null || data[field] === '') {
        throw new Error(`Missing required field: ${field}`);
      }
    }
    
    // Add timestamp
    const timestamp = new Date();
    
    // Append new row
    sheet.appendRow([
      timestamp,
      data.indexNumber,
      data.category,
      data.correctAnswers,
      data.totalQuestions,
      data.percentage,
      data.questionsAnswered,
      data.date,
      data.time
    ]);
    
    const response = ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Score submitted successfully',
        timestamp: timestamp,
        data: data
      }))
      .setMimeType(ContentService.MimeType.JSON);
    
    return response;
      
  } catch (error) {
    const response = ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
    
    return response;
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
