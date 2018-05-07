/**
 * doPost - handle post requests. For each field in the request body,
 * finds the text item with a matching name, or creates a new one if
 * it doesn't exist, and adds the value as its answer. Then submits the form.
 */
function doPost(e) {
  // Read client data from POST request
  const clientData = JSON.parse(e.postData.contents);
  
  const form = FormApp.getActiveForm();
  var items = form.getItems();
  
  // Create form response with given answers
  var formResponse = form.createResponse();
  var item, itemIndex;
  for (var key in clientData) {
    itemIndex = items.map(function(item) { return item.getTitle(); }).indexOf(key);
    if (itemIndex !== -1) {
      // Found item - add response.
      item = items[itemIndex].asTextItem();
    } else {
      // Create new item
      item = form.addTextItem().setTitle(key);
      items = form.getItems();
    }
    formResponse.withItemResponse(item.createResponse(JSON.stringify(clientData[key])));
  }
  
  formResponse.submit();
  
  const output = ContentService.createTextOutput(JSON.stringify({status: 'success'}));
  return output.setMimeType(ContentService.MimeType.JAVASCRIPT);
}