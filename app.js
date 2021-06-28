/*
It's time to put all that you have learned up to this point into action. Remember your first major assignment? it's now the time to add functionality to that social media page you built out in HTML and CSS. What we would like you to do is the following:

1) Add functionality to the submit button that validates the input fields (Name can only use characters and can not be empty, Comments can not be empty and must be less than 500 characters, Date must be formatted MM-DD-YYYY) 

2) After submission, show those entries in the table below the comment

3) Allow editting functionality on those entries so that users can either 
a) edit any of the information or 
b) delete the entry

**Extra Credit**

4) Add a filter section to the comments to sort results by Data or Name

5) Give feedback if validations fail with what exactly was wrong with their input

6) Feel free to expand the project with anything you might want to add to your social media experience (ex search bar for searching comments)
*/



// Add functionality to the submit button that validates the input fields (Name can only use characters and can not be empty, Comments can not be empty and must be less than 500 characters, Date must be formatted MM-DD-YYYY)

//regular expression for all upper case and lower case letters, including spaces
const letters = /^[A-Za-z\s]*$/;

const commentForm = () => {
    //grab user input for name, comment, and date
    let userName = document.getElementById("fname")
    let userComment = document.getElementById("comment-box");
    let userDate = document.getElementById("form-date");

    //setting date to be EST
    let d = Date.parse(userDate.value) + (840 * 60 * 1000);

    // Formatting date to MM/DD/YYYY using intl documentation to create the desired outputs.
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    let dateFormated = `${mo}/${da}/${ye}`
    console.log(dateFormated);

    //Check to ensure user input validations are met
    if (checkName(userName) && checkComment(userComment)) {
        //create new comment on the comment table
        //template for new comment row
        let table = document.getElementById("comments-body");
        let row = table.insertRow(0);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);

        //All user inputs created and added to the new row here
        cell1.innerHTML = userName.value;
        cell2.innerHTML = userComment.value;
        cell3.innerHTML = dateFormated;

        //setting a counter to make unique IDs for new select elements to reference an index value for edit/delete functionality
        let count = 3
        count += 1
        let selectId = "post-options" + count

        //creating Select element for new row
        let select = document.createElement("SELECT");
        //unique ID
        select.setAttribute("id", selectId);
        //Name attibute added
        select.setAttribute("name", "post-options");
        //giving select element functionality
        select.setAttribute("onchange", "modifyComments(this.id, this)");

        //creating the options for the select element:

        //Default Option
        let option1 = document.createElement("option");
        option1.setAttribute("value", "default");

        //Edit Option
        let option2 = document.createElement("option");
        option2.setAttribute("value", "edit");
        let editOption = document.createTextNode("Edit");
        option2.appendChild(editOption)

        //Delete option
        let option3 = document.createElement("option");
        option3.setAttribute("value", "delete");
        let deleteOption = document.createTextNode("Delete");
        option3.appendChild(deleteOption);

        //adding the select element to the collumn 
        cell4.appendChild(select);

        //Adding options to select element
        document.getElementById(selectId).appendChild(option1);
        document.getElementById(selectId).appendChild(option2);
        document.getElementById(selectId).appendChild(option3);

        //clearing input values
        userName.value = "";
        userComment.value = "";
        userDate.value = "mm/dd/yyyy"
    }
}

//Name Validation
const checkName = (input) => {
    if (!(input.value.match(letters))) {
        alert("Error, name must only contain letters and spaces and cannot be blank.");
        errorStyle(input);
    } else if (input.value.length > 500) {
        alert("Error, name must be less than 500 characters.");
        errorStyle(input);
    } else {
        console.log("User input valid: Name");
        input.style.borderColor = "black";
        return true;
    }
}

//Comment Validation
const checkComment = (input) => {
    if (input.value.length > 500) {
        alert("Error, comment must be less than 500 characters.");
        errorStyle(input);
    } else if (input.value === "") {
        alert("Error, comment box cannot be blank.");
        errorStyle(input);
    } else {
        console.log("User input valid: Comment");
        input.style.borderColor = "black";
        return true;
    }
}

// Function to change the style of the inputs when the user has validation issues
const errorStyle = (elementId) => {
    elementId.style.borderColor = "red";
    elementId.style.animation = "shake 0.5s";
}

//Watching Select for change option to initiate edit/delete
let modifyComments = (id, self) => {
    let postOptions = document.getElementById(id);
    let selectedOption = postOptions.options[postOptions.selectedIndex].value;
    // console.log(selectedOption)
    if (selectedOption === "edit") {
        var modal = document.getElementById("editModal");
        var span = document.getElementsByClassName("close")[0];
        let row = self.parentNode.parentNode.rowIndex;
        console.log(row);
        document.getElementById("updateBtn").setAttribute("value", row);

        modal.style.display = "block";
        span.onclick = () => {
            modal.style.display = "none";
            console.log("Close Delete")
        }
        window.onclick = (event) => {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    } else if (selectedOption === "delete") {
        var modal = document.getElementById("deleteModal");
        var span = document.getElementById("dclose");
        let row = self.parentNode.parentNode.rowIndex;
        console.log(row);
        document.getElementById("deleteBtn").setAttribute("value", row);

        modal.style.display = "block";
        span.onclick = () => {
            modal.style.display = "none";
        }
        window.onclick = (event) => {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    } else {
        console.log(selectedOption)
    }
}

//delete functionality
const deleteComment = (row) => {
    document.getElementById("post-table").deleteRow(row);
    document.getElementById("deleteModal").style.display = "none";

}

//edit functionality
let updateComment = (row) => {
    let rowNum = parseInt(row);
    console.log(rowNum);
    let updateName = document.getElementById("update-name")
    let updateComment = document.getElementById("update-comment");
    let updateDate = document.getElementById("update-date");
    let d = Date.parse(updateDate.value) + (840 * 60 * 1000);
    // console.log (d);
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    let dateFormated = `${mo}/${da}/${ye}`
    console.log(dateFormated);
    document.getElementById("post-table").rows[row].cells.item(1).innerHTML = updateComment.value;
    document.getElementById("post-table").rows[row].cells.item(0).innerHTML = updateName.value;
    document.getElementById("post-table").rows[row].cells.item(2).innerHTML = dateFormated;
    document.getElementById("editModal").style.display = "none";
}