
angular.module('myServices',[])

.service('loginServices', function($state){

	return {
		goLoginPage : ()=>{
			$state.go('login')
		},
		goSigninPage : ()=>{
			$state.go('signin')
		}
	}
})

.service('getHomeDataServices',function($http){
	let page = [],
		list = []
	return {
		requestDatalist: (cid,callback)=>{
			console.log('开始请求首页的热门推荐数据')
			!page[cid] ? page[cid]=1 : ''

			const url= `http://www.phonegap100.com/appapi.php?a=getPortalList&catid=${cid}&page=${page[cid]}&callback=JSON_CALLBACK`;
			console.log(url)
			$http.jsonp(url).success((data)=>{
				// console.log(data.result)
				callback(data)
				page[cid]++
			}).error(function(err){
				console.log('请求错误'+err)
			})
		}
	}
})

.service('getContentDataServices',function($http){
	return {
		requestData: (aid,callback)=>{
			const url = `http://www.phonegap100.com/appapi.php?a=getPortalArticle&aid=${aid}&callback=JSON_CALLBACK`
			$http.jsonp(url).success((data)=>{
				console.log('请求具体内容数据成功')
				callback(data)
			}).error((error)=>{
				console.log('请求文章数据错误'+error)
			})
		}
	}
})

.service('storageServices',function(){
	return {
		setItem: (key,obj)=>{
			//先判断本地是否已存在
			//若存在取出数据解析
			//[{aid:xxx,title:xxx,pic:xxx},
			// {}]
			//若不存在直接存储一个新的key+value
			//若存在则再一次点击的时候需要取消
			console.log('开始执行存储方法')
			let arr = []
			if(localStorage.getItem(key)){
				arr = JSON.parse(localStorage.getItem(key))
				console.log('判断以完成')
				for(let i in arr){
					if(obj.aid === arr[i].aid){
						console.log('当前收藏目标已存在收藏夹')

						return;
					}
				}
			}
			arr.push(obj)
			arr = JSON.stringify(arr)
			localStorage.setItem(key,arr);
			console.log('存储已完成')
			console.log(localStorage.getItem(key))
		},
		getItem: (key,id)=>{

			if(localStorage.getItem(key)){
				let arr = JSON.parse(localStorage.getItem(key))
				console.log('打印当前收藏夹所有数据'+arr,arr.length)
				for(let i in arr){
					console.log('当前页面id为'+id,'当前遍历数据id为'+arr[i].aid)
					if(id === arr[i].aid){
						console.log('存在相同文章')
						return false;
					}else{
						console.log('不存在相同')

					}
				}
				return true;
			}else{
				console.log('压根没数据')
				return true;
			}

		}
	}
})

.service('formConfirmServices',function(){
	return{
		checkName : (val)=>{
			console.log(val)
			if(val.length==0){return '手机号不能为空' }
			const reg = /^1[345678]\d{9}$/
			return reg.test(val)
		},
		checkPass : (val)=>{
			if(val.length==0){
				return '密码不能为空'
			}
			val = val.trim()
			if(val.length<8 || val.length>25){
				return obj = {
					str: '密码不能小于8位或超过25位',
					result: false
				}
			}else{
				return obj = {
					// pass: val,
					str: '密码合法',
					result: true
				}
			}
		},
		checkRePass : (val,oldval)=>{
			console.log(val,oldval)
			if(val!==oldval){
				return obj = {
					str: '两次密码输入不一致，请重试',
					result: false
				}
			}else{
				return obj = {
					str: '密码一致',
					result: true
				}
			}
		}

	}

})
