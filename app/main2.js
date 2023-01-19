var data = {
    "info":{
        "per_page":3,
        "count":3,
        "page":1,
        "sort_by":"id",
        "sort_order":"asc",
        "more_records":true
        }
}

window.ctr = data.info.page
function nextPage(){
    window.ctr++;
    console.log(window.ctr);
    document.getElementById("pageNumber").innerHTML = "Page: " + JSON.stringify(window.ctr);
    data.info['page'] = window.ctr
    console.log(data.info)
}

function previousPage(){
    if (window.ctr > 1) {
        window.ctr--;
        console.log(window.ctr);
        document.getElementById("pageNumber").innerHTML = "Page: " + JSON.stringify(window.ctr);
        data.info['page'] = window.ctr
        console.log(data.info)
    } 
  
    else {
    
    }
}