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

app.controller('commentController', [ '$scope', '$http', function($scope, $http) {
	//$scope.comments = [];
	$scope.comment = {};
	
	$scope.create = function(){
		$scope.comment.postId = $scope.postId;
		$scope.comments.push(this.comment);

		$http.post('http://localhost:3000/posts/' + $scope.postId + '/comments.json', $scope.comment).
			success(function(data, status, headers, config){
				$('#notifications .notice').text('Done: new comment');
			}).
			error(function(data, status, headers, config){
				$('#notifications .alert').text('Error: new comment');
		});
		$scope.comment = {};
	}
}]).controller('postController', ['$scope', '$http', function($scope, $http) {
	$scope.posts = [];//[{content:'a',comments:[{content:'c_a'}]}];
	$scope.post = {};
	
	$http.get('http://localhost:3000/posts.json').
		success(function(data, status, headers, config){
			$scope.posts = data;
		}).
		error(function(data, status, headers, config){
			$('#notifications .alert').text('Error: get posts');
	});
	
	$scope.create = function(){
		$scope.posts.push(this.post);
		
		$http.post('http://localhost:3000/posts.json', $scope.post).
			success(function(data, status, headers, config){
				$('#notifications .notice').text('Done: new post');
			}).
			error(function(data, status, headers, config){
				$('#notifications .alert').text('Error: new post');
		});
		$scope.post = {}
	}
}]);
