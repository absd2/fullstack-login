# Full-Stack Login Authentication Process
With this project I was able to learn my first back-end technologies, such as **NodeJS**, **Express**, **Nodemon**, **CORS**, etc. It was also an opportunity for me dive into the whole full-stack communication process (that includes HTTP requests, responses, POST and GET methods, JSON, AJAX, etc).

I could also use a relational database (in this case, **mySQL**) to store the data that would be used to validate my front-end form.

## How to run
You can run the server normally with **NodeJS** by using:
```
npm run start
```

It's also possible to run the server with **Nodemon** - who will keep track of all server files and restart it automatticaly if any changes are detected - by using:
```
npm run dev
```

## Changing the server port
You can change the server port by editing the serverPort constant on the client-side ('client/script.js:2') and on the server-side ('server/script.js:2').

Before:
```javascript
const serverPort = 4000;
```

After:
```javascript
const serverPort = 8080;
```

## How it works
The scheme below can give you an overall idea about how communication flows between all parts.
![Scheme](scheme.png)
