class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_filter :allow_cross_domain_access
  
  protected
  	def allow_cross_domain_access
		headers['Access-Control-Allow-Origin'] = '*'
		headers['Access-Control-Allow-Headers'] = 'GET, POST, PUT, DELETE, OPTIONS'
		headers['Access-Control-Allow-Methods'] = %w{Origin Accept Content-Type X-Requested-With X-CSRF-Token}.join(',')
		headers['Access-Control-Max-Age'] = '1728000'
	end 
end
