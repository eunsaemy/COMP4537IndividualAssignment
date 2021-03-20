// global quoteId counter
let count = 0;
// total number of objects in the object array
let totalCount = 0;

// global JSON object array
let myObj = [];

// id
let quoteId = 0;
// body
let quoteBody = "";
// source
let quoteSource = "";

// checks if the quote already exists in the database
let check = 0;

/*
The function gets all quotes from the database and
displays them on the admin page
*/
function load() {
    (async() => {
        let result = await fetch('https://eunsaemlee.com/COMP4537/ASG1/v1/quotes').then((res) => {
            if (res.ok) {
                return res.json();
            }
        }).then((res) => {
            myObj = res;
            totalCount = Object.keys(myObj).length;
            
            if (totalCount > 0) {
                count = myObj[totalCount - 1].quoteId;
            }
        }).then((res) => {
            
            for (let i = 0; i < totalCount; i++) {
                quoteId = myObj[i].quoteId;
                quoteBody = JSON.stringify(myObj[i].body);
                quoteSource = JSON.stringify(myObj[i].source).slice(1, -1);
                
                generateQuote(quoteId, quoteBody, quoteSource);
            }
        })
    })();
}

/*
The function creates body (textarea), source (textarea), delete (button), update (button)
*/
function addObject() {
    // adds 1 to count
    count++;
    
    // creates a skeletal template to add new quote
    addQuote();
}

/*
The function deletes the quote from the database and admin page
*/
function deleteObject(value) {
    // DELETE request
    deleteRequest(value);
    
    // visually removes the quote from the admin page
    deleteQuote(value);
    
    console.log("quote deleted successfully");
}

/*
The function adds a new quote to the database and
updates a quote in the database if it already exists
*/
function updateObject(value) {
    let bodyText = document.getElementById("bodyTA" + value).value;
    let sourceText = document.getElementById("sourceTA" + value).value;
    
    // checks if the quote exists
    checkQuote(value, bodyText, sourceText);
}

/*
The function creates a skeletal template for existing quote(s) which has:
body (textarea), source (textarea), delete (button), update(button)
*/
function generateQuote(value, bodyText, sourceText) {
    // container is the div with id "quoteContainer"
    let container = document.getElementById("quoteContainer");
    
    // create div element for each quote
    let quote = document.createElement("div");
    quote.setAttribute("id", "quote" + value);
    quote.setAttribute("class", "d-flex flex-row");
    container.appendChild(quote);
    
    // create div element for textareas
    let textAreaContainer = document.createElement("div");
    textAreaContainer.setAttribute("class", "textAreaContainer");
    quote.appendChild(textAreaContainer);
    
    // create body (textarea)
    let bodyTA = document.createElement("textarea");
    bodyTA.setAttribute("id", "bodyTA" + value);
    bodyTA.setAttribute("class", "bodyTA");
    textAreaContainer.appendChild(bodyTA);
    document.getElementById("bodyTA" + value).value = bodyText;
    
    // create source (textarea)
    let sourceTA = document.createElement("textarea");
    sourceTA.setAttribute("id", "sourceTA" + value);
    sourceTA.setAttribute("class", "sourceTA");
    textAreaContainer.appendChild(sourceTA);
    document.getElementById("sourceTA" + value).value = sourceText;
    
    // create div element for buttons
    let buttonContainer = document.createElement("div");
    buttonContainer.setAttribute("class", "buttonContainer d-flex flex-column");
    quote.appendChild(buttonContainer);
    
    // create div elements for delete (button)
    let deleteContainer = document.createElement("div");
    deleteContainer.setAttribute("class", "deleteContainer");
    buttonContainer.appendChild(deleteContainer);
    
    // create div element for update (button)
    let updateContainer = document.createElement("div");
    updateContainer.setAttribute("class", "updateContainer");
    buttonContainer.appendChild(updateContainer);
    
    // create delete (button)
    let deleteButton = document.createElement("button");
    deleteButton.setAttribute("id", "deleteButton" + value);
    deleteButton.setAttribute("class", "btn btn-danger");
    deleteButton.setAttribute("value", value);
    deleteButton.setAttribute("onclick", "deleteObject(this.value)");
    deleteButton.innerHTML = "Delete";
    deleteContainer.appendChild(deleteButton);
    
    // create update (button)
    let updateButton = document.createElement("button");
    updateButton.setAttribute("id", "updateButton" + value);
    updateButton.setAttribute("class", "btn btn-info");
    updateButton.setAttribute("value", value);
    updateButton.setAttribute("onclick", "updateObject(this.value)");
    updateButton.innerHTML = "Update in DB";
    updateContainer.appendChild(updateButton);
}

/*
The function creates a skeletal template for new quote(s) which has:
body (textarea), source (textarea), delete (button), update(button)
*/
function addQuote() {
    // container is the div with id "quoteContainer"
    let container = document.getElementById("quoteContainer");
    
    // create div element for each quote
    let quote = document.createElement("div");
    quote.setAttribute("id", "quote" + count);
    quote.setAttribute("class", "d-flex flex-row");
    container.appendChild(quote);
    
    // create div element for textareas
    let textAreaContainer = document.createElement("div");
    textAreaContainer.setAttribute("class", "textAreaContainer");
    quote.appendChild(textAreaContainer);
    
    // create body (textarea)
    let bodyTA = document.createElement("textarea");
    bodyTA.setAttribute("id", "bodyTA" + count);
    bodyTA.setAttribute("class", "bodyTA");
    textAreaContainer.appendChild(bodyTA);
    
    // create source (textarea)
    let sourceTA = document.createElement("textarea");
    sourceTA.setAttribute("id", "sourceTA" + count);
    sourceTA.setAttribute("class", "sourceTA");
    textAreaContainer.appendChild(sourceTA);
    
    // create div element for buttons
    let buttonContainer = document.createElement("div");
    buttonContainer.setAttribute("class", "buttonContainer d-flex flex-column");
    quote.appendChild(buttonContainer);
    
    // create div elements for delete (button)
    let deleteContainer = document.createElement("div");
    deleteContainer.setAttribute("class", "deleteContainer");
    buttonContainer.appendChild(deleteContainer);
    
    // create div element for update (button)
    let updateContainer = document.createElement("div");
    updateContainer.setAttribute("class", "updateContainer");
    buttonContainer.appendChild(updateContainer);
    
    // create delete (button)
    let deleteButton = document.createElement("button");
    deleteButton.setAttribute("id", "deleteButton" + count);
    deleteButton.setAttribute("class", "btn btn-danger");
    deleteButton.setAttribute("value", count);
    deleteButton.setAttribute("onclick", "deleteObject(this.value)");
    deleteButton.innerHTML = "Delete";
    deleteContainer.appendChild(deleteButton);
    
    // create update (button)
    let updateButton = document.createElement("button");
    updateButton.setAttribute("id", "updateButton" + count);
    updateButton.setAttribute("class", "btn btn-info");
    updateButton.setAttribute("value", count);
    updateButton.setAttribute("onclick", "updateObject(this.value)");
    updateButton.innerHTML = "Update in DB";
    updateContainer.appendChild(updateButton);
}

/*
The function deletes the specified id row from the database
*/
function deleteRequest(value) {
    (async() => {
        let result = await fetch('https://eunsaemlee.com/COMP4537/ASG1/v1/quotes', {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                quoteId: value
            })
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
        })
    })();
}

/*
The function removes the quote from the admin page
*/
function deleteQuote(value) {
    let container = document.getElementById("quote" + value);
    container.remove();
}

/*
The function checks if the quote is new and
if new,         it adds the quote to the database
if not new,     it updates the quote in the database
*/
function checkQuote(value, bodyText, sourceText) {
    (async() => {
        let result = await fetch('https://eunsaemlee.com/COMP4537/ASG1/v1/quotes/' + value).then((res) => {
            if (res.ok) {
                return res.json();
            }
        }).then((res) => {
            myObj = res;
        }).then((res) => {
            // checks if the quote is new or already exists in the database
            check = myObj.length;
        }).then((res) => {
            // if the quote is new
            if (check == 0) {
                // POST to add new
                newQuote(bodyText, sourceText);
                console.log("quote added successfully");
            } else {
                // PUT to update
                updateQuote(value, bodyText, sourceText);
                console.log("quote updated successfully");
            }
        })
    })();
}

/*
The function makes a POST request to add new quote to the database
*/
function newQuote(bodyText, sourceText) {
    (async() => {
        let result = fetch('https://eunsaemlee.com/COMP4537/ASG1/v1/quotes', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                body: bodyText.slice(1, -1),
                source: sourceText
            })
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
        })
    })();
}

/*
The function makes a PUT request to update quote in the database
*/
function updateQuote(value, bodyText, sourceText) {
    (async() => {
        let result = fetch('https://eunsaemlee.com/COMP4537/ASG1/v1/quotes', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                quoteId: value,
                body: bodyText.slice(1, -1),
                source: sourceText
            })
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
        })
    })();
}