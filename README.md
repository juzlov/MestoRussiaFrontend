# Mesto-Russia (Frontend)
Mesto Russia (frontend) is fronted part of Mesto Russia project, developed as part of [Yandex-Praktikum](https://praktikum.yandex.ru/) training program.

Version 1.1.0

## About

This project is an independent frontend part that can be linked to the [Mesto Russia backend](https://github.com/juzlov/Mesto-Russia)
This is an interactive page where you can add photos, delete them, and put likes on photos.

- Javascript structure is implemented via Classes
- To update page information, fetch requests are sent to the server
- Fields are validated via a separate Class
- The project is built by Webpack

The following functionality is implemented:
- User can add card with picture and name
- Delete your own card by clicking the trash button (the trash is displayed only for your own cards)
- Putting and removing likes; Auto-count likes
- Editing user name and "about" field (+validation)
- Photos open in a separate popup by clicking on the image

Frontend requests to the server that stores cards and information about users. 
Server gives all this information every page update.

## Used in project
- **HTML**
- **CSS**
- **JS**
- **Webpack**

## Demo

[Mesto Russia Frontend](https://juzlov.github.io/MestoRussiaFrontend/)

![Main page](https://github.com/juzlov/MestoRussiaFrontend/blob/master/src/images/MestoRussiaFrontend-Demo.PNG)

## How to start
Please, before start check versions of following components:
npm version - 6.13.4
node.js version - 12.16.1

1. Clone project:
```
git clone https://github.com/juzlov/MestoRussiaFrontend.git
```

2. Run local server
```
npm run dev
```

Building the current version:
```
npm run build
```

Deploy on Github Pages:
```
npm run deploy
```
