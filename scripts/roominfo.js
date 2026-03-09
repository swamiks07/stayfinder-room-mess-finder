import {hostelDB} from './hostelDatabase.js';

const wrapper = document.querySelector(".page-wrapper");
document.querySelector(".findbtn").addEventListener("click", function(){
  let filteredRooms = [];
  console.log("Button clicked");

  const minrentInput = document.querySelector(".js-minrent-input").value;
  const maxrentInput = document.querySelector(".js-maxrent-input").value;
  const locationInput = document.querySelector(".js-location-input").value;
  const errorMsg = document.querySelector(".error-msg");

  const minrent = minrentInput === "" ? null : Number(minrentInput);
  const maxrent = maxrentInput === "" ? null : Number(maxrentInput);
  const location = locationInput === "" ? null : locationInput.toLowerCase();

  console.log(minrent, maxrent, location);

  if(minrent === null || maxrent === null || location === null){
    errorMsg.textContent = "⚠️ Please fill all the fields";
    return;
  }else{
    errorMsg.textContent = ""; // clear error
    console.log("All inputs filled");
  }

  if(minrent >= 0 ){
    if(maxrent >= minrent){
      hostelDB.forEach(function(room){
        let searchwords = location.split(" ");
        let address = (room.hostel_address.area + " " + room.hostel_address.city).toLowerCase();
        let isMatch = searchwords.every(word => address.includes(word));
        if(room.room_rent >= minrent && room.room_rent <= maxrent && isMatch){
          filteredRooms.push(room);
        }
      });
    }else{
      errorMsg.textContent = "⚠️ MINRENT should be less than MAXRENT";
      console.log("⚠️ MINRENT should be less than MAXRENT");
      return;
    }

  }else{
    errorMsg.textContent = "⚠️ MINRENT should not be Negative";
    console.log("⚠️ MINRENT should not be Negative");
    return;
  }

  console.log(filteredRooms);
  wrapper.classList.add("active");  // move layout
 
  const roomList = document.querySelector(".js-roomList");
    roomList.innerHTML = "";
    filteredRooms.forEach(function(room) {
      roomList.innerHTML += `
        <div class="room-card">
            <h3>${room.property_name}</h3>
            <p>Type: ${room.property_type}</p>
            <p>Accommodation:${room.accommodation}</p>
            <p>Room Size: ${room.room_size}</p>
            <p>Room Rent: ₹${room.room_rent}</p>
            <p>Security deposit/Advance: ₹${room.security_deposit}</p>
            <p>Facilities: ${room.facilities}</p>
            <p>Rules & Policies: ${room.rules_and_policies}</p>
            <h4>Owner Details:</h4>
            <p>Owner Name: ${room.owner_details.owner_name}</p>
            <p>Phone no.: ${room.owner_details.contact_phone}</p>
            <p>Whatsapp no.: ${room.owner_details.whatsapp}</p>
            <h4>Hostel Address:</h4>
            <p>${room.hostel_address.area}, ${room.hostel_address.city}, ${room.hostel_address.pincode}</p>
            <p>Landmark: ${room.hostel_address.landmark}</p>
        </div>
      `;
    });

    if (filteredRooms.length === 0) {
      roomList.innerHTML = "⚠️ No Hostel/Rooms found";
    }

});