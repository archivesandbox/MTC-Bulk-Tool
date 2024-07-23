document.getElementById('submit').addEventListener('click', () => {
  const searchStringInput = document.getElementById('searchStrings').value;
  const searchStrings = searchStringInput.split('\n').map(str => str.trim());
  
  const searchColumnIndicesInput = document.getElementById('searchColumnIndices').value;
  const searchColumnIndices = searchColumnIndicesInput.split(',').map(num => parseInt(num.trim()));
  
  const returnColumnIndicesInput = document.getElementById('returnColumnIndices').value;
  const returnColumnIndices = returnColumnIndicesInput.split(',').map(num => parseInt(num.trim()));
  
  const checkCheckboxes = document.getElementById('checkCheckboxes').checked;
  const createNewTab = document.getElementById('createNewTab').checked;

  if (searchStrings.length === 0 || searchColumnIndices.some(isNaN) || returnColumnIndices.some(isNaN)) {
    alert("Please enter valid search strings and column indices.");
  } else {
    // Send the search strings and options to the content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: searchTable,
        args: [searchStrings, searchColumnIndices, returnColumnIndices, checkCheckboxes, createNewTab]
      });
    });
    window.close();
  }
});

function searchTable(searchStrings, searchColumnIndices, returnColumnIndices, checkCheckboxes, createNewTab) {
  let table = document.querySelector("#bulk_operation_results > table");
  let rows = table.querySelectorAll("tr");

  let foundIdentifiers = [];
  let newTable, newTab, headerRow;

  if (createNewTab) {
    // Create a new tab
    newTab = window.open();
    // Create a new table in the new tab
    newTable = newTab.document.createElement("table");
    newTable.style.borderCollapse = "collapse";
    newTable.style.border = "1px solid black";
    // Create a new row for headers in the new table
    headerRow = newTab.document.createElement("tr");
    newTable.appendChild(headerRow);

    // Iterate through the headers of the original table and add the desired columns to the new table
    let headerCells = table.querySelectorAll("th");
    for (let h = 0; h < headerCells.length; h++) {
      if (returnColumnIndices.includes(h)) {
        let newHeaderCell = newTab.document.createElement("th");
        newHeaderCell.textContent = headerCells[h].textContent.trim();
        newHeaderCell.style.border = "1px solid black";
        headerRow.appendChild(newHeaderCell);
      }
    }
  }

  // Iterate through the rows of the original table
  for (let i = 0; i < rows.length; i++) {
    let cells = rows[i].querySelectorAll("td");

    if (cells) {
      let matchingRow = false;
      let rowData = [];

      // Check if any cell in the searchColumnIndices matches the searchStrings
      for (let j = 0; j < cells.length; j++) {
        if (searchColumnIndices.includes(j) && searchStrings.includes(cells[j].textContent.trim())) {
          matchingRow = true;
          foundIdentifiers.push(cells[j].textContent.trim());
        }
      }

      // Collect data for return columns
      for (let j = 0; j < cells.length; j++) {
        if (returnColumnIndices.includes(j)) {
          rowData.push(cells[j].textContent.trim());
        }
      }

      if (checkCheckboxes) {
        // Check or uncheck the checkbox in the matching row (assuming there's a checkbox in each row)
        let checkbox = rows[i].querySelector("input[type='checkbox']");
        if (checkbox) {
          if (matchingRow && !checkbox.checked) {
            checkbox.click(); // Check the checkbox if it's not already checked
          } else if (!matchingRow && checkbox.checked) {
            checkbox.click(); // Uncheck the checkbox if it's checked and not matching
          }
        }
      }

      if (matchingRow && createNewTab) {
        // Create a new row in the new table
        let newRow = newTab.document.createElement("tr");
        newTable.appendChild(newRow);

        // Create cells in the new row and populate them with the retrieved information
        for (let k = 0; k < rowData.length; k++) {
          let newCell = newTab.document.createElement("td");
          newCell.style.border = "1px solid black";
          newCell.textContent = rowData[k];
          newRow.appendChild(newCell);
        }
      }
    }
  }

  if (createNewTab) {
    // Append the new table to the new tab
    newTab.document.body.appendChild(newTable);
    // Add a message to the new tab indicating found and not found identifiers
    let messageParagraph = newTab.document.createElement("p");
    newTab.document.body.appendChild(messageParagraph);

    if (foundIdentifiers.length === searchStrings.length) {
      // All identifiers were found
      messageParagraph.textContent = "All identifiers found";
    } else {
      // Some identifiers were not found
      let notFoundIdentifiers = searchStrings.filter(identifier => !foundIdentifiers.includes(identifier));
      messageParagraph.innerHTML = `The following identifiers were not found:<br>${notFoundIdentifiers.join('<br>')}`;
    }
  }
}
