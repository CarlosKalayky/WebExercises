
sequenceDiagram
    participant user
    participant server
    participant browser
    user->>browser: user writes his input into the form and presses the button to display the results in the list view
    browser->>server: sends the POST request to the server wiith the new note
    server->>browser: Gets the note from the server and sends the note to the browser
    Note : This will redirect to the new URL with the new note
    user->>browser: Realoads with more HTTP requests fetchin the new data (GET)
