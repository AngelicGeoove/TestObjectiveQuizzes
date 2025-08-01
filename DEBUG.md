# Debugging Google Sheets Integration

The Apps Script is returning success responses but the Google Sheet remains empty. Here's how to debug and fix this issue:

## Step 1: Check Apps Script Logs

1. Open your Google Apps Script project
2. Click on "Executions" in the left sidebar
3. Look for recent executions when you submitted a quiz score
4. Click on any execution to see the logs and identify errors

## Step 2: Test Sheet Setup

1. In your Apps Script editor, run the `setupSheet()` function:
   - Click on the function dropdown and select "setupSheet"
   - Click the "Run" button
   - This will set up proper headers in your sheet

2. Test manual submission by running `testSubmission()`:
   - Select "testSubmission" from the function dropdown
   - Click "Run"
   - Check if a test row appears in your Google Sheet

3. Debug sheet status by running `debugSheet()`:
   - Select "debugSheet" from the function dropdown
   - Click "Run"
   - Check the logs to see sheet information

## Step 3: Check Sheet Permissions

Make sure your Google Sheet has the correct permissions:

1. **Sheet Writing Permissions**: The Apps Script needs to write to the sheet
   - The script should have access since it's bound to the sheet
   - If you created the script separately, make sure it has access

2. **Sheet Structure**: 
   - Run `setupSheet()` to ensure proper headers
   - Make sure you're using the first sheet (Sheet1) or update the script

## Step 4: Test with Logs

I've added extensive logging to the Apps Script. When you submit a quiz score:

1. Open Apps Script → Executions
2. Look for the latest execution
3. Check the logs to see:
   - What data was received
   - Whether validation passed
   - If the row was actually added
   - Any error messages

## Step 5: Common Issues and Solutions

### Issue 1: Wrong Sheet Selected
**Problem**: Apps Script is writing to a different sheet than expected
**Solution**: 
```javascript
// In Apps Script, change this line:
const sheet = SpreadsheetApp.getActiveSheet();
// To this (replace "Sheet1" with your sheet name):
const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
```

### Issue 2: No Headers Set
**Problem**: Sheet doesn't have proper headers
**Solution**: Run the `setupSheet()` function

### Issue 3: Permission Issues
**Problem**: Script doesn't have write permissions
**Solution**: 
1. Make sure you created the Apps Script from within the Google Sheet
2. Re-authorize the script if needed

### Issue 4: Script Not Deployed Properly
**Problem**: The web app deployment isn't working
**Solution**:
1. Click "Deploy" → "New Deployment"
2. Choose "Web app" as type
3. Set execute as "Me"
4. Set access to "Anyone"
5. Click "Deploy"
6. Copy the new URL to your config

## Step 6: Manual Test

Try this manual test to isolate the issue:

1. Open your Google Sheet
2. Manually add a row with data like:
   ```
   2024-01-01 12:00:00 | TEST123 | CSE | 8 | 10 | 80 | 10 | 2024-01-01 | 12:00:00
   ```
3. If manual entry works, the issue is with the Apps Script
4. If manual entry doesn't work, there might be a sheet permission issue

## Step 7: Updated Apps Script

I've updated your `apps-script.js` with:
- Extensive logging for debugging
- Test functions (`testSubmission`, `debugSheet`)
- Better error handling
- Row count verification

Copy the updated script to your Google Apps Script editor and try the test functions.

## Next Steps

1. Run `setupSheet()` first
2. Run `testSubmission()` to verify basic functionality
3. Check the logs in "Executions"
4. Try submitting a real quiz score
5. Check logs again to see what's happening

If the test submission works but real submissions don't, the issue is likely in the data format or validation. The logs will show exactly what's happening.
