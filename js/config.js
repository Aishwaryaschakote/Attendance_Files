// ===============================
// DEFAULT TODAY DATE
// ===============================

const today = new Date();

const yyyy =
  today.getFullYear();

const mm =
  String(today.getMonth() + 1)
  .padStart(2, '0');

const dd =
  String(today.getDate())
  .padStart(2, '0');

const formattedDate =
  `${yyyy}-${mm}-${dd}`;





// ===============================
// API URL
// ===============================

const API_URL =
"https://script.google.com/macros/s/AKfycbydOnMwCTWCXiu5waq5MRT6_cJaqwMezRHjRVCapt4_3AEyTpDAYUBcexSivO9rkOjI/exec";





// ===============================
// GLOBAL ARRAYS
// ===============================

let absent = [];

let hwIncomplete = [];