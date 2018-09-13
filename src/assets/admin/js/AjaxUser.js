function createObj(){
    let bower = navigator.appName;
    let obj = null;
    if(bower  === 'Microsoft Internet Explorer'){
        obj = new ActiveXObject('Microsoft.XMLHTTP');
    }else{
        obj = new XMLHttpRequest();
    }
    return obj;
}
let http = createObj();
function getData(id){
    http.open('GET', 'id?id='+id);
    http.onreadystatechange = function(){
        if(http.readyState === 4 && http.status === 200){
            let id = http.responseText;
            $('#'+id).remove();
        }
    }
    http.send(null);
}

function clickDelete(id){
    var accept = confirm('Bạn có chắc chắn muốn xóa?');
    if(accept){
        getData(id);
        $("#notice").fadeIn();
        $('#notice').fadeOut(1500);
    }
}