对Ajax的封装

1. 首先要创建一个XMLHttpRequest()对象，创建时需要考虑兼容性，主要是针对低版本的IE兼容
2. 再调用ajax的open()方法 来判断请求方式 是 GET还是POST 
  1. 如果是GET请求 则需要判断是否需要拼接参数，再调用send()方法
  2. 如果是POST请求，则需要在调用send()方法之前调用setRequestHeader("Content-Type","application/x-www-form-urlencoded");

3. 判断完是哪种类型的请求后再判断  请求是异步还是同步
	1. 如果是同步请求直接判断xhr.status 状态码
	2. 如果是异步请求则现需要判断xhr.readyState 状态码再判断xhr.status 状态码
	
**因为无论同步还是异步都需要判断 xhr.status 状态码 所以可以写成一个函数**


传递的参数
包括了 method url data async 以及两个回调函数来帮助说明请求的结果



 *  method:请求方式
 *  url：请求的接口：
 *  data：url请求参数
 *  async:是否是异步请求
 *  success：请求成功回调函数
 *  failure：请求失败回调函数

