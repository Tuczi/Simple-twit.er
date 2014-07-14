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
			comments: '='
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

