const userName = document.querySelector("#name");
const userComment = document.querySelector("#comment_text");
const commentListWrapper = document.querySelector(".comment__list-wrapper");
commentListContainer = document.querySelector(".comment__list-container");

let defaultCommentsArray = [
  {
    name: "Miles Acosta",
    date: "12/20/2020",
    commentsText:
      "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
  },
  {
    name: "Emilie Beach",
    date: "01/09/2021",
    commentsText:
      "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
  },
  {
    name: "Connor Walton",
    date: "02/17/2021",
    commentsText:
      "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
  },
];

// commentsArray = JSON.parse(localStorage.getItem("comments")) || commentsArray;
// window.onload = displayAllComments;

const form = document.querySelector(".comment__form");
form.addEventListener("submit", submitComments);

function submitComments(e) {
  const commentName = userName.value;
  const commentText = userComment.value;
  const commentDate = new Date();

  e.preventDefault();

  if (commentName !== "" && commentText !== "") {
    newComment = {
      name: `${commentName}`,
      date: new Intl.DateTimeFormat("en-US").format(commentDate),
      commentsText: `${commentText}`,
    };
  }
  if (commentName == "" || commentText == "") {
    alert("please enter both a name and comments! ");
    return;
  }

  //add new comment to array
  defaultCommentsArray.push(newComment);
  //clear inputs
  resetForm();
  //add comment to list and display
  displayComment(newComment);

  console.log(defaultCommentsArray);
}

function resetForm() {
  userName.value = "";
  userComment.value = "";
}

function displayComment(comment) {
  //comment card div
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

  commentCardDate.innerHTML = comment.date;

  //comment__card-content
  const commentCardContent = document.createElement("p");
  commentCardContainer.appendChild(commentCardContent);
  commentCardContent.classList.add("comment__card-content");

  commentCardContent.innerHTML = comment.commentsText;

  commentListContainer.prepend(commentCard);
}

function displayAllComments() {
  defaultCommentsArray.forEach((comment) => {
    displayComment(comment);
  });
}

displayAllComments();
