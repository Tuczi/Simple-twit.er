require 'test_helper'

class HomeControllerTest < ActionController::TestCase
  test "should get options" do
    get :options
    assert_response :success
  end

end
