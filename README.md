
# Create SPA Netsuite ![CI status](https://img.shields.io/badge/build-passing-brightgreen.svg)

  
create-spa-netsuite is a CLI that scaffolds SPA projects taking away hours of setup.
Develop in the comfort of your own machine and then deploy to Netsuite when you are ready 😊
  

![Finity Devs](https://raw.githubusercontent.com/finitydevs/create-spa-netsuite/master/images/logo.png?token=AENI2YPLHXWEF6YUAF4HDI265T2DG)



## Features

- Develop locally on your machine
- Organized & easy to extend NetSuite API
- Reusable NetSuite components
<br />
## Getting Started

For this guide you will need the Suitecloud SDF CLI installed, you can find the npm package [here](https://www.npmjs.com/package/@oracle/suitecloud-cli)

1. Create a new app by running ``` npx @finitydevs/create-spa-netsuite myapp ```
2. Install the SDF node modules `cd sdf npm i`
3. Install the Client node modules `cd client npm i`
4. Associate a NetSuite account with this SDF project. In the sdf folder run `npm run setup`
4. Deploy the SDF project to NetSuite. In the sdf folder run `npm run deploy`

###### That's it! You now have the API side deployed in your NetSuite account. This includes the restlet which we will be calling from our SPA and the suitelet which will eventually serve the SPA once it's built and hosted in Netsuite.

  
The generated project gives you an SDF and client folder. I don't recommend you change this structure. They are reliant on each other

  
### Setting up the SPA

1. In Netsuite, create a new token-based integration in /app/common/integration/integrapp.nl?whence=
	a. After saving the integration you will get a consumer and secret key. SAVE THIS IN NOTEPAD
2. In Netsuite create user tokens in /app/setup/useraccesstokens.nl
	a. After token creation, you will get a token id and a token secret. SAVE THIS IN NOTEPAD
3. In the .env file located in the root of the client folder set the following variables: (Do not include brackets)

```
REACT_APP_NS_TOKEN_ID=<Set this to the user token id generated in step 2>
REACT_APP_NS_TOKEN_SECRET=<Set this to the user token secret generated in step 2>
REACT_APP_NS_CONSUMER_KEY=<Set this to the integration generated in step 1>
REACT_APP_NS_CONSUMER_SECRET=<Set this to the integration generated in step 1>
```
> NOTE: In Vue, variables are prefixed with VUE_APP. In Angular, there are no prefixes,
> you just change variables in the environment.ts file

Now, start your SPA by running `npm run start` in the client folder  
<br />
## NetSuite API & actions

So you've gotten up and running. You now want to extend the API so you can build out your application.
This can be achieved by adding "actions"


An action is just a function that does some logic and can return data to the client. Choose a good function name for your action, this will be the "action" name you need to call from your client.

Here is how to create a new action:

1. Find your SuiteScripts/scripts/actions/index.ts file.
2. Create and export a function named myNewAction and return a string of "This is my new action".
     ``` export const myNewAction = (params) => "This is my new action" ```
> NOTE: The project scaffolds with the one index.ts file but you can add more files as needed and export all the functions from the index.ts like this ```export * from './someOtherActionsFile'```



You've just created an action called myNewAction.
You can now call this action from your client via a get or post request
How easy was that!
<br />
  

## Client requests & calling "actions"

You added a new action and you now want to call this action from your client and get the results or just want to call an existing action.

This can be acheived by using the REST object exported from the utils folder in your client.
The available functions are REST.get & REST.post. You can use either get or post for any action.

Example:  
``` REST.get({ action: 'myNewAction', data: { hi: 'heythere' }, errorPolicy: 'none' }) ```<br />  
OR<br />  
``` REST.post({ action: 'myNewAction', data: { hi: 'heythere' }, errorPolicy: 'none' }) ```<br />  

**action** - The name of the action your want to call (Not case sensitive)  
**data** - data you want to pass to the action (optional)  
**errorPolicy** - This can be set as 'none' or 'all' and this controls how the promise is resolved (defaults to 'none')  

> For get requests, REST will append your data to the url.
> For post requests, REST will add your data to the body of the request 

With `errorPolicy: 'none'`, REST resolves the results and rejects the errors, you can use it like this:
``` 
REST.get({...})
	.then(results => {})
	.catch(e => {}) 
```  
<br /> 

With `errorPolicy: 'all'`, REST always returns an object with { data, error }. This is cleaner when using async await and can be used like this:

``` const { data, error } = await  REST.get({...}) ```


> REST is globally available on the window object for development only


## Deploying SPA to Netsuite

1. In the client folder run, `npm run build`. This will build your app and move the build folder into your SDF file cabinet folder. You should now see the client folder in sdf/src/File Cabinet/suitescripts/folder_name
2. Run ```npm run deploy``` to deploy the SDF folder to your file cabinet
3. Open your suitelet URL and view your SPA!!


### Understanding how the SPA is served in NetSuite

A suitelet is serving the client build.  
At runtime, all paths in the HTML are replaced with their file cabinet path and the suitelet simply returns this HTML

## About

This project was created by Mayer Lench.<br/>
Lets face it, creating SPAs in NetSuite is a big setup and its painful. Even after implementing a method for SPAs, things constantly change and you come up with better ideas<br/>
This CLI is the result of lots of work and perfecting. This currently is the best way to develop and host an SPA in NetSuite.<br/>  
Hope you enjoy! Dont forget to star the repo and contribute if you like it!

## Backed By

This project is backed by [Finity Development](https://www.finitydevelopment.com/)

![Finity Devs](https://raw.githubusercontent.com/finitydevs/create-spa-netsuite/master/images/fd_logo.png?token=AENI2YNP5IKX2K42RLQX5QK66C2HG)

  

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.