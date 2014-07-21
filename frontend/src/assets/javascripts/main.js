var app = angular.module('tApp', []);

app.directive('userNav', function() {
	return {
		restrict: 'E',
		templateUrl: 'views/layouts/_user_navigation.html'
	};
}).directive('posts', function() {
	return {
		restrict: 'E',
		templateUrl: 'views/posts/index.html',
		
		scope: {
			posts: '='
		}
	};
}).directive('comments', function() {
	return {
		restrict: 'E',
		templateUrl: 'views/comments/index.html',
		
		scope: {
			comments: '=',
			postId: '='
		}
	};
}).directive('newPost', function() {
	return {
		restrict: 'E',
		templateUrl: 'views/posts/_form.html'
	};
}).directive('newComment', function() {
	return {
		restrict: 'E',
		templateUrl: 'views/comments/_form.html'
	};
});

app.service('notificationService', function() {
	function show(object) {
		object.show('slow').delay(3000).slideUp();
	}

	function setNotification(object, msg){
		object.text(msg);
		show(object);
	}
	
	this.alert = function(message) {
		setNotification( $('#notifications .alert'), message );
	};

	this.notice = function(message) {
		setNotification( $('#notification .notice'), message);
	};
});

app.controller('commentController', [ '$scope', '$http', 'notificationService', function($scope, $http, notificationService) {
	//$scope.comments = [];
	$scope.comment = {};
	
	$scope.create = function(){
		$scope.comment.postId = $scope.postId;
		$scope.comments.push(this.comment);

		$http.post('http://localhost:3000/posts/' + $scope.postId + '/comments.json', $scope.comment).
			success(function(data, status, headers, config){
				notificationService.notice('Done: new comment');
			}).
			error(function(data, status, headers, config){
				notificationService.alert('Error: new comment');
		});
		$scope.comment = {};
	};
}]).controller('postController', ['$scope', '$http', 'notificationService', function($scope, $http, notificationService) {
	$scope.posts = [];
	$scope.post = {};

	$http.get('http://localhost:3000/posts.json').
		success(function(data, status, headers, config){
			$scope.posts = data;
		}).
		error(function(data, status, headers, config){
			notificationService.alert('Error: get posts');
	});
	
	$scope.create = function(){
		$scope.posts.push(this.post);
		
		$http.post('http://localhost:3000/posts.json', $scope.post).
			success(function(data, status, headers, config){
				notificationService.notice('Done: new post');
			}).
			error(function(data, status, headers, config){
				notificationService.alert('Error: new post');
		});
		$scope.post = {};
	};
}]);

