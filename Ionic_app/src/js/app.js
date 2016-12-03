
const app = angular.module('app',['ionic','myController','myServices'])

app.config(function($stateProvider,$urlRouterProvider,$ionicConfigProvider) {
	
	$ionicConfigProvider.platform.ios.tabs.style('standard');
	$ionicConfigProvider.platform.ios.tabs.position('bottom');
	$ionicConfigProvider.platform.android.tabs.style('standard');
	$ionicConfigProvider.platform.android.tabs.position('standard');
	$ionicConfigProvider.platform.ios.navBar.alignTitle('center');
	$ionicConfigProvider.platform.android.navBar.alignTitle('left');
	$ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
	$ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');
	$ionicConfigProvider.platform.ios.views.transition('ios');
	$ionicConfigProvider.platform.android.views.transition('android');

	$stateProvider
		.state('tab',{
			url:'/tab',
			templateUrl:'templates/tab.html',
			abstract:true
		})
		//首页
		.state('tab.home',{
			url:'/home',
			views:{
				'tab-home':{
					templateUrl:'templates/home/index.html',
					controller:'homeCtrl'
				}
			}
		})
		//健康分析
		.state('tab.health',{
			url:'/health',
			views:{
				'tab-health':{
					templateUrl:'templates/health/index.html',
					controller:'healthCtrl'
				}
			}
		})
		//发现
		.state('tab.find',{
			url:'/find',
			views:{
				'tab-find':{
					templateUrl:'templates/find/index.html',
					controller:'findCtrl'
				}
			}
		})
		.state('tab.findcontent',{
			url:'/findcontent/:aid',
			views:{
				'tab-find':{
					templateUrl:'templates/find/content.html',
					controller:'findcontentCtrl'
				}
			}
		})
		//个人中心
		.state('tab.user',{
			url:'/user',
			views:{
				'tab-user':{
					templateUrl:'templates/user/index.html',
					controller:'userCtrl'
				}
			}
		})
		//个人中心——我的健康
		.state('tab.userhealth',{
			url:'/userhealth',
			views:{
				'tab-user':{
					templateUrl:'templates/user/health.html',
					controller:'userCtrl'
				}
			}
		})
		//个人中心——我的收藏
		.state('tab.usercollection',{
			url:'/usercollection',
			views:{
				'tab-user':{
					templateUrl:'templates/user/collection.html',
					controller:'userCtrl'
				}
			}
		})
		//个人中心——在线客服
		.state('tab.useronline',{
			url:'/useronline',
			views:{
				'tab-user':{
					templateUrl:'templates/user/online.html',
					controller:'userCtrl'
				}
			}
		})
		//个人中心——帮助手册
		.state('tab.userhelp',{
			url:'/userhelp',
			views:{
				'tab-user':{
					templateUrl:'templates/user/help.html',
					controller:'userCtrl'
				}
			}
		})
		//个人中心——意见反馈						
		.state('tab.userfeedback',{
			url:'/userfeedback',
			views:{
				'tab-user':{
					templateUrl:'templates/user/feedback.html',
					controller:'userCtrl'
				}
			}
		})
		//登录模块
		.state('login',{
			url:'/login',
			templateUrl:'templates/login/index.html',
			controller:'loginCtrl'
		})
		.state('signin',{
			url:'/signin',
			templateUrl:'templates/login/signin.html',
			controller:'loginCtrl'
		})
		.state('cellsure',{
			url:'/cellsure',
			templateUrl:'templates/login/cellsure.html',
			controller:'loginCtrl'
		})

		//手机验证
		$urlRouterProvider.otherwise('/tab/home')

})