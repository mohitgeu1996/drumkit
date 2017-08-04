var currentSongNumber =1;
var willLoop = 0;
var willShuffle =0;

var songs = [ {
                 'name': 'Humma Humma',
                 'artist': 'A. R. Rahman',
                 'album': 'Ok Jaanu',
                 'duration': '2:59',
                 'fileName': 'humma-humma.mp3',
                 'image': 'humma.jpg'
               },
               {
                'name': 'Izhaar Song',
                'artist': 'Gurnazar',
                'album': 'Izhaar',
                'duration': '4:32',
               'fileName': 'izhaar.mp3',
               'image': 'izhaar.jpg'
              },
              {
               'name': 'Jab Koi Baat Bigad',
               'artist': 'Kumar Sanu',
               'album': 'Jurm',
               'duration': '7:54',
              'fileName': 'jab-koi-bat-bigad-jaye.mp3',
              'image': 'JabKoi.jpg'
              },
              {
                 'name': 'Khaab Song',
                 'artist': 'Akhil',
                 'album': 'Khaab',
                 'duration': '3:21',
                'fileName': 'khaab.mp3',
                'image': 'khaab.png'
              },
              {
               'name': 'Mere Papa',
               'artist': 'Tulsi Kumar',
               'album': 'Mere Papa',
               'duration': '4:35',
              'fileName': 'mere-papa.mp3',
              'image': 'MerePapa.jpg'
              },
              {
                'name': 'Mile Ho Tum Humko',
                'artist': 'Neha Kakkar',
                'album': 'Fever',
                'duration': '4:00',
               'fileName': 'mile-ho-tum-humko.mp3',
               'image': 'MileHoTum.jpg'
              },
              {
                'name': 'Nashe Si Chadh Gayi',
                'artist': 'Arijit Singh',
                'album': 'Nashe Si Chadh Gayi (Befikre)',
                'duration': '3:57',
               'fileName': 'nashe-si-chadh-gayi.mp3',
               'image': 'nashe.jpeg'
              },
              {
             'name': 'Soniyo Song',
             'artist': 'Sonu Nigam',
             'album': 'Raaz',
             'duration': '5:28',
            'fileName': 'soniyo.mp3',
            'image': 'soniyo.jpg'
            }
      ]

          var songNumber=1; //Means which song I have loaded right now

        function fancyTimeFormat(time)
            {
                  // Hours, minutes and seconds
                  var hrs = ~~(time / 3600);
                  var mins = ~~((time % 3600) / 60);
                  var secs = time % 60;

                  // Output like "1:01" or "4:03:59" or "123:03:59"
                  var ret = "";

                  if (hrs > 0) {
                      ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
              }

                  ret += "" + mins + ":" + (secs < 10 ? "0" : "");
                  ret += "" + secs;
                  return ret;
              }

      //Here we have defined our function
      function toggleSong()
      {
            // this line shows  html document find a tag audio and assign/store it in the variable song
            var song = document.querySelector('audio');
            console.log(songNumber);
            //song.paused used here so that we come to know that our song is in pause mode or not
            if(song.paused == true) {
            console.log('Playing');
            //Here use "jquery" find a class with "play-icon" and in that first of all remove the class of f"a-play" and add "fa-pause"
            //becz after play our next step will be pause "known as chaining"
            $('.play-icon').removeClass('fa-play').addClass('fa-pause');
            song.play();
            }
            else {
            console.log('Pausing');
            //Here use "jquery" find a class with "play-icon" and in that first of all remove the class of "fa-pause" and then add class of "fa-play"
            //becz after play our next step will be play "known as chaining"
            $('.play-icon').removeClass('fa-pause').addClass('fa-play');
            song.pause();
            }
      }

            //Function defined
            function changeCurrentSongDetails(songObj)
             {
                //Here we asked to Jquery that select a class name'current-song-image' and said that change its attribute of src and its value will be ('images/' + songObj.image')
                $('.current-song-image').attr('src','image/' + songObj.image)//Src made of name + file name
                $('.current-song-name').text(songObj.name) //songObj name means that we are accessing the name of the object that we got
                $('.current-song-album').text(songObj.album) //same with album
             }

      function updateCurrentTime() { // This function we use to update the time
            var song = document.querySelector('audio');
            // console.log(song.currentTime);
            // console.log(song.duration);
            //Here we stores both the times in a variable(currentTime and duration)
            var currentTime = song.currentTime;
            var duration = song.duration;
            var currentTime = Math.floor(song.currentTime); //Removes the decimal value
            currentTime = fancyTimeFormat(currentTime); //by this function time format will look good, here we have passed the value of current time function into current time variable
            var duration = Math.floor(song.duration); //Removes the decimal value
            duration = fancyTimeFormat(duration)
            //Take help of jquery and select the class time-elapsed and put the text of that class in currentTime variable
            $('.time-elapsed').text(currentTime);
            //Take help of jquery and select the class song-duration and put the text of that class in duration variable
            $('.song-duration').text(duration);
      }

            function timeJump() {
            var song = document.querySelector('audio');
            song.currentTime = song.duration - 5;
        }

//Here we have made this function so that I need not to reoeat one code again and again for playing and pausing my song
      function addSongNameClickEvent(songObj,position) {
        var songName=songObj.fileName;      // this will give audio source at line 156
                  var id = '#song' + position; //Here podition means (#song1, #sng2 and so on )
//Here then on the Id click even will perform for eg:- if position is '1 then id=#song1'
                  $(id).click(function() {
                  var audio = document.querySelector('audio');
                  var currentSong = audio.src;
                  if(songNumber != position) //here we will check that the position we got of new song that is same with old song playing or not
                  {
                    // and if diffrenct then we will do these two things
                    //we will change the source of audio and also then we will update the songNumber
                      audio.src = songName;
                      songNumber= position;
                      changeCurrentSongDetails(songObj);
                  }

                      toggleSong();

            });
            }

      window.onload = function() {

          //1. Wait for the website to load 2. Once it will load then run everything whatever it is inside the function
          changeCurrentSongDetails(songs[0]);   //change the details of bottom to first object in array of objects so that this will show details of first song automatically
          setInterval(function()
           { // setInterval function will show every 5sec duration of song
             updateCurrentTime();//setInterval is calling updateCurrentTime function
          },1000);

          // var songName1='Soniyo';
         //  var songName2='Izhaar';
         //  var songName3='Khaab';
         //  var songName4='Mere Papa';
         //  var songName5='Mile Ho Tum Humko';
         //  var songName6='Humma Humma';

            for(var i =0; i < songs.length;i++) {
                    var obj = songs[i];
                    var name = '#song' + (i+1);
                    var song = $(name);
                    song.find('.song-name').text(obj.name);
                    song.find('.song-artist').text(obj.artist);
                    song.find('.song-album').text(obj.album);
                    song.find('.song-length').text(obj.duration);
                    addSongNameClickEvent(obj,i+1)

                }

        $('#songs').DataTable({
          paging: false
        });

        }

        $('audio').on('ended',function() {
        var audio = document.querySelector('audio');
        if(currentSongNumber < 8) {
          var nextSongObj = songs[currentSongNumber];
                  audio.src = nextSongObj.fileName; // Change Soure
                  toggleSong(); // Play Next Song
                  changeCurrentSongDetails(nextSongObj); // Update Image
                  currentSongNumber = currentSongNumber + 1; // Change State
                        }
        else {
          $('.play-icon').removeClass('fa-pause').addClass('fa-play');
                audio.currentTime = 0;        }
        })


    //this line means use "jquery" and find a class with the name of "welcome-screen" and inside "button class" inside that and one we will click on that button the code below written here this should be run
    $('.welcome-screen button').on('click', function() {
     var value = $('#name-input').val(); //here the name-input value stores in variable value

    if(value.length > 2) //if the variable value has lenght greater than 2 then it will show that play icon otherwise not
         {
         var message = "Welcome to app, " + name;
        $('.main .user-name').text(message);
        $('.welcome-screen').addClass('hidden');
        $('.main').removeClass('hidden');
         }
    else
         { //means use "jquery" and hold the id "name-input" and addClass on this of name "error"
           $('#name-input').addClass('error'); // if length of name-input less than 2 so it will shown an error..for that we have written a code in css(.error{}border: 2px solid red;)
         }
     });

     $('.fa-repeat').on('click',function() {
     $('.fa-repeat').toggleClass('disabled')
     willLoop = 1 - willLoop;
      });

      $('.fa-random').on('click',function() {
      $('.fa-random').toggleClass('disabled')
      willShuffle = 1 - willShuffle;
       });

        //use jquery find a class of play.icon and on that perform click event
      // on clicking the play-icon class it will call to toggleSong function
        $('.play-icon').on('click', function () {
        //Here call a function name "toggleSong" so that we need not to write code again and again
        toggleSong();
        });

        //keypress events either use on body or form tag
        // "keypress" event works if we will press any key
        //here function(event) we use this becx we want the event files from browser

$('body').on('keypress',function(event) {
            var target = event.target; //it will save the target in a variable //mtlb jha pe event hua suppose mne humma song chlaya so wo event mtln mera humma song chlana is my target// mne agr searh bar pe click kia so that will be my  target agr uske bahar kia to mera target hua body
            if (event.keyCode == 32 && target.tagName !='INPUT')//&&=AND in this both must be true
            {
                toggleSong();
            }
        });
