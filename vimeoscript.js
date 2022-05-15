var tagVimeo = document.createElement('script');
tagVimeo.src = "https://player.vimeo.com/api/player.js";
var firstScriptTagVimeo = document.getElementsByTagName('script')[0];

//Para localização do tracking
var t1 = 0; 
var t2 = 0; 
var n;
var checkpointNumber; 
var dt

firstScriptTagVimeo.parentNode.insertBefore(tagVimeo, firstScriptTagVimeo);


var script = document.createElement('script');
script.onload = function () {
      var videoPause = true;
      var videoTitle = document.getElementById('videoTitle');
      videoTitle.addEventListener('click',changeVideoStatus)
      const options = {
      id: 699155072,
      width: 980,
      loop: false,
      keyboard: false,
      title: false,
      controls: false,
      autoplay: true,
    };


    function clusterization(time,dt,n_cluster){

        let timerPoints = Array.from(Array(n_cluster).keys()).map(x=>x+1); 
        let t_adi = time/dt;
        
        var deltaTempo = timerPoints.map(x => x-t_adi); 
        var kluster = deltaTempo.findIndex(x=>x>0);
        return(kluster)
        }

    //const playerVimeo = new Vimeo.Player('videoVimeo', options);
    const iframe = document.querySelector('iframe');
    const playerVimeo = new Vimeo.Player(iframe);


    playerVimeo.on('play', function() {
      
      function changeWebsite(){
          playerVimeo.getCurrentTime().then(function(seconds) {


            playerVimeo.getDuration().then(function(duration) {
                    //Paraêmtros de tracking
                      
                      checkpointNumber = 15;
                      dt = duration/checkpointNumber;
                      
                      if (seconds>t1 && seconds>=t2){
                          t1 = t2;
                          t2 = t2 + dt;
                          n = clusterization(seconds,dt,checkpointNumber);
                          console.log(n);
                      
                          var form = document.createElement("form");
                          var dataSaved = document.createElement("input");
                              dataSaved.setAttribute("type", "text");
                              dataSaved.setAttribute("name", String(n));
                              dataSaved.setAttribute("placeholder", "Full Name");
                              dataSaved.setAttribute("id",String(n));
                              dataSaved.setAttribute("value",'1');
                          
                          form.appendChild(dataSaved);
                              const urlSource = 'https://script.google.com/macros/s/AKfycbxJpCaRJVmGfOT3GfPYj5TNc-ygtcP7Vh3812fV3Utwx1u_mkRR9YaWI56A_3Y0P3YsCw/exec';
                          
                          fetch(urlSource, { method: 'POST', body: new FormData(form)})
                                      .then(response => console.log('deu óootemo'))
                                      .catch(error => console.log('deu ruim')) 
                      
                      
                      }
                      
                      
                      if(seconds>2283){
                          const sectionToShow = document.querySelectorAll('.sectionHidden');
                          for(i = 0; i < sectionToShow.length; i++) {
                              sectionToShow[i].style.display = 'block';
                          }
                      // clearInterval(videoRepeater);
                    }
                    
                    
                    if(seconds>4){
                          videoTitle.innerHTML = ""
                    }
                    
                    
          }).catch(function(error) {
              console.log('Erro nas funções de tempo1')
          });
            }).catch(function(error) {
              console.log('Erro nas funções de tempo2')
            }); 


          }



      videoRepeater = setInterval(() => changeWebsite(), 1000);
    }


                  );

      
      function changeVideoStatus(){

        if (videoPause){

          playerVimeo.play().then(function() {
              // the video was played
          }).catch(function(error) {
            switch (error.name) {
              case 'PasswordError':
                // the video is password-protected and the              viewer needs to enter the
                // password first
                break;
    
              case 'PrivacyError':
                // the video is private
                break;
    
              default:
                // some other error occurred
                break;
            }
          });
            videoPause = false;
              }
              else{

                  playerVimeo.pause().then(function() {
                    // the video was paused
                    }).catch(function(error) {
                    switch (error.name) {
                    case 'PasswordError':
                      // the video is password-protected and the viewer needs to enter the
                      // password first
                      break;

                    case 'PrivacyError':
                      // the video is private
                      break;

                    default:
                      // some other error occurred
                      break;
                     }
                  });
                  
                  videoPause = true;
              }
      videoTitle.innerHTML = ""
      
      
  }

  };
  script.src = "https://player.vimeo.com/api/player.js";

  document.head.appendChild(script);