# Recipe App Angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.2.


## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)



## Overview
Created a recipe app where a user can login to create, save, update, and delete recipes. The user must be authenicated to enter the site. User data is stored on a server and is able to fetch their recipes and save them. 

### The challenge

Users should be able to:

- Signup, login, and logout of site. 
- Add recipe, edit, update, store, fetch , and delete content. 
- Route to content they are insterested in such as creating a recipe, editing, or going to shopping list.


### Links

- Live Site URL: [Live](https://flo1244.github.io/recipe-app-angular/recipe-app-angular#/auth)


### Built with

- HTML
- Bootstrap 4
- [Angular](https://github.com/angular/angular-cli) - Angular framework
- TypeScript


### What I learned
I've learned a lot from using Angular's Framework. It can be quite complex, but endless possibility on creating dynamic content.
I learned how to take use of the CLI to create services, components, etc., but also created them manually. Used observables to send data from
my custom events to other components and make them injectable. Imported built in service class ``HTTPClient`` to be able to communicate with API
service and use ``post() get()`` methods to store/retrieve our data frome the Firebase server. In the functions subscribe to the observable instance passing an observer to recieve the data requesting. Created authenication component to be able to implement auth guards in our pathway preventing users to access restricted material. Optimized the app by creating individual modules for each component and refractor our initial routes to ```loadChildren```  creating lazy loading.


### Useful resources

- [Angular](https://angular.io/) - Official Angular Documentation
- [Bootstrap](https://getbootstrap.com/docs/4.6/getting-started/introduction/) - Bootstrap Docs for styling components.
- [Push Angular project to GitHub](https://efficientuser.com/2021/03/04/how-to-deploy-angular-app-on-github-pages-for-free/) - How push and deploy project to GitHub.
