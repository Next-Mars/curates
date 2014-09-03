// new collection should look like this:

  {
    username: username,
    title: title,
    description: description,
    url: '/user/:user/:collection',
    links: [
      { 
        url: 'http://yourURLhere.com',
        title: title,
        description: description
      }
    ]
  }


// Response from server on successfully creating a collection
  { 
    "id": collectionID, 
    "u_id": userID, 
    "title":title,
    "url": urlOfTheCollection, 
    "description":description, 
    "stars":0 (this is default value), 
    "created_at": timeOfCreationOfTheEntry 
  }

// If create collection fails:
  'Cannot create collection'


// edit a collection should look like this:
// These are the allowable changes (nothing else): 
// It will know which collection by the id in the api route.

  {
    description: description,
    links: [
      { 
        // All link fields are required
        url: 'http://yourURLhere.com',
        title: title,
        description: description
      }
    ]
  }

// Response for editting a collection is exactly the same as creating a collection
// TODO



// create a new user:

  {
    username: username
  }

// creating a user returns (successful):
  {
    id: userID,
    username: username
  }

// on failure
  'user already exists'

// a link looks like this:
  { 
    url: 'http://yourURLhere.com',
    title: title,
    description: description
  }



// Getting a collection 
  { 
    "id": collectionID, 
    "title":title,
    "username": username,
    "url": urlOfTheCollection, 
    "description":description, 
    "stars":0 (this is default value), 
    "links" [
      { 
        "id": linkID,
        "c_id": collectionID // to which it belongs
        "url": externalURL,
        "title": title,
        "description": description,
        "click_count": number,
        "updated_at": aDate
      }
    ]
  }


  // GET collection currently returning:
  {
    "c_id":51, // return id instead of c_id
    "title":"New Collection",
    "url":"/user/test2/new-collection",
    "description":"CHANGING THE DESCRIPTION OF Test2's New Collection",
    "user":"test2", // change to username
    "stars":0,
    "links":[
      {
        "id":21,
        "c_id":51,
        "link_url":"http://www.duck.com/", // use url
        "link_title":null, // use title instead
        "description":"CHANGING THE DESCRIPTION OF LINKS",
        "click_count":0,"created_at":"2014-09-02T18:27:01.000Z",
        "updated_at":"2014-09-03T01:36:26.000Z"
      },{
        "id":31,
        "c_id":51,
        "link_url":null,
        "link_title":null,
        "description":"CHANGING THE DESCRIPTION OF LINKS",
        "click_count":0,"created_at":"2014-09-03T03:38:19.000Z",
        "updated_at":"2014-09-03T03:38:19.000Z"
      }
    ]
  }

// username already in use

// GET /user/Bob

// return a user or 
// 404 error

// John wants to sign up

// how do i check that john is available as a username without throwing an errror?



// Get all collections return an array
// of collections in this format:

 {
  collections: [
    { 
      "id": collectionID,
      "username": username, 
      "title":title, 
      "url": urlOfTheCollection, 
      "description":description, 
      "stars":0 (this is default value)
    }
  ]
 }

// http://curates.azurewebsites.net/all currently returns:

 {"id":1,
 "title":"Angular",
 "collection_url":"curates.azurewebsites.net/angular",
 "stars":3,
 "description":"Angular rocks!",
 "username":"test"}


// get user also has the meta data for the user

// GET user/Joe
{
  "username":"Joe",
  "githubHandle":"JoeHandle",
  "email": "Joe@gmail.com",
  "collections":[
    { 
      "id": collectionID,
      "username": username, 
      "title":title, 
      "url": urlOfTheCollection, 
      "description":description, 
      "stars":0 (this is default value) 
    }
  ]
}

{"username":"Test2","githubHandle":"Test2","email":"Test2@bob.com","collections":[]

// /user/test2 return collections formatted like this:
{
  "title":"Angular",
  "url":"curates.azurewebsites.net/angular",
  "description":"Angular rocks!",
  "user":"test2",
  "stars":3
}