import { messes } from './messDatabase.js';
const wrapper = document.querySelector(".page-wrapper");

document.querySelector(".findbtn").addEventListener("click", function(){
    let filteredMesses  = [];
    console.log("Button clicked");

    const minfeeInput = document.querySelector(".js-minfee-input").value;
    const maxfeeInput = document.querySelector(".js-maxfee-input").value;
    const areaInput = document.querySelector(".js-area-input").value;
    const errorMsg = document.querySelector(".error-msg");

    const minfee = minfeeInput === "" ? null : Number(minfeeInput);
    const maxfee = maxfeeInput === "" ? null : Number(maxfeeInput);
    const area = areaInput === "" ? null : areaInput.toLowerCase();

    console.log(minfee, maxfee, area);

    if(minfee === null || maxfee === null || area === null){
      errorMsg.textContent = "⚠️ Please fill all the fields";
      return;
    }else{
      errorMsg.textContent = ""; // clear error
      console.log("All inputs filled");
    }

    if(minfee >= 0 ){
      if(maxfee >= minfee){
        messes.forEach(function(mess){
        if(mess.mess_fee >= minfee && mess.mess_fee <= maxfee && mess.address.toLowerCase() === area){
            filteredMesses.push(mess);
          }
        });
      }else{
        errorMsg.textContent = "⚠️ MINFEE should be less than MAXFEE";
        console.log("⚠️ MINFEE should be less than MAXFEE");
        return;
      }
    }else{
      errorMsg.textContent = "⚠️ MINFEE should not be Negative";
      console.log("⚠️ MINFEE should not be Negative");
      return;
    }
    
    
    console.log(filteredMesses);
    wrapper.classList.add("active");  // move layout

    const messList = document.querySelector(".js-messList");
    messList.innerHTML = "";
    filteredMesses.forEach(function(mess) {
      messList.innerHTML += `
        <div class="mess-card">
            <h3>${mess.mess_name}</h3>
            <p>Fee: ₹${mess.mess_fee}</p>
            <p>Timing: <span>Morning: ${mess.timing.morning}</span> &  
            <span>Night: ${mess.timing.night}</span></p>
            <p>About: ${mess.about}</p>
            <p>Contacts: ${mess.contacts.phone}</p>
            <p>Area: ${mess.address}</p>
        </div>
      `;
    });

    if (filteredMesses.length === 0) {
      messList.innerHTML = "⚠️ No mess found";
    }
})