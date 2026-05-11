// ===============================
// LOAD STUDENTS
// ===============================

async function loadStudents(){

  try{

    const response =
      await fetch(
        API_URL + "?action=students"
      );



    if(!response.ok){

      throw new Error(
        "Students fetch failed"
      );
    }



    const students =
      await response.json();



    const container =
      document.getElementById("students");



    let html = "";



    students.forEach(student => {

      html += `

        <div class="student-card">

          <div class="student-name">
            ${student.name}
          </div>

          <div class="row">

            <div
              class="box present"
              id="att-${student.id}">

              ✅ Present

            </div>

            <div
              class="box hwdone"
              id="hw-${student.id}">

              📘 HW Done

            </div>

          </div>

        </div>

      `;
    });



    container.innerHTML = html;



    // ATTENDANCE EVENTS
    students.forEach(student => {

      const attBox =
        document.getElementById(
          `att-${student.id}`
        );



      attBox.addEventListener(
        "click",
        () => toggleAttendance(student.id)
      );



      const hwBox =
        document.getElementById(
          `hw-${student.id}`
        );



      hwBox.addEventListener(
        "click",
        () => toggleHW(student.id)
      );

    });

  }



  catch(error){

    console.error(error);

    alert("Failed to load students");
  }
}





// ===============================
// LOAD ATTENDANCE
// ===============================

async function loadAttendanceData(){

  try{

    absent = [];

    hwIncomplete = [];



    const selectedDate =
      document
      .getElementById("attendanceDate")
      .value;





    const response =
      await fetch(

        API_URL +

        "?action=attendance&date=" +

        encodeURIComponent(selectedDate)

      );



    if(!response.ok){

      throw new Error(
        "Attendance fetch failed"
      );
    }



    let data = [];



    try{

      data =
        await response.json();

    }

    catch(jsonError){

      console.error(jsonError);

      data = [];
    }





    if(!Array.isArray(data)){

      data = [];
    }





    // RESET ATTENDANCE
    document
    .querySelectorAll("[id^='att-']")
    .forEach(box => {

      box.className =
        "box present";

      box.innerHTML =
        "✅ Present";

    });





    // RESET HW
    document
    .querySelectorAll("[id^='hw-']")
    .forEach(box => {

      box.className =
        "box hwdone";

      box.innerHTML =
        "📘 HW Done";

      box.style.opacity =
        "1";

      box.style.pointerEvents =
        "auto";
    });





    // APPLY SAVED DATA
    data.forEach(student => {

      const id =
        student.id;



      const attBox =
        document.getElementById(
          `att-${id}`
        );



      const hwBox =
        document.getElementById(
          `hw-${id}`
        );



      if(!attBox || !hwBox){

        return;
      }





      // ABSENT
      if(student.attendance == "A"){

        absent.push(id);



        attBox.className =
          "box absent";



        attBox.innerHTML =
          "❌ Absent";



        hwBox.style.opacity =
          "0.6";



        hwBox.style.pointerEvents =
          "none";
      }





      // HW MISSING
      if(student.hw == "X"){

        hwIncomplete.push(id);



        hwBox.className =
          "box hwmiss";



        hwBox.innerHTML =
          "⚠️ HW Missing";
      }

    });

  }



  catch(error){

    console.error(error);

    alert("Failed to load attendance");
  }
}