//initializes the ZOHO SDK
ZOHO.embeddedApp.on("PageLoad",function(data)
{
//DISPLAY INITIAL DATA FOR THE FIRST PAGE
	console.log(data);
    ZOHO.CRM.API.getAllRecords({
      Entity:"Leads",
      sort_order:"asc",
      per_page:2, //MAXIMUM OF 200 RECORDS PER PAGE
      page: 1
    })
  .then(function(data){
    window.objData = data
    window.moreRecords = data.info.more_records
    let placeholder = document.querySelector("#data-output")
    let out = ""
    for (let item of data.data) {
      out += `
        <tr>
            <td class="table-dark">${item.id}</td>
            <td class="table-dark">${item.Full_Name}</td>
            <td class="table-dark">${item.Email}</td>
        </tr>
      `;
    }
    placeholder.innerHTML = out
    window.ctr = data.info.page;
  })
})
//initializes the ZOHO SDK

//FUNCTION TO FETCH A NEW JSON RESPONSE
function getRecords(page = 1, bool = true) {
  ZOHO.CRM.API.getAllRecords({
    Entity:"Leads",
    sort_order:"asc",
    per_page:2, //MAXIMUM OF 200 RECORDS PER PAGE
    page: page
  })
  .then(function(data){
    try {
      window.moreRecords = data.info.more_records
    } 
    
    catch (error) {
      window.moreRecords = false
    }
    bool = window.moreRecords
    console.log(bool)
    // objectArray = data.data ARRAY OF OBJECTS or data.data[index]
    window.objData = data
    let placeholder = document.querySelector("#data-output")
    let out = ""
    for (let item of data.data) {
      out += `
        <tr>
            <td class="table-dark">${item.id}</td>
            <td class="table-dark">${item.Full_Name}</td>
            <td class="table-dark">${item.Email}</td>
        </tr>
      `;
    }
    placeholder.innerHTML = out
  })
}

//FUNCTION THAT TRIGGERS UPON CLICKING NEXT PAGE
function nextPage(){
  moreRecs = window.moreRecords
  console.log(moreRecs)
  if (moreRecs == true) {
    window.ctr++;
    document.getElementById("pageNumber").innerHTML = "Page: " + JSON.stringify(window.ctr);
    window.objData.info['page'] = window.ctr
    //CALL getRecords FUNCTION THAT FETCHES NEW JSON RESPONSE AND SEND THE COUNTER AS A PARAMETER FOR PAGE KEY
    getRecords(window.ctr, moreRecs) 
  }
  else {
  
  }
}

//FUNCTION THAT TRIGGERS UPON CLICKING PREVIOUS PAGE 
function previousPage(){
  if (window.ctr > 1) {
    window.ctr--;
    document.getElementById("pageNumber").innerHTML = "Page: " + JSON.stringify(window.ctr);
    window.objData.info['page'] = window.ctr
    //CALL getRecords FUNCTION THAT FETCHES NEW JSON RESPONSE AND SEND THE COUNTER AS A PARAMETER FOR PAGE KEY
    getRecords(window.ctr)
  } 
  else {
  
  }
}
ZOHO.embeddedApp.init();