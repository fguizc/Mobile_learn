'use strict';

var newRequest = function newRequest() {
  if (typeof XMLHttpRequest !== 'undefined') {
    return new XMLHttpRequest();
  }
  return new ActiveXObject('Microsoft.XMLHTTP');
};

var parseDatas = function parseDatas(data) {
  var arr = [];
  for (var i in data) {
    var str = i + '=' + data[i];
    arr.push(str);
  }
  return arr.join('&'); //output ket1=value1&key2=value2 etc
};

var callBack = function callBack(xhr, obj) {
  xhr.status == 200 ? obj.success(xhr.responseText) : obj.failure(xhr.status);
};

var ajaxPacking = function ajaxPacking(obj) {
  var flag = 0,
      xhr = newRequest();
  obj.data = parseDatas(obj.data);

  // if method == get
  if (/get/i.test(obj.method)) {
    obj.url += obj.data.legnth > 0 ? '?' + obj.data : '';
    flag = 1;
  }

  xhr.open(obj.method, obj.url, obj.async);
  if (flag) {
    send(null);
  } else {
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(obj.data);
  }
  if (obj.async) {
    xhr.onreadystatechange = function () {
      xhr.readyState == 4 ? callBack(xhr, obj) : '';
    };
  } else {
    callBack(xhr, obj);
  }
};
