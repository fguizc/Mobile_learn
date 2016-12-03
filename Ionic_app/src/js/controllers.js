
const myCtrl = angular.module('myController',[])

// myCtrl.controller('')

myCtrl.controller('homeCtrl', function($scope,getHomeDataServices,$ionicSlideBoxDelegate){
	let isLoadMore = true,
		list  	   = [];
	$scope.isLoadMore = true

	$scope.loadMore = function(){
		getHomeDataServices.requestDatalist(cid=20,function(data){
			//判断剩余数据的长度
			if( data.result.length < 20 ){
				isLoadMore = false
			}
			list[cid] ? list[cid]=list[cid].concat(data.result) : list[cid]=data.result
			$scope.isLoadMore = isLoadMore
			$scope.hot_list   = list[cid]
		})
		$scope.$broadcast('scroll.infiniteScrollComplete')
	}
})

myCtrl.controller('healthCtrl', function(){

})

myCtrl.controller('findCtrl', function($scope,$rootScope,getHomeDataServices){


	let isLoadMore = true,
		list  	   = [],
		num		   = 20;//默认请求数据端口20的数据
	$scope.isLoadMore = true
	$scope.loadMore = function(){
		getHomeDataServices.requestDatalist(num,function(data){
			console.log(num)
			//判断剩余数据的长度
			if( data.result.length < 20 ){
				isLoadMore = false
			}
			console.log(list)
			console.log(Array.isArray(data.result))
			list[num] ? list[num]=list[num].concat(data.result) : list[num]=data.result ;
			$scope.isLoadMore = isLoadMore
			$scope.hot_list   = list[num]
		})
		$scope.$broadcast('scroll.infiniteScrollComplete')
	}

	//定义subheader中item的名称和请求数据的端口号
	$scope.cates = [
		{title:'健康资讯',catid:'20'},
		{title:'健康保健',catid:'18'},
		{title:'健康秘方',catid:'15'},
		{title:'小秘方'  ,catid:'11'}
	]

	$scope.getCateDate = function(index,catid){
		num = catid
		console.log('num被修改')
		let oLi = document.querySelectorAll('.subheader_list > li')
		for( let i = 0 ; i < oLi.length ; i++){
			oLi[i].classList.remove('select')
		}
		oLi[index].classList.add('select')

		// 请求数据
		console.log('开始请求当前点击tab的数据')
		getHomeDataServices.requestDatalist(catid,function(data){
			//判断剩余数据
			if( data.length < 20 ){
				isLoadMore = false
			}
			console.log('进入回调')
			// list[catid] = list[catid].concat(data)
			list[catid] ? list[catid]=list[catid].concat(data.result) : list[catid]=data.result ;
			$scope.isLoadMore = isLoadMore
			$scope.hot_list   = list[catid]

		})
		$scope.$broadcast('scroll.infiniteScrollComplete')

	}

	/*执行销毁事件*/
	// $scope.$on('$destroy',()=>{
	// 	$rootScope.hideTabs = ' ';
	// })

})

myCtrl.controller('findcontentCtrl', function($scope,$stateParams,$rootScope,$ionicPopup,getContentDataServices,storageServices){

	const KEY = 'myCollection'
	let aid = $stateParams.aid
	$scope.isShowLoading = true  //用来展示加载gif
  	$scope.isChangeColor = true//用来展示收藏图标样式

	$scope.$on('$ionicView.beforeEnter', function() {
        $rootScope.hideTab='tabs-item-hide';   /*隐藏底部tab切换*/
        console.log('newscontentCtrl-beforeEnter');

				$scope.isChangeColor = storageServices.getItem(KEY,aid)
				console.log($scope.isChangeColor)
				if(typeof $scope.isChangeColor == 'undefined' ){
					$scope.isChangeColor = true;
				}
    });


    /*页面销毁的时候执行的事件  tab切换的时候不会销毁    新闻详情返回新闻列表的时候才会销毁*/
  $scope.$on('$destroy',function(){
      console.log('newscontentCtrl-$destroy');
      $rootScope.hideTab='';  /*显示底部tab切换*/
    })

	getContentDataServices.requestData(aid,function(data){
			$scope.item = data.result[0]
			$scope.isShowLoading = false
			$scope.newitem = {aid: $scope.item.aid,
							  pic: 'http://www.phonegap100.com/data/attachment/'+$scope.item.pic+'.thumb.jpg',
			     			  title: $scope.item.title}
		})

	//收藏并改变对应图标样式

	$scope.storage = ()=>{


		if($scope.isChangeColor === false ){
			//证明已收藏
			var confirmPopup = $ionicPopup.confirm({
       title: '',
       template: '取消收藏?'
     });
     confirmPopup.then(function(res) {
       if(res) {
				 $scope.isChangeColor = !$scope.isChangeColor
				 let arr = JSON.parse(localStorage.getItem(KEY))
				 for(let j in arr){
					 if( aid = arr[j].aid){
						 arr.splice(j,1)
						 localStorage.setItem(KEY,JSON.stringify(arr))
						 console.log('删除后'+localStorage.getItem(KEY))
					 }
				 }
         console.log('You are sure');
				 return;
       } else {
         console.log('You are not sure');
       }
     });
	 }else{
		 $scope.isChangeColor = !$scope.isChangeColor
		 storageServices.setItem(KEY,$scope.newitem)
	 }

		//如果当前已收藏，再次点击则取消收藏

	}

	//载入页面判断当前页面是否存在收藏夹内

	//设置字体大小的方法
	//设置字体大小的断点
	$scope.fontSizeList = [
		{title:'特大字号',value:'s_26'},
		{title:'大字号'  ,value:'s_22'},
		{title:'中字号'  ,value:'s_18'},
		{title:'小字号'  ,value:'s_14'}
	]
	//判断localStorage内是否存在已经设置过的字体大小样式，若有则应用
	const FONTKEY = 'fontSize' //设置存储字体样式的localStorage的key
	let   isSelectedFont = localStorage.getItem(FONTKEY)
	if(isSelectedFont){
		$scope.select_font = isSelectedFont
		$scope.font ={
			select:$scope.select_font
		}
	}else{
		$scope.font={
			select:'s_18'//若不存在之前设置过，默认18px
		}
		$scope.select_font = $scope.font.select
	}


	$scope.setFontSize = ()=>{
		const myPopup = $ionicPopup.show({
			templateUrl:'templates/find/fontSize.html',
			title:'正文字体',
			scope:$scope,
			buttons:[
				{ text: '取消' },
				{
					text: '<b>确定</b>',
					type: 'button-positive',
					onTap: function(e){
						$scope.select_font = $scope.font.select;
						//保存到localStorage
						localStorage.setItem(FONTKEY,$scope.select_font)
					}
				}
			]
		})
	}



})

myCtrl.controller('userCtrl', function($scope,$state,$rootScope,loginServices){

	$scope.goLoginPage = ()=>{
		loginServices.goLoginPage()
		$rootScope.isFirst = false
	}
	$scope.goSigninPage = ()=>{
		loginServices.goSigninPage()
		$rootScope.isFirst = true
	}


 	$scope.colleList = JSON.parse(localStorage.getItem('myCollection'))

})

myCtrl.controller('loginCtrl', function($scope,$state,$ionicHistory,formConfirmServices,loginServices){

	$scope.count = { 
		name : '',
		psw  : '',
		repsw: ''
	}

	$scope.result = {
		name : false,
		psw  : false,
		repsw: false
	}


	$scope.goSigninPage = ()=>{
		loginServices.goSigninPage()
		console.log('执行了点击事件')
	}


	$scope.verifyName = ()=>{
		let a = formConfirmServices.checkName($scope.count.name)
		a ? $scope.result.name = true : $scope.result.name = false ;
	}
	
	$scope.verifyPass = ()=>{
		let b = formConfirmServices.checkPass($scope.count.psw)
		b.result ? $scope.result.psw = true : $scope.result.psw = false ;
	}

	$scope.verifyRePass = ()=>{
		let c = formConfirmServices.checkRePass($scope.count.repsw,$scope.count.psw)
		console.log(c.str,c.result)
		c.result ? $scope.result.repsw = true : $scope.result.repsw = false ;
	}

	$scope.sucessRegister = ()=>{
		for(let i in $scope.result){
			if ($scope.result[i] !== true) {
				console.log('重新检查有错误'+i)				
				return ;
			}
		}
		return $state.go('cellsure')
	}

})
