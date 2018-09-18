function getText(id){
    let tag = document.getElementById(id).textContent;
    document.getElementById("tags").value += tag + ",";
    document.getElementById("idTags").value += id + ',';
}