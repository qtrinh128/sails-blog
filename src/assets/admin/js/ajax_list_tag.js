function createObj() {
    let bower = navigator.appName;
    let obj = null;
    if (bower === 'Microsoft Internet Explorer') {
      obj = new ActiveXObject('Microsoft.XMLHTTP');
    } else {
      obj = new XMLHttpRequest();
    }
    return obj;
  }
  
  let http = createObj();
  
  function handDelete(id) {
    http.open('GET', 'delete-tag?id=' + id);
    http.onreadystatechange = function () {
      if (http.readyState === 4 && http.status === 200) {
        let id = http.responseText;
        $('#' + id).remove();
      }
    }
    http.send(null);
  }
  
  function clickDelete(id) {
    let cfm = confirm('Bạn có chắc chắn muốn xóa?');
    if (cfm) {
      handDelete(id);
    }
  }