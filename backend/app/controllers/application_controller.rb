class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_filter :allow_cross_domain_access
  respond_to :html, :json
  after_filter :set_xsrf_token_cookie
  
  protected
  	def allow_cross_domain_access
		headers['Access-Control-Allow-Origin'] = '*'
		headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
		headers['Access-Control-Allow-Headers'] = %w{Origin Accept Content-Type X-Requested-With X-CSRF-Token X-XSRF-TOKEN}.join(',')
		headers['Access-Control-Max-Age'] = '1728000'
	end 

	def set_xsrf_token_cookie
	    cookies['XSRF-TOKEN'] = form_authenticity_token if protect_against_forgery?
	end

	def verified_request?
		super || form_authenticity_token == request.headers['X-XSRF-TOKEN']
	end
end
