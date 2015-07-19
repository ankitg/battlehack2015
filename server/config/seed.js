/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');

Thing.find({}).remove(function() {
  Thing.create({
    name : 'Development Tools',
    info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
  }, {
    name : 'Server and Client integration',
    info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
  }, {
    name : 'Smart Build System',
    info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  },  {
    name : 'Modular Structure',
    info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
  },  {
    name : 'Optimized Build',
    info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  },{
    name : 'Deployment Ready',
    info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
  });
});

User.find({}).remove(function() {
  User.create(
    {
      provider: 'local',
      name: 'Chatime',
      email: 'test@test.com',
      password: 'test',
      user_type: 'sponsor',
      logo:'http://gamudaland.com.my/wp-content/themes/gamudaland/gamudawalk/images/gallery/chatime_logo.png',
      campaigns: [
        {
          name: 'HONDERICH Rachel',
          profile_pic: '/img/HONDERICH_Rachel.jpg',
          amount: '200',
          date: '2013/05/10'
        },
        {
          name: 'CONNELLY Austin', 
          profile_pic: '/img/CONNELLY_Austin.jpg',
          amount: '200',
          date: '2015/07/15'
        },
        {
          name: 'GIRKE Nikola', 
          profile_pic: '/img/GIRKE_Nikola.jpg',
          amount: '500',
          date: '2015/07/15'
        }
      ]
    },
    {
      provider: 'local',
      name: 'BurritoBoyz',
      email: 'sponsor1@test.com',
      password: 'test',
      user_type: 'sponsor',
      logo:'http://sandymcmurray.typepad.com/.a/6a01538ee1b5f8970b01538ee1c2c0970b-pi'
    },
    {
      provider: 'local',
      name: 'Royal Jasmine',
      email: 'sponsor2@test.com',
      password: 'test',
      user_type: 'sponsor',
      logo:'http://www.royaljasmine.ca/images/logo.jpg'
    },
    {
      provider: 'local',
      name: 'GroupBy',
      email: 'sponsor3@test.com',
      password: 'test',
      user_type: 'sponsor',
      logo:'https://lh4.googleusercontent.com/-drkQ3FgLnBo/AAAAAAAAAAI/AAAAAAAAAA0/n5N5I3ZS7UU/photo.jpg'
    },
    {
      provider: 'local',
      name: 'Nascent',
      email: 'sponsor4@test.com',
      password: 'test',
      user_type: 'sponsor',
      logo:'http://nascentdigital.com/images/nascent-logo.png'
    },
    {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@admin.com',
      password: 'admin'
    }, 
    {
      provider: 'local',
      name: 'Steph Curry',
      email: 'steph@gsw.com',
      password: 'steph'
    },
    {
      provider: 'local',
      name: 'Novak Djokovic',
      email: 'novak@tennis.com',
      password: 'novak'
    },
    {
      provider: 'local',
      name: 'David Beckham',
      email: 'david1@manutd.com',
      password: 'david'
    }, 
    { 
      name: 'HONDERICH Rachel', 
      description: 'Competed at 2014 Commonwealth Games. 2014 Pan Am badminton championships: first in teams, second in singles. Started playing badminton at age seven. Hopes to work as a chiropractor in the future', 
      skus: [
        {key:'< $25',value: 'Get a shout out on Twitter'},
        {key:'< $50',value: 'Will be photographed with your company logo'},
        {key:'$50+',value: 'Will be videographed with your company logo'}
      ],
      provider: 'local', 
      email:'test1@test.com',
      password: 'test1',
      user_type:'Athlete', 
      profile_pic: 'img/HONDERICH_Rachel.jpg',
      events:[], 
      sport_type:'Badminton',
      merchant_id: 'HONDERICH_Rachel', 
      lat: 43.691145, 
      lng: -79.330463,
      media:[
        {'type':'youtube', 'url':'https://youtu.be/udTCUNDqKWI'},
        {'type':'image', 'url':'http://cache4.asset-cache.net/gc/480977460-markham-canada-july-16-2015-honderich-gettyimages.jpg?v=1&c=IWSAsset&k=2&d=X7WJLa88Cweo9HktRLaNXr0VskIDWTmM105L%2BU7TCXhDEEkl9EHGmzhVu9kssvsm2abLxd2%2BbvZ%2BY1cT3sPsXw%3D%3D'}
      ]
    },
    { 
      name: 'VON MARTELS Christopher', 
      description: 'Second at 2014 FEI Nations Cup in Wellington, United States. Von Martels and his family own Von Martels Dressage Inc. a provider of dressage horses for competitive riders', 
      skus: [
        {key:'< $125',value: 'Get a shout out on Facebook'},
        {key:'< $250',value: 'Will be photographed with your company logo'},
        {key:'$250+',value: 'Will be videographed with your company logo'}
      ],
      provider: 'local', 
      email:'test2@test.com',
      password:'test2',
      user_type:'Athlete', 
      profile_pic: 'img/VON_MARTELS_Christopher.jpg', 
      events:[], 
      sport_type:'Equestrian',
      merchant_id: 'VON_MARTELS_Chris',
      lat:43.675255, lng: -79.537830,
      media:[
        {type:'youtube', url:'https://youtu.be/dc_CcpVrgkE'},
        {type:'image',url:'http://www.psdressage.com/content/photos/82857.jpg'}
      ]
    },
    { 
      name: 'CONNELLY Austin', 
      description: 'Competed at 2015 AT&T Byron Nelson Championship.First at 2014 Junior Ryder Cup in Scotland. Education: University of Arkansas – Fayetteville, Ark. “My goal is to be the No. 1 player in the world. As a little kid, I didn’t want to be the No. 1 amateur in the world. I don’t have any more goals in amateur golf.” (Halifax Chronicle Herald, May 13, 2015)', 
      skus: [
        { key:'< $225', value: 'Get a shout out on Social Media'},
        { key:'< $500', value:  'Put your logo on my cap'},
        { key:'$500+', value:  'Put your logo on shirt'}
      ],
      provider: 'local', 
      email:'test3@test.com',
      password:'test3',
      user_type:'Athlete', 
      profile_pic: 'img/CONNELLY_Austin.jpg', 
      events:[], 
      sport_type:'Golf',
      merchant_id: 'CONNELLY_Austin',
      lat:43.875557, lng: -79.473285,
      media:[
        {type:'youtube', url:'https://youtu.be/GVUoLpX47MA'},
        {type:'image', url:'http://golfweek.media.clients.ellingtoncms.com/img/photos/2014/11/09/austin-connelly-recruiting-arkansas_t780.jpg?c7a9b4cf7bf62972675d23b981071373caad164f'}
      ],
      feature_score:'100'
    },
    { 
      name: 'BALFOUR Jevon', 
      description: 'Second in freestyle -65 kg at 2014 Glasgow Commonwealth Games. Competed at 2014 world junior wrestling championships. First in team at 2014 Canadian university wrestling championships. Education: Brock University — St. Catharines, Ont. Started wrestling at age 15',       
      provider: 'local', 
      email:'test4@test.com',
      password:'test4',
      user_type:'Athlete', 
      profile_pic: 'img/BALFOUR_Jevon.jpg', 
      events:[], 
      sport_type:'Wrestling',
      merchant_id: 'BALFOUR_Jevon',
      lat:43.854765, lng:-79.024219,
      media:[
        {type:'youtube', url:'https://youtu.be/sc97IrowZWw'},
        {type:'image', url:'http://www1.pictures.zimbio.com/gi/Jevon+Balfour+20th+Commonwealth+Games+Wrestling+78-SlJm9B5ql.jpg'}
      ]
    },
    { 
      name: 'GIRKE Nikola', 
      description: 'Competed in RS:X at Guadalajara 2011 Pan Am Games. Competed in RS:X at Athens 2004 Olympic Games. Competed in windsurfing at Beijing 2008 and London 2012 Olympic Games. Competed in RS:X at 2012 world sailing championship. Named Female Sailor of the Year by Canadian Yachting Associations in 2001, 2004, 2009 and 2012', 
      provider: 'local', 
      email:'test5@test.com',
      password:'test5',
      user_type:'Athlete', 
      profile_pic: 'img/GIRKE_Nikola.jpg', 
      events:[], 
      sport_type:'Sailing',
      merchant_id: 'GIRKE_Nikola',
      lat:43.854765, lng:-79.024219,
      media:[
        {type:'youtube', url:'https://youtu.be/g3iPy9MgrVQ'},
        {type:'image',url:'https://hitthewave.files.wordpress.com/2014/12/nikola-girke-posing.jpg?w=500&h=355'}
      ],
      feature_score:'100'
    },
    { 
      name: 'HAYWARD Ben', 
      description: 'Edmonton, Alberta', 
      provider: 'local', 
      email:'test6@test.com',
      password:'test6',
      userType:'Athlete', 
      profile_pic: 'img/HAYWARD_Ben.jpg', 
      events:[], 
      sport_type:'Canoeing_Slalom',
      lat:43.875557, lng: -79.473285,
      media:[
        {type:'youtube', url:'https://www.youtube.com/embed/uHf953ZlQ7w'},
        {type:'image', url:'http://www.sportscene.tv/files/news/Ben_Hayward_Canoe_Slalom_III.jpeg'}
      ]
    },
    function() {
      console.log('finished populating users');
    }
  );
});