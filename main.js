// =====================================
// SAVE DATA
// =====================================

async function saveData(){

  vibrate();

  const btn =
    document.getElementById("saveBtn");

  const status =
    document.getElementById("saveStatus");

  const selectedDate =
    document
    .getElementById("attendanceDate")
    .value;

  // PREVENT DOUBLE SAVE
  if(btn.disabled){
    return;
  }

  btn.disabled = true;

  btn.innerHTML = "Saving...";
  btn.style.background = "#666";

  try{

    const response =
      await fetch(API_URL, {

        method:"POST",

        body: JSON.stringify({

          date: selectedDate,

          absent: absent,

          hwIncomplete: hwIncomplete

        })

      });




    // READ RESPONSE SAFELY
    const text =
      await response.text();




    let result = {};



    try{

      result = JSON.parse(text);

    }

    catch(parseError){

      console.error(
        "Invalid JSON:",
        text
      );

      throw new Error(
        "Invalid server response"
      );
    }




    console.log(result);




    if(result.status != "success"){

      throw new Error(
        result.message || "Save failed"
      );
    }




    btn.innerHTML = "✓ Saved";
    btn.style.background = "green";



    const now =
      new Date();

    const timeString =
      now.toLocaleTimeString([], {

        hour: "2-digit",

        minute: "2-digit"

      });



    status.innerHTML =
      "Last Saved: " + timeString;




    setTimeout(() => {

      btn.innerHTML = "SAVE DATA";

      btn.style.background = "#111";

      btn.disabled = false;

    }, 1500);

  }



  catch(error){

    console.error(error);

    btn.innerHTML = "Save Failed";

    btn.style.background = "red";

    btn.disabled = false;

    status.innerHTML =
      error.message || "Connection Error";
  }
}





// =====================================
// EVENTS
// =====================================

document
.getElementById("saveBtn")
.addEventListener(
  "click",
  saveData
);




document
.getElementById("attendanceDate")
.addEventListener(
  "change",
  loadAttendanceData
);




// =====================================
// INITIALIZE APP
// =====================================

async function initializeApp(){

  document
  .getElementById("attendanceDate")
  .value = formattedDate;



  await loadStudents();

  await loadAttendanceData();
}



initializeApp();