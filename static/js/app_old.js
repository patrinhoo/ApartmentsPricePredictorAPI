function getRoomsNr() {
  var uiRoomsNr = document.getElementsByName("uiRoomsNr");
  for (var i in uiRoomsNr) {
    if (uiRoomsNr[i].checked) {
      return parseInt(i) + 1;
    }
  }
  return -1; // Invalid Value
}

function getBathroom() {
  var uiBathroom = document.getElementsByName("uiBathroom");
  for (var i in uiBathroom) {
    if (uiBathroom[i].checked) {
      return uiBathroom[i].value;
    }
  }
  return -1; // Invalid Value
}

function onClickedEstimatePrice() {
  console.log("Estimate price button clicked");
  var area = document.getElementById("uiArea");
  var rooms_nr = getRoomsNr();
  var voivodeship = document.getElementById("uiVoivodeship");
  var floor = document.getElementById("uiFloor");
  var building_style = document.getElementById("uiBuildingStyle");
  var building_floors = document.getElementById("uiBuildingFloors");
  var kitchen = document.getElementById("uiKitchen");
  var parking = document.getElementById("uiParking");
  var condition = document.getElementById("uiCondition");
  var material = document.getElementById("uiMaterial");
  var bathroom = getBathroom();
  var estPrice = document.getElementById("uiEstimatedPrice");

  var url = "http://127.0.0.1:8000/api/predict_apartment_price/"; //Use this if you are NOT using nginx which is first 7 tutorials
  // var url = "/api/predict_apartment_price"; // Use this if  you are using nginx. i.e tutorial 8 and onwards

  $.post(
    url,
    {
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
    },
    function (data, status) {
      if (status === "success")
        estPrice.innerHTML = "<b>" + data.price?.toString() + " zł</b>";
    }
  );
}

function onPageLoad() {
  console.log("document loaded");
  var url1 = "http://127.0.0.1:8000/api/get_voivodeships_names/"; // Use this if you are NOT using nginx which is first 7 tutorials
  // var url = "/api/get_voivodeships_names"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
  $.get(url1, function (data, status) {
    console.log("got response for get_voivodeships_names request");
    if (data) {
      var voivodeships = data;
      var uiVoivodeship = document.getElementById("uiVoivodeship");
      // $('#uiVoivodeship').empty();
      for (var i in voivodeships) {
        var opt = new Option(voivodeships[i]);
        $("#uiVoivodeship").append(opt);
      }
    }
  });

  var url2 = "http://127.0.0.1:8000/api/get_building_styles/"; // Use this if you are NOT using nginx which is first 7 tutorials
  // var url = "/api/get_building_styles"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
  $.get(url2, function (data, status) {
    console.log("got response for get_building_styles request");
    if (data) {
      var building_styles = data;
      var uiBuildingStyle = document.getElementById("uiBuildingStyle");
      // $('#uiBuildingStyle').empty();
      for (var i in building_styles) {
        var opt = new Option(building_styles[i]);
        $("#uiBuildingStyle").append(opt);
      }
    }
  });

  var url3 = "http://127.0.0.1:8000/api/get_kitchens/"; // Use this if you are NOT using nginx which is first 7 tutorials
  // var url = "/api/get_kitchens"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
  $.get(url3, function (data, status) {
    console.log("got response for get_kitchens request");
    if (data) {
      var kitchens = data;
      var uiKitchens = document.getElementById("uiKitchen");
      // $('#uiKitchen').empty();
      for (var i in kitchens) {
        var opt = new Option(kitchens[i]);
        $("#uiKitchen").append(opt);
      }
    }
  });

  var url4 = "http://127.0.0.1:8000/api/get_parkings/"; // Use this if you are NOT using nginx which is first 7 tutorials
  // var url = "/api/get_parkings"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
  $.get(url4, function (data, status) {
    console.log("got response for get_parkings request");
    if (data) {
      var parkings = data;
      var uiParkings = document.getElementById("uiParking");
      // $('#uiParking').empty();
      for (var i in parkings) {
        var opt = new Option(parkings[i]);
        $("#uiParking").append(opt);
      }
    }
  });

  var url5 = "http://127.0.0.1:8000/api/get_conditions/"; // Use this if you are NOT using nginx which is first 7 tutorials
  // var url = "/api/get_conditions"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
  $.get(url5, function (data, status) {
    console.log("got response for get_conditions request");
    if (data) {
      var conditions = data;
      var uiConditions = document.getElementById("uiCondition");
      // $('#uiCondition').empty();
      for (var i in conditions) {
        var opt = new Option(conditions[i]);
        $("#uiCondition").append(opt);
      }
    }
  });

  var url6 = "http://127.0.0.1:8000/api/get_materials/"; // Use this if you are NOT using nginx which is first 7 tutorials
  // var url = "/api/get_materials"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
  $.get(url6, function (data, status) {
    console.log("got response for get_materials request");
    if (data) {
      var materials = data;
      var uiMaterials = document.getElementById("uiMaterial");
      // $('#uiMaterial').empty();
      for (var i in materials) {
        var opt = new Option(materials[i]);
        $("#uiMaterial").append(opt);
      }
    }
  });

  var url7 = "http://127.0.0.1:8000/api/get_floors/"; // Use this if you are NOT using nginx which is first 7 tutorials
  // var url = "/api/get_floors"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
  $.get(url7, function (data, status) {
    console.log("got response for get_floors request");
    if (data) {
      var floors = data;
      var uiFloors = document.getElementById("uiFloor");
      var uiBuildingFloors = document.getElementById("uiBuildingFloors");
      // $('#uiFloor').empty();
      // $('#uiBuildingFloors').empty();
      for (var i in floors) {
        var opt = new Option(floors[i]);
        $("#uiFloor").append(opt);
      }
      for (var i in floors) {
        var opt = new Option(floors[i]);
        $("#uiBuildingFloors").append(opt);
      }
    }
  });
}

window.onload = onPageLoad;
