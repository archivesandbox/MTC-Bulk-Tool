# MTC-Bulk-Tool
An extension for Google Chrome that allows for granular selection of bulk items in the Manage Top Containers module of ArchivesSpace

**Loading the Extension:**

Download the MTC-Bulk-Tool folder and move it to a storage location on your device

Open Google Chrome and navigate to "Manage Extensions" chrome://extensions/

Toggle on Developer Mode in the upper right

Select "Load unpacked" and select the MTC-Bulk-Tool folder on your device

The extension should now be loaded and can be accessed from the puzzle icon to the right of the search bar.


**Using the Extension:**

MTC-Bulk-Tool allows users of ArchivesSpace to select multiple container records in the Manage Top Containers Module based on their identifiers.

It can also create a new tab that displays the information from the records it locates as a table.

The bottom of the tab notes any record identifiers that are not found

Begin by navigating to the Manage Top Containers module in the ArchivesSpace staff interface 

Perform a search for a group of container records. 

The purpose of the extension is to allow for nonadjacent records to be selected, so it is recommended that the search be broad enough to include all search identifiers

All container records in the repository can be returned via a search for Has Location: "Yes" or by performing a keyword search for the "*" wildcard.

Once the container record group is returned, open the MTC-Bulk-Tool extension

Enter the search identifiers one to a line/separated by line breaks in the text field provided.

This formatting allows users to copy and paste a set of identifiers from a spreadsheet column

Enter the search indices (separated by commas)for the extension to use.

These are the columns of the search results table in Manage Top Containers that you would like the extension to search for the identifiers

Column indices are numbered from left to right. 

Next enter the return indices (separated by commas). These are the columns you would like returned if you choose to generate a table of what was/wasn't found (recommended)

Finally, choose if you would like to check the boxes to the left of the records with matching identifiers

Also choose if you would like to create a table of the return columns/indicies of the records with matching identifiers

Click "Submit"

If you chose to have the records matching the identifiers selected, you can now perform bulk actions on them, such as location changes or deletion.

If you chose to have the table created in a separate tab, it can be copied to other locations or printed.

The Chrome extension "Column Copy" is recommended for this action. https://chromewebstore.google.com/detail/columncopy/lapbbfoohlcmlbdaakldmmallcbcbpjb

