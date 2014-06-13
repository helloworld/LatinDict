meteor-cordova-shell
====================

I created a basic boilerplate to get people up and running quickly. It's based off of the [Blonk](http://blonk.co) app.
Search for it on the AppStore and Google Play store to see a running example.

I wasted a *lot* of time getting Meteor and PhoneGap to work. The current PhoneGap docs are pretty shit. Although 3.3 is getting better, most of the docs contain old code that doesn't work or an inconsistent API (`phonegap local` and `cordova` on others).

If you would like to get a head start on the UI, i've open sourced a Meteor boilerplate with a micro framework that includes the basic mobile components like a tray, tableviews, native scroll, etc... Get it [here](https://github.com/AdamBrodzinski/meteor-mobile-boilerplate)

**ToDo**
- Detect if offline and show offline page
- Replace icons and splash screen



## Setup
- Install Xcode
- Install NodeJS
- Install Cordova command line  
   `sudo npm install -g cordova`


## Usage

- Pull down this repo  
`git clone https://github.com/AdamBrodzinski/meteor-cordova-shell.git`

- Test in iOS simulator `cordova emulate ios` or `make simulator_ios`

- [Meteor Mobile Boilerplate](https://github.com/AdamBrodzinski/meteor-mobile-boilerplate) demo should be loaded

#### Load your Meteor site

- Edit root index file and put your Meteor server url in [www/index.html Line 35](https://github.com/AdamBrodzinski/meteor-cordova-shell/blob/master/www/index.html#L35) to `meteorUrl:"http://yourapp.meteor.com",`

- Build changes from `www` folder into iOS project `cordova build ios` or `make ios`

- Test in iOS simulator `cordova emulate ios` or `make simulator_ios`



<br>

## Build Phonegap shell from scratch

- Open terminal and cd into your projects directory

- Create Cordova Phonegap app, enter a name, identifer, and display name (can be changed later) `cordova create example com.example Example`
  
- Add the iOS platform to your Cordova build `cordova platform add ios`
  
- Build changes `cordova build ios`

- Fire up iOS simulator to make sure it's loading `cordova emulate ios`
  
- Add PhoneGap plugins to make development easier
```
cordova plugin add org.apache.cordova.device
cordova plugin add org.apache.cordova.statusbar
cordova plugin add org.apache.cordova.splashscreen
```

- Pull down Meteor-Rider and copy all js files into your `/www/js` folder (not `/platform/...`)
- Copy and overwrite `index.html` from the MeteorRider folder to `/www/index.html`
- In new index.html, Rename `cordova-2.4.0` to `cordova.js`
- Plug in your apps url into index.html
- Fire up simulator

Your app should be loaded!  

I would highly reccomend going through at least the first half of [Apple's iOS tutorial](https://developer.apple.com/library/iOS/referencelibrary/GettingStarted/RoadMapiOS/index.html). 
It will familiarize you with how the iOS system and Xcode works.

Shoot me a quick email if you can't get it loaded for some reason.  
Android instructions coming soon
