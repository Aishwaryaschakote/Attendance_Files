// ===============================
// MOBILE VIBRATION
// ===============================

function vibrate(){
  if(navigator.vibrate){
    navigator.vibrate(40);
  }
}

// ===============================
// TOGGLE ATTENDANCE
// ===============================

function toggleAttendance(id){

  vibrate();

  id = String(id).trim();

  const attBox =
    document.getElementById(`att-${id}`);

  const hwBox =
    document.getElementById(`hw-${id}`);

  // MAKE PRESENT
  if(absent.includes(id)){

    absent =
      absent.filter(
        x => String(x).trim() != id
      );

    hwIncomplete =
      hwIncomplete.filter(
        x => String(x).trim() != id
      );

    attBox.className = "box present";
    attBox.innerHTML = "✅ Present";

    hwBox.className = "box hwdone";
    hwBox.innerHTML = "📘 HW Done";

    hwBox.style.opacity = "1";
    hwBox.style.pointerEvents = "auto";
  }

  // MAKE ABSENT
  else{

    absent.push(id);

    if(!hwIncomplete.includes(id)){
      hwIncomplete.push(id);
    }

    attBox.className = "box absent";
    attBox.innerHTML = "❌ Absent";

    hwBox.className = "box hwmiss";
    hwBox.innerHTML = "⚠️ HW Missing";

    hwBox.style.opacity = "0.6";
    hwBox.style.pointerEvents = "none";
  }
}

// ===============================
// TOGGLE HW
// ===============================

function toggleHW(id){

  vibrate();

  id = String(id).trim();

  const box =
    document.getElementById(`hw-${id}`);

  // HW DONE
  if(hwIncomplete.includes(id)){

    hwIncomplete =
      hwIncomplete.filter(
        x => String(x).trim() != id
      );

    box.className = "box hwdone";
    box.innerHTML = "📘 HW Done";
  }

  // HW MISSING
  else{

    hwIncomplete.push(id);

    box.className = "box hwmiss";
    box.innerHTML = "⚠️ HW Missing";
  }
}