//  Create XMLHttpRequest 

const newRequest = ()=>{
	if(typeof XMLHttpRequest !== 'undefined'){
		return new XMLHttpRequest()
	}
	return new ActiveXObject('Microsoft.XMLHTTP')
}

const parseDatas = (data)=>{
	let arr = []
	Object.keys(data).map((item, index)=>{
		const str = `${item}=${data[item]}`
		arr.push(str)
	})

	return arr.join('&') //output ket1=value1&key2=value2 etc
}

const callBack = (xhr, obj)=>{

	const {
		success,
		failure
	} = obj
	
	xhr.status == 200 ? success(xhr.responseText) : failure(xhr.status)
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
		xhr.onreadystatechange = function() {
			xhr.readyState == 4 ? callBack(xhr, obj) : ''
		}
	}else{
		callBack(xhr, obj)
	}
}
