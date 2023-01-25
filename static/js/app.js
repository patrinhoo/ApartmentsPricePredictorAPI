function getRoomsNr() {
  const uiRoomsNr = document.getElementsByName("uiRoomsNr");
  for (let i in uiRoomsNr) {
    if (uiRoomsNr[i].checked) {
      return parseInt(i) + 1;
    }
  }
  return -1; // Invalid Value
}

function getBathroom() {
  const uiBathroom = document.getElementsByName("uiBathroom");
  for (let i in uiBathroom) {
    if (uiBathroom[i].checked) {
      return uiBathroom[i].value;
    }
  }
  return -1; // Invalid Value
}

async function onClickedEstimatePrice() {
  // console.log("Estimate price button clicked");
  const area = document.getElementById("uiArea");
  const rooms_nr = getRoomsNr();
  const voivodeship = document.getElementById("uiVoivodeship");
  const floor = document.getElementById("uiFloor");
  const building_style = document.getElementById("uiBuildingStyle");
  const building_floors = document.getElementById("uiBuildingFloors");
  const kitchen = document.getElementById("uiKitchen");
  const parking = document.getElementById("uiParking");
  const condition = document.getElementById("uiCondition");
  const material = document.getElementById("uiMaterial");
  const bathroom = getBathroom();
  const estPrice = document.getElementById("uiEstimatedPrice");

  if (!area.value) alert("Musisz podać powierzchnię mieszkania!");
  else if (!floor.value)
    alert("Musisz podać piętro na którym znajduje się mieszkanie!");
  else if (!building_floors.value)
    alert("Musisz podać liczbę pięter w budynku!");
  else if (!voivodeship.value) alert("Musisz wybrać województwo!");
  else if (!building_style.value) alert("Musisz wybrać rodzaj zabudowy!");
  else if (!kitchen.value) alert("Musisz wybrać rodzaj kuchni!");
  else if (!parking.value) alert("Musisz wybrać rodzaj parkingu!");
  else if (!condition.value) alert("Musisz wybrać stan mieszkania!");
  else if (!material.value)
    alert("Musisz wybrać materiał z którego zbudowane jest mieszkanie!");
  else {
    const response = await fetch("/api/predict_apartment_price/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        area: area.value,
        voivodeship: voivodeship.value,
        rooms_nr: rooms_nr,
        floor: floor.value,
        building_style: building_style.value,
        building_floors: building_floors.value,
        kitchen: kitchen.value,
        parking: parking.value,
        condition: condition.value,
        material: material.value,
        bathroom: bathroom,
      }),
    });

    if (response.status === 200) {
      const data = await response.json();

      estPrice.innerHTML = "<b>" + data.price?.toString() + " zł</b>";
    } else {
      alert("Podczas wyznaczania wartości mieszkania wystąpił błąd!");
    }
  }
}

async function onPageLoad() {
  // console.log("document loaded");

  /////////////////////////////////////////
  // console.log("got response for get_voivodeships_names request");
  const response = await fetch("/api/get_voivodeships_names", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status === 200) {
    const voivodeships = await response.json();
    const uiVoivodeship = document.getElementById("uiVoivodeship");

    for (let i in voivodeships) {
      const opt = new Option(voivodeships[i]);
      uiVoivodeship.append(opt);
    }
  } else {
    alert("Nie udało się wczytać województw!");
  }

  /////////////////////////////////////////
  // console.log("got response for get_building_styles request");
  const response2 = await fetch("/api/get_building_styles", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response2.status === 200) {
    const building_styles = await response2.json();
    const uiBuildingStyle = document.getElementById("uiBuildingStyle");

    for (let i in building_styles) {
      const opt = new Option(building_styles[i]);
      uiBuildingStyle.append(opt);
    }
  } else {
    alert("Nie udało się wczytać rodzajów zabudowy!");
  }

  /////////////////////////////////////////
  // console.log("got response for get_kitchens request");
  const response3 = await fetch("/api/get_kitchens", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response3.status === 200) {
    const kitchens = await response3.json();
    const uiKitchens = document.getElementById("uiKitchen");

    for (let i in kitchens) {
      const opt = new Option(kitchens[i]);
      uiKitchens.append(opt);
    }
  } else {
    alert("Nie udało się wczytać rodzajów kuchni!");
  }

  /////////////////////////////////////////
  // console.log("got response for get_parkings request");
  const response4 = await fetch("/api/get_parkings", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response4.status === 200) {
    const parkings = await response4.json();
    const uiParkings = document.getElementById("uiParking");

    for (let i in parkings) {
      const opt = new Option(parkings[i]);
      uiParkings.append(opt);
    }
  } else {
    alert("Nie udało się wczytać rodzajów parkingu!");
  }

  /////////////////////////////////////////
  // console.log("got response for get_conditions request");
  const response5 = await fetch("/api/get_conditions", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response5.status === 200) {
    const conditions = await response5.json();
    const uiConditions = document.getElementById("uiCondition");

    for (let i in conditions) {
      const opt = new Option(conditions[i]);
      uiConditions.append(opt);
    }
  } else {
    alert("Nie udało się wczytać stanów mieszkania!");
  }

  /////////////////////////////////////////
  // console.log("got response for get_materials request");
  const response6 = await fetch("/api/get_materials", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response6.status === 200) {
    const materials = await response6.json();
    const uiMaterials = document.getElementById("uiMaterial");

    for (let i in materials) {
      const opt = new Option(materials[i]);
      uiMaterials.append(opt);
    }
  } else {
    alert(
      "Nie udało się wczytać materiałów z których zbudowane jest mieszkanie!"
    );
  }

  /////////////////////////////////////////
  // console.log("got response for get_floors request");
  const response7 = await fetch("/api/get_floors", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response7.status === 200) {
    const floors = await response7.json();
    const uiFloors = document.getElementById("uiFloor");
    const uiBuildingFloors = document.getElementById("uiBuildingFloors");

    for (let i in floors) {
      const opt = new Option(floors[i]);
      uiFloors.append(opt);

      const opt2 = new Option(floors[i]);
      uiBuildingFloors.append(opt2);
    }
  } else {
    alert("Nie udało się wczytać dostępnych pięter!");
  }
}

window.onload = onPageLoad;
