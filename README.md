# express-api-example

This is a small express server as an example of api testing.

## Running

This will start it running on http://localhost:3000

You can change the port by running PORT=4040 node index

```
npm install

node index
```

## End points

Endpont        | Description                                  |
---------------|----------------------------------------------|
/api/users     | This returns all users in **data/user.json** |
/api/users/:id | This returns a single user or 404 error      |