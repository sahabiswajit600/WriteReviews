# WriteReviews

- WriteReviews is a website where users can create reviews of any place and make comments on it.
- Everyone can view the reviews and locations without signing up or logging in but users will have to log in to edit the review details or any comments.
- The user can only edit or delete the reviews and comments that they have added.
- This project was created using Node.js, Express, MongoDB, and Bootstrap. Passport.js was used to handle authentication.

![Screenshot 2022-10-15 205513](https://user-images.githubusercontent.com/54775888/195994783-06623693-852a-4e74-932c-1a925dd2aee9.jpg)

![Screenshot 2022-10-15 205612](https://user-images.githubusercontent.com/54775888/195994815-a6618efb-a35d-45f0-b2f1-4e67ae848c92.jpg)

![Screenshot 2022-10-15 205928](https://user-images.githubusercontent.com/54775888/195994844-87755c5f-c04b-433a-a0af-a461661b5776.jpg)

### View live website  [WriteReviews](https://writereviews.herokuapp.com/)


## Features

- Users can create, edit, and delete reviews
- Users can add or delete their comments
- add location of reviews

## Run it locally

1. Download [Nodejs](https://nodejs.org/en/download/) and install it
2. Install [mongodb](https://www.mongodb.com/)
3. Create a [cloudinary](https://cloudinary.com/) account to get an API key and secret code
4. Create [mapbox](https://www.mapbox.com/) account to get access token

```
git clone https://github.com/sahabiswajit600/WriteReviews.git
cd WriteReviews
npm install
```

Create a .env file (or just export manually in the terminal) in the root of the project and add the following:

```
CLOUDINARY_CLOUD_NAME='<username>'
CLOUDINARY_KEY='<key>'
CLOUDINARY_SECRET='<secret>'
MAPBOX_TOKEN='<token>'
DB_URL='<url>'
SECRET='<secret>'
```

Run `mongod` in another terminal and `node app.js` in the terminal with the project.

then go to [localhost:3000](http://localhost:3000/)
