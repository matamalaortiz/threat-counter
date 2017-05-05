![alt](https://raw.githubusercontent.com/matamalaortiz/threat-counter/master/img/logo-threat-tracker-logo-300.png)

Threat Tracker is an open source Chrome extension dedicated to helping activists manage and track threats.
### Description
After selecting the extension, users can click on elements of a page where they have identified a threat (tweets, comments, posts, etc). This threat's data - information like the date, time, name and tag of the user that sent the threat, and type of threat - will be imported into the Threat Tracker window, where it can be easily verified and categorized by the user. After submission, this data is securely stored inside of a Firebase database. Users can then use the Threat Tracker dashboard as a tool for viewing and analyzing their threat metrics.

The selector code for Threat Counter was built using the [SelectorGadget framework](http://selectorgadget.com).
### Try Threat Tracker
- Open your terminal
- Clone this repo
```sh
$ git clone https://github.com/matamalaortiz/threat-counter.git
```
- Load the extension
- Check the dashboard
```sh
$ cd webpage
$ pip install -r requirements.txt
$ node app.js
```
open your web browser and visit http://localhost:8080/
### Credit
This project was created as a part of the Spring 2017 Development in the Public Interest course at the Interactive Telecommunications Program within NYU's Tisch School of the Arts.

Created by Alejandro, Ada, Pilar, & Tianlei
