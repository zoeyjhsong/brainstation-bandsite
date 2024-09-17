const userName = document.querySelector("#name");
const userComment = document.querySelector("#comment_text");
const commentListWrapper = document.querySelector(".comment__list-wrapper");
const commentListContainer = document.querySelector(".comment__list-container");
const api_key = "8939596b-b112-459e-ade3-af117e191165";

axios
  .get(`https://project-1-api.herokuapp.com/comments?api_key=${api_key}`)
  .then((response) => {
    displayAllComments(response.data);
    // function displayAllComments() {
    //   response.data.forEach((comment) => {
    //     displayComment(comment);
    //     console.log(response.data);
    //   });
    // }
    // displayAllComments();
  })
  .catch((error) => {
    console.log("Error fetching comments ;", error);
  });

function displayAllComments(comments) {
  comments.forEach((comment) => {
    displayComment(comment);
  });
}

//submit comments
const form = document.querySelector(".comment__form");
form.addEventListener("submit", submitComments);

function submitComments(e) {
  e.preventDefault();

  const commentName = userName.value.trim();
  const commentText = userComment.value.trim();
  // const commentDate = new Date();

  // if (commentName !== "" && commentText !== "") {
  //   newComment = {
  //     name: `${commentName}`,
  //     date: new Intl.DateTimeFormat("en-US").format(commentDate),
  //     commentsText: `${commentText}`,
  //   };
  // }
  // if (commentName == "" || commentText == "") {
  //   alert("please enter both a name and comments! ");
  //   return;
  // }

  //validate the form fields
  if (!validateForm(commentName, commentText)) {
    return; //stop if validation fails
  }

  // prepare body for submission
  let body = {
    name: userName.value,
    comment: userComment.value,
  };

  axios
    .post(
      "https://project-1-api.herokuapp.com/comments?api_key=8939596b-b112-459e-ade3-af117e191165",
      body
    )
    .then((response) => {
      resetForm();
      displayComment(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}
// validate from fields
function validateForm(commentName, commentText) {
  if (!commentName) {
    alert("Please enter your name.");
    return false;
  }

  if (!commentText) {
    alert("Please enter your comments.");
    return false;
  }

  if (commentText.length < 5) {
    alert("Your comment must be at least 5 characters long. ");
    return false;
  }

  return true; //validation passed
}

// clear form inputs after submission
function resetForm() {
  userName.value = "";
  userComment.value = "";
}

// display a single comment ß
function displayComment(comment) {
  const commentCard = document.createElement("div");
  commentListWrapper.appendChild(commentCard);
  commentCard.classList.add("comment__card");

  //comment__card-avatar div
  const commentCardProfileImg = document.createElement("div");
  commentCard.appendChild(commentCardProfileImg);
  commentCardProfileImg.classList.add("comment__card-avatar");

  //comment__card-container div
  const commentCardContainer = document.createElement("div");
  commentCard.appendChild(commentCardContainer);
  commentCardContainer.classList.add("comment__card-container");

  //comment__card-name_date_container div
  const commentCardNameDateContainer = document.createElement("div");
  commentCardContainer.appendChild(commentCardNameDateContainer);
  commentCardNameDateContainer.classList.add(
    "comment__card-name_date_container"
  );

  //comment__card-name
  const commentCardName = document.createElement("span");
  commentCardNameDateContainer.appendChild(commentCardName);
  commentCardName.classList.add("comment__card-name");

  commentCardName.innerHTML = comment.name;

  //comment__card-date
  const commentCardDate = document.createElement("span");
  commentCardNameDateContainer.appendChild(commentCardDate);
  commentCardDate.classList.add("comment__card-date");

  // commentCardDate.innerHTML = comment.timestamp;
  commentCardDate.innerHTML = new Intl.DateTimeFormat("en-US").format(
    comment.timestamp
  );

  //comment__card-content
  const commentCardContent = document.createElement("p");
  commentCardContainer.appendChild(commentCardContent);
  commentCardContent.classList.add("comment__card-content");

  commentCardContent.innerHTML = comment.comment;

  commentListContainer.prepend(commentCard);
}

// function displayAllComments() {
//   defaultCommentsArray.forEach((comment) => {
//     displayComment(comment);
//   });
// }

// displayAllComments();

// let defaultCommentsArray = [
//   {
//     name: "Miles Acosta",
//     date: "12/20/2020",
//     commentsText:
//       "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
//   },
//   {
//     name: "Emilie Beach",
//     date: "01/09/2021",
//     commentsText:
//       "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
//   },
//   {
//     name: "Connor Walton",
//     date: "02/17/2021",
//     commentsText:
//       "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
//   },
// ];
