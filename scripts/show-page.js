const showListWrapper = document.querySelector(".show__list-wrapper");

let showArray = [
  {
    date: "Mon Sept 06 2021",
    venue: "Ronald Lane ",
    location: "San Francisco, CA",
  },
  {
    date: "Tue Sept 21 2021",
    venue: "Pier 3 East",
    location: "San Francisco, CA ",
  },
  {
    date: "Fri Oct 15 2021 ",
    venue: "View Lounge",
    location: "San Francisco, CA",
  },
  {
    date: "Sat Nov 06 2021",
    venue: "Hyatt Agency",
    location: "San Francisco, CA ",
  },
  {
    date: "Fri Nov 26 2021",
    venue: "Moscow Center",
    location: "San Francisco, CA",
  },
  {
    date: "Wed Dec 15 2021",
    venue: "Press Club ",
    location: "San Francisco, CA",
  },
];

function displayShow(show) {
  const showCardCon = document.createElement("div");
  showListWrapper.appendChild(showCardCon);
  showCardCon.classList.add("show__card-container");

  const showCard = document.createElement("div");
  showCardCon.appendChild(showCard);
  showCard.classList.add("show__card");

  //date
  const showDateHeader = document.createElement("span");
  showCard.appendChild(showDateHeader);
  showDateHeader.classList.add("show__date-header");

  showDateHeader.innerHTML = "DATE";

  const showDate = document.createElement("p");
  showCard.appendChild(showDate);
  showDate.classList.add("show__date");

  showDate.innerHTML = show.date;

  //venue
  const showVenueHeader = document.createElement("span");
  showCard.appendChild(showVenueHeader);
  showVenueHeader.classList.add("show__venue-header");

  showVenueHeader.innerHTML = "VENUE";

  const showVenue = document.createElement("p");
  showCard.appendChild(showVenue);
  showVenue.classList.add("show__venue");

  showVenue.innerHTML = show.venue;

  //location
  const showLocationHeader = document.createElement("span");
  showCard.appendChild(showLocationHeader);
  showLocationHeader.classList.add("show__location-header");

  showLocationHeader.innerHTML = "LOCATION";

  const showLocation = document.createElement("p");
  showCard.appendChild(showLocation);
  showLocation.classList.add("show__location");

  showLocation.innerHTML = show.location;

  const showButton = document.createElement("button");
  showCard.appendChild(showButton);
  showButton.classList.add("show__button");

  showButton.innerHTML = "BUY TICKETS";
}

function displayShows() {
  showArray.forEach((show) => {
    displayShow(show);
  });
}

displayShows();
