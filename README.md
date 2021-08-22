Performance management
-converted all images to webp
-jpegs are allowed to be uploaded on the admin panel but are converted to webp by the laravel server
before storing the image in aws s3
-compressed static files at the expense of image quality
-moving the app from heroku to netlify resulted in a significantly faster load time
-use react lazy
-loadable components seams to mess up gsap animations when navigating back to a page

Post
-related posts can be associated by tags, categories or countries