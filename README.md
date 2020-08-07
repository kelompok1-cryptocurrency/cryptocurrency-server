# cryptocurrency-server


## POST register:

* URL:

        /register

* Method:

        POST

* URL Params:

        None

* Data Params:

        Required:

        email=[string]
        password=[string]

* Success Response:

        Code: 201 CREATED
        Content: {
            "id": 1,
            "email": "johndoe@gmail.com",
            "password": "[encrypted password]",
            "updatedAt": "2020-08-07T09:53:47.174Z",
            "createdAt": "2020-08-07T09:53:47.174Z",
        }

* Error Response:

        Code: 400 BAD REQUEST
        Content: { error : "Validation error" }
        
        Code: 500 INTERNAL ERROR
        Content: { error : "SequelizeDatabaseError" }
    
    
## POST login:

* URL:

        /login

* Method:

        POST

* URL Params:

        None

* Data Params:

        Required:

        email=[string]
        password=[string]

* Success Response:

        Code: 200 SUCCESS
        Content: {
            "id": 1,
            "email": "johndoe@gmail.com",
            "access_token": "[encrypted password]",
        }

* Error Response:

        Code: 400 BAD REQUEST
        Content: { error : "Validation error" }
        
        Code: 500 INTERNAL ERROR
        Content: { error : "SequelizeDatabaseError" }
    
## POST google login:

* URL:

        /google-login

* Method:

        POST

* URL Params:

        None

* Data Params:

        None
        
        
* Success Response:

        Code: 200 SUCCESS
        Content: {
            "id": 1,
            "email": "johndoe@gmail.com",
            "access_token": "[encrypted password]",
        }

* Error Response:

        Code: 400 BAD REQUEST
        Content: { error : "Validation error" }
        
        Code: 500 INTERNAL ERROR
        Content: { error : "SequelizeDatabaseError" }

## GET text:

* URL:

        /home/text

* Method:

        GET

* URL Params:

        None

* Data Params:

        None

* Success Response:

        Code: 200 OK
        Content: [text data]

* Error Response:

        Code: 401 UNAUTHORIZED
        Content: { error : "Access denied" }

        Code: 500 INTERNAL SERVER ERROR
        Content: { error : "SequelizeDatabaseError" }
        
        
