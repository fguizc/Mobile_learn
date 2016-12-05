//  Create XMLHttpRequest 

const newRequest = ()=>{
	if(typeof XMLHttpRequest !== 'undefined'){
		return new XMLHttpRequest()
	}
	return new ActiveXObject('Microsoft.XMLHTTP')
}
// data is object, i is key data[i] is value
// data = {
//	 i:data[i]
// }
const parseDatas = (data)=>{
	let arr = []
	for(let i in data){
		let str = i + '=' + data[i]
		arr.push(str)
	}
	return arr.join('&') //output ket1=value1&key2=value2 etc
}

const ajaxPacking = (obj)=>{
	let flag = 0,
		xhr  = newRequest()
	obj.data = parseDatas(obj.data)

// if method == get
	if(/get/i.test(obj.method)){
		obj.url += obj.data.legnth > 0 ? ('?'+obj.data) : ''
		flag = 1
	}

	xhr.open(obj.method,obj.url,obj.async)
	if(flag){
		send(null)
	}else {
		xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
		xhr.send(obj.data)
	}

	if(obj.async){
		xhr.onreadystatechange = ()=>{
			xhr.readState == 4 ? callBack() : ''
		}
	}else{
		callBack()
	}
}

const callBack = ()=>{
	xhr.status == 200 ? obj.success(xhr.responseText) : obj.failure(xhr.status)
}


ajaxPacking({
	method:'get',
	url:'http://localhost:8080/ajax/path',
	data:{
		name:'tom',
		age:12,
	},
	async:true,
	success:(responseText)=>{
		console.log('request is responsed '+ responseText)
	},
	failure:(errorCode)=>{
		console.log('request is error '+ errorCode)
	}
})
