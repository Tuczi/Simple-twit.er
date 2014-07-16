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

app.controller('commentController', [ '$scope', function($scope) {
	//$scope.comments = [];
	$scope.comment = {};
	
	$scope.create = function(){
		$scope.comments.push(this.comment);
		$scope.comment = {};
		//TODO ajax backend
	}
}]).controller('postController', ['$scope', function($scope) {
	//TODO init
	$scope.posts = [{content:'a',comments:[{content:'c_a'}]}];
	$scope.post = {};
	
	$scope.create = function(){
		$scope.posts.push(this.post);
		$scope.post = {};
		//TODO ajax backend
	}
}]);
