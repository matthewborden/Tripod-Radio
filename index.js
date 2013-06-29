/* Declare 
Views
Stores
Models
Controllers
*/
Ext.ns('tpr', 'tpr.views', 'tpr.stores', 'tpr.models', 'tpr.controllers');
// Start the application setup
Ext.setup({
// Declare the icon when the user adds a link to a iphone homescreen
	icon: 'copy.png',
// Declare the tablet startup screen
	tabletStartupScreen: 'tablet_startup.png',
// Declare iphone startup screen
	phoneStartupScreen: 'phone_startup.png',
// Set glass on the icon to true
	glossOnIcon: true,
// Set application to fullscreen
	fullscreen: true,
// When the program has rendered the above code it will now start the code below.
	onReady: function() {
		Ext.regModel('User', {
			fields: [
				{name: 'name',  type: 'string'},
				{name: 'position',   type: 'string'}
			],
		});
   
		//Declare Varibles to be used later in the program.
	    // External Google Maps Link
		var gmapLink = 'http://maps.google.com/maps?client=safari&oe=UTF-8&ie=UTF8&q=Tripod+HQ&fb=1&gl=us&hq=Tripod+HQ&hnear=Kew,+VIC&hl=en&view=map&cid=18345345755033299855&ved=0CI4BEKUG&ei=etTTTIuXBqj8iwPTmOCDDA&ll=-37.808105622464545,145.03499150276184&spn=0.009818,0.016673&z=17';
		//Declare the text for the ballon that will be used in the map.
		var gmapText = 'Tripod HQ<br><small>45 Charles Street<br>Kew, VIC 3101<br> <div class="tel">9854 3600</div></small>';
		// Declare the Google Maps Corodinates
		var gmapCoords = [-37.808105622464545, 145.03499150276184];
		//Declare The List Store that stores the data for the Radio Tab
		ListStore = new Ext.data.Store({
			model: 'User',
			data :[
			{name: 'Podcast 1',	url: 'audio/podcast1.mp3',	date:'29/07/11'},
			{name: ' Podcast 2 (Special Guest Will Cooper)',	url: 'audio/podcast2.mp3',	date:' 12/08/11 '},
			{name: 'Podcast 3 (Special Guests Ben Bird and Andy Zeng) ',	url: 'audio/podcast3.mp3',	date:'26/08/11'},
		]
		});

		//Declare the bits of code that will fill the tab panels
			// Declare the HTML Page that is used in the about and home tab
				// Start a new panel.
		tpr.views.HtmlPage = Ext.extend(Ext.Panel, {
			autoLoad: 'html.html',
			// Lock the panel to a vertical scroll
			scroll: 'vertical',
			// Use Sencha's CSS Styling to style the HTML content
			styleHtmlContent: true,
			// Tells the html to use all the avalible space in the panel that we declared before
			layout: {
				type: 'fit',
			},
			// Starts a new componetent
			initComponent: function(){
			//Declares the tool bar as a varible.
				var toolbarBase1 = {
				// declares that this uses a predifined toolbar.
					xtype: 'toolbar',
				//Gets the title and uses it for the title.
					title: this.title
				};

				//The inclusion of the html file.
				this.dockedItems = toolbarBase1;
				//Sends a AJAX request to the server throught javascript.
				Ext.Ajax.request({
					//Get the url of the file as diffined in the tab panel
					url: this.url,
					// When the AJAX request is a sucess show the html file
					success: function(rs){
							//response text is  the html file
						this.update(rs.responseText);
					},
					scope: this
				});
				// confirm the this is working ref. this javascript
				tpr.views.HtmlPage.superclass.initComponent.call(this);
			}
		});

		// Register this as an X type.
		Ext.reg('htmlpage', tpr.views.HtmlPage);

		// start an xtype for a title
		tpr.views.Title = Ext.extend(Ext.Panel, {
			initComponent: function(){
        
		//Declare toolbarBase as a toolbar that will hold the title (as defined by this.title)  
				var toolbarBase = {
					xtype: 'toolbar',
					title: this.title
				};
       

	   /*
				This Code is Depricated
				if (this.prevCard !== undefined) {
					toolbarBase.items = {
						ui: 'back',
						text: this.prevCard.title,
						scope: this,
						handler: function(){
							this.ownerCt.setActiveItem(this.prevCard, { type: 'slide', reverse: true });
						}
					}
				}
        */
				// Declare the docked items as the title as difined in toolbarBase 
				this.dockedItems = toolbarBase;
				//Check that this is functioning
				tpr.views.HtmlPage.superclass.initComponent.call(this);
			}
		});
//Register the X-Type Title
		Ext.reg('Title', tpr.views.Title);
		
//Start the X-Type for the map
		//Declare a New Panel
		tpr.views.LocationMap = Ext.extend(Ext.Panel, {
		//Declare the Variables as required by google maps 
			coords: gmapCoords,
			mapText: gmapText,
			permLink: gmapLink,
			// Initliaze Componet as function
			initComponent: function(){
				var position = new google.maps.LatLng(this.coords[0], this.coords[1]);
		//Declare the toolbar for the map.
				this.dockedItems = [{
				//Declare a toolbar
					xtype: 'toolbar',
					// Use the title
					title: this.title,
					// Items 
					items: [{
					// Decalre a Space 
						xtype: 'spacer', flex: 1
					}, {
					//Declare the open in google maps icon
						iconCls: 'action',
						iconMask: true,
						scope: this,
						//Declare its pupose
						handler: function(){
							Ext.Msg.confirm('External Link', 'Open in Google Maps?', function(res){
								if (res == 'yes') {
									window.location = this.permLink;
								}
							}, this);
						}
					}, {
					// Declare the contact button
						xtype: 'button',
						linkId: 'myLink3',
						url: 'tel:98543600',
						iconCls: 'phone1',
						iconMask: true,
						// Declare the plugin that i used to make the phone call on a iphone
						plugins: [ new simfla.ux.plugins.linkButton() ],
					}]
				}]
				var infowindow = new google.maps.InfoWindow({
					content: this.mapText
				});
				//Declares the map
				this.map = new Ext.Map({
					mapOptions : {
					//tells the map where to center
						center : position,  
					// Tells the map how far to zoom
						zoom: 17,
						// declare the navigation controls
						navigationControlOptions: {
							style: google.maps.NavigationControlStyle.DEFAULT
						}
					},
					// Declare the popup sign 
					listeners: {
						maprender : function(comp, map){
							var marker = new google.maps.Marker({
								position: position,
								title : 'Tripod HQ',
								map: map
							});
							infowindow.open(map, marker);

							google.maps.event.addListener(marker, 'click', function() {
								infowindow.open(map, marker);
							});
						}
					}
				});
        
				this.items = this.map;
				tpr.views.LocationMap.superclass.initComponent.call(this);
			}
		});

		Ext.reg('location', tpr.views.LocationMap);
		
	// this is the base for the app
		var tabpanel = new Ext.TabPanel({
		// Orientate the tabBar
			tabBar: {
				dock: 'bottom',
				layout: {
					pack: 'center'
				}
			},
			fullscreen: true,
			// Declare a Dark UI
			ui: 'dark',
			// Allow the icons to be dragable.
			sortable: true,
			//show the card switch animation as a fade over 1 second
			cardSwitchAnimation: {
				type: 'fade',
				duration:1000,
				cover: true
			},
			// lock the scroll oreitation
			defaults: {
				scroll: 'vertical'
			},// Declare the different items
			items: [{
			// define this.title
				title: 'Home',
			// Use the home icon
				iconCls: 'home',
				// Use the html xtype to do a ajax request 
				xtype: 'htmlpage',
				// declare this.url as home.html 
				url:'home.html',
				// the folloing properties tell the the html page to takup as much space as possible
				type: 'fit',
				align: 'stretch',
			},{
				//declare this.title
				title: 'Radio',
				//Declare the icon
				iconCls: 'download',
				//fit to screen
				type: 'fit',
				//use the title xtype
				xtype:'Title',
				//strech to the size of the screen
				align: 'stretch',
				// auto resume when not playing 
				autoResume: true,
				// Declare the items used in this panel
				items:[{
				//use a list
				xtype: 'list',
				//declare the data store
				store: ListStore,
				// declare the layout
				itemTpl:'<div ><a href={url}>{name}</a></br>{date}</div>'
				}]
			},{
			// declare this.title
				title: 'Location',
				// fit the map to the screen
				type: 'fit',
				//strech to the size of the screen 
				align: 'stretch',
				// disable scroll of the screen
				scroll: false,
				//use the map that was defined before
				xtype: 'location',
				// use the locate icon
				iconCls: 'locate',
			},{
				// declare this.title
				title: 'About',
				// use the html page xtype
				xtype: 'htmlpage',
				//declare this.url
				url: 'about.html',
		// tells this to take up as much room as posible
				type: 'fit',
				// tells this to stretch
				align: 'stretch',
				// use the info icon
				iconCls: 'info'
			}]
		});
	}
});