###  Spoti-Search

### about 
 Building a website that uses the API of Spotify. It will be able to make a search 
 and display the content and also have access to playing the content you searched.


# Prerequisites

- NodeJS => v16
- NPM => v8
- MongoDB => v6
- Chome/Firefox/Safari/Edge => latest 2 major updates

# other Considerations

If you are haveing a problem running a project and ports are being used on another project and you cant not figure out where it is. You can run this command to clear out any activity you have running on the port so that your project can run. 

```
sudo lsof-nP -i4TCP:3000
```

### Side note
You can use this command to help fix that problem with any project. To use this on other projects. For example you are running a server and client port. One at 3000 and 8000. You run into the problem of port 8000 is being used else where. Run the following command 

```
sudo lsof-nP -i4TCP:8000
```
The only difference is that the port has been changed. You can do this with any port number you need to work on just replace the 3000 or 8000 respectivly with the port you need to clear all activity on.

# Getting Started 

### .ENV
For the .env file you will need to take the .env.dist file and make that your own .env file on your local project. 

You can do this with the following command 

```
cp .env.dist .env && vim .env
```

once you have used the command a vim window will appear in your terminal. Place all the enviorment variables required inside the vim window then save it. 

# Starting the Client 

To Start this project you will need to make sure your terminal is in the correct location to run the following commands to accomplish a local build to test your product or a build.

``` 
npm run dev
```
this command is to run locally 

-----------------
To build the project run the following command.

```
npm run build
```
----------------

# Links

All the major links that you will need to navigate this project are listed below. 

- http://localhost:3000 - Landing page
-http://localhost:3000/login - login page
- http://localhost:3000/home - home page after signing in

----
### notes
This maybe be updated further in the future.
----


test