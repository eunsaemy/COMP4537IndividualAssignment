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

/*
The function gets all quotes from the database and
sets the values for count and totalCount
*/
function check() {
    (async() => {
        let result = await fetch('https://eunsaemlee.com/COMP4537/ASG1/v1/quotes').then((res) => {
            if (res.ok) {
                return res.json();
            }
        }).then((res) => {
            myObj = res;
            
            totalCount = Object.keys(myObj).length;
            count = myObj[totalCount - 1].quoteId;
        })
    })();
}

/*
The function removes all quotes from the reader page and
displays the latest quote on the reader page
*/
function individualQuote() {
    // removes all quotes from the reader page
    removeQuotes();

    // gets and displays latest quote on the reader page
    getQuote(count);
}

/*
The function removes all quotes from the reader page and
displays all quotes in the database on the reader page
*/
function entireQuotes() {
    // removes all quotes from the reader page
    removeQuotes();
    
    // gets and displays all quotes on the reader page
    getQuotes();
}

/*
The function removes all quotes from the reader page
*/
function removeQuotes() {
    // removes the div "quoteContainer"
    let container = document.getElementById("quoteContainer");
    container.remove();
    
    // recreates the div "quoteContainer" (now empty)
    let theContainer = document.getElementById("theContainer");
    let quoteContainer = document.createElement("div");
    quoteContainer.setAttribute("id", "quoteContainer");
    theContainer.appendChild(quoteContainer);
}

/*
The function makes a GET request to get and
display latest quote from the database
*/
function getQuote(value) {
    (async() => {
        let result = await fetch('https://eunsaemlee.com/COMP4537/ASG1/v1/quotes/' + value).then((res) => {
            if (res.ok) {
                return res.json();
            }
        }).then((res) => {
            myObj = res;
            
            quoteBody = JSON.stringify(myObj[0].body);
            quoteSource = JSON.stringify(myObj[0].source).slice(1, -1);
        }).then((res) => {
            // displays latest quote on the reader page
            generateQuote(value, quoteBody, quoteSource);
        })
    })();
}

/*
The function makes a GET request to get and
display all quotes from the database
*/
function getQuotes() {
    (async() => {
        let result = await fetch('https://eunsaemlee.com/COMP4537/ASG1/v1/quotes').then((res) => {
            if (res.ok) {
                return res.json();
            }
        }).then((res) => {
            myObj = res;
            totalCount = Object.keys(myObj).length;
            count = myObj[totalCount - 1].quoteId;
        }).then((res) => {
            // for all objects in the array
            for (let i = 0; i < totalCount; i++) {
                quoteId = myObj[i].quoteId;
                quoteBody = JSON.stringify(myObj[i].body);
                quoteSource = JSON.stringify(myObj[i].source).slice(1, -1);
                
                // displays all quotes on the reader page
                generateQuote(quoteId, quoteBody, quoteSource);
            }
        })
    })();
}

/*
The function creates a skeletal template for existing quote(s) which has:
body (textarea), source (textarea) [readOnly]
*/
function generateQuote(value, bodyText, sourceText) {
    // container is the div with id "quoteContainer"
    let container = document.getElementById("quoteContainer");
    
    // create div element for each quote
    let quote = document.createElement("div");
    quote.setAttribute("id", "quote" + value);
    quote.setAttribute("class", "d-flex flex-row");
    container.appendChild(quote);
    
    // create body (textarea)
    let bodyTA = document.createElement("textarea");
    bodyTA.setAttribute("id", "bodyTA" + value);
    bodyTA.setAttribute("class", "bodyTA");
    quote.appendChild(bodyTA);
    document.getElementById("bodyTA" + value).value = bodyText;
    document.getElementById("bodyTA" + value).readOnly = true;
    
    // create source (textarea)
    let sourceTA = document.createElement("textarea");
    sourceTA.setAttribute("id", "sourceTA" + value);
    sourceTA.setAttribute("class", "sourceTA");
    quote.appendChild(sourceTA);
    document.getElementById("sourceTA" + value).value = sourceText;
    document.getElementById("sourceTA" + value).readOnly = true;
}