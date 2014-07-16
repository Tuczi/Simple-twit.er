json.array!(@posts) do |post|
  json.extract! post, :id, :content
  
  json.comments post.comments
  
  json.url post_url(post, format: :json)
end
