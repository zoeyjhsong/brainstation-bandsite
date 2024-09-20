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
      `https://project-1-api.herokuapp.com/comments?api_key=${api_key}`,
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

// display a single comment
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
    "comment__card-name-date-container"
  );

  //comment__card-name
  const commentCardName = document.createElement("span");
  commentCardNameDateContainer.appendChild(commentCardName);
  commentCardName.classList.add("comment__card-name");

  commentCardName.innerHTML = comment.name;

  //like & delete container (including date)
  const commentCardLikeDeleteContainer = document.createElement("div");
  commentCardNameDateContainer.appendChild(commentCardLikeDeleteContainer);
  commentCardLikeDeleteContainer.classList.add(
    "comment__card-like-delete-container"
  );

  //comment__card-date
  const commentCardDate = document.createElement("span");
  commentCardLikeDeleteContainer.appendChild(commentCardDate);
  commentCardDate.classList.add("comment__card-date");

  // commentCardDate.innerHTML = comment.timestamp;
  commentCardDate.innerHTML = timeSince(comment.timestamp);

  //like button
  const commentCardLikeBtn = document.createElement("img");
  commentCardLikeDeleteContainer.appendChild(commentCardLikeBtn);
  commentCardLikeBtn.classList.add("comment__card-like-button");
  commentCardLikeBtn.src = "./assets/icons/icon-like.svg";

  //like button count
  const commentCardLikeBtnCount = document.createElement("p");
  commentCardLikeDeleteContainer.appendChild(commentCardLikeBtnCount);
  if (comment.likes > 0) {
    commentCardLikeBtnCount.classList.add("comment__card-like-button-count");
    commentCardLikeBtnCount.innerHTML = `${comment.likes}`; // Display current likes
  } else {
    commentCardLikeBtnCount.classList.remove("comment__card-like-button-count");
    commentCardLikeBtnCount.innerHTML = ""; // Hide the count if zero
  }

  // if (commentCardLikeBtnCount > 0)
  //   commentCardLikeBtnCount.class.add("comment__card-like-button-count");
  // commentCardLikeBtnCount.innerHTML = `${comment.likes}`;

  // if (comment.likes > 0) {
  //   commentCardLikeBtnCount.innerHTML = `{comment.likes}`; //display current likes
  // } else {
  //   commentCardLikeBtnCount.innerHTML = "";
  // }

  //add event listener for the like button
  commentCardLikeBtn.addEventListener("click", () => {
    handleLike(comment.id, commentCardLikeBtnCount);
  });

  //delete button
  const commentCardDeleteBtn = document.createElement("img");
  commentCardLikeDeleteContainer.appendChild(commentCardDeleteBtn);
  commentCardDeleteBtn.classList.add("comment__card-delete-button");
  commentCardDeleteBtn.src = "./assets/icons/icon-delete.svg";

  commentCardDeleteBtn.addEventListener("click", () => {
    handleDelete(comment.id, commentCard);
  });

  //comment__card-content
  const commentCardContent = document.createElement("p");
  commentCardContainer.appendChild(commentCardContent);
  commentCardContent.classList.add("comment__card-content");

  commentCardContent.innerHTML = comment.comment;

  commentListContainer.prepend(commentCard);
}

//function to handle the like button click and make the PUT request
function handleLike(id, likeCount) {
  axios
    .put(
      `https://project-1-api.herokuapp.com/comments/${id}/like?api_key=${api_key}`
    )
    .then((response) => {
      const updatedLikes = response.data.likes;
      likeCount.innerHTML = `${updatedLikes}`;
    })
    .catch((error) => {
      console.log("error updating likes:", error);
    });
}

function handleDelete(id, commentCard) {
  axios
    .delete(
      `https://project-1-api.herokuapp.com/comments/${id}?api_key=${api_key}`
    )
    .then((response) => {
      console.log(`Deleted post with id ${id}`);
      commentCard.remove();
    })
    .catch((error) => {
      console.log("error deleting comments", error);
    });
}

function timeSince(timestamp) {
  const now = new Date().getTime();
  let secondsPast = (now - timestamp) / 1000;

  // Ensure secondsPast is not negative
  if (secondsPast < 0) {
    secondsPast = 0;
  }

  //calculate different time intervals
  if (secondsPast < 60) {
    return `${Math.floor(secondsPast)} seconds ago`;
  } else if (secondsPast < 3600) {
    return `${Math.floor(secondsPast / 60)} minutes ago`;
  } else if (secondsPast < 86400) {
    return `${Math.floor(secondsPast / 3600)} hours ago`;
  } else if (secondsPast < 604800) {
    return `${Math.floor(secondsPast / 86400)} days ago`;
  } else if (secondsPast < 2592000) {
    return `${Math.floor(secondsPast / 604800)} weeks ago`;
  } else if (secondsPast < 31557600) {
    return `${Math.floor(secondsPast < 2592000)} months ago`;
  } else {
    return `${Math.floor(secondsPast / 31557600)} years ago`;
  }
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
