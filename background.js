
try {
    console.log("start");
    self.importScripts('firebase/firebase-app.js');
    //self.importScripts('firebase/firebase-firestore.js');
    self.importScripts('firebase/firebase-database.js');
     

     
  
    handler.openIframe();
    
    const firebaseConfig = {
      apiKey: "AIzaSyDkzG6vHhG0vfawRuS_rolAN-UtyKl6itg",
      authDomain: "vula-22409.firebaseapp.com",
      databaseURL: "https://vula-22409-default-rtdb.firebaseio.com",
      projectId: "vula-22409",
      storageBucket: "vula-22409.appspot.com",
      messagingSenderId: "792368134860",
      appId: "1:792368134860:web:31ef7ade2c92bb4bfaa069",
      measurementId: "G-Q79YRE0M02"
    };
    
    //const getDatabase = require('firebase/firebase-database.js')
    
    firebase.initializeApp(firebaseConfig);
    console.log(firebaseConfig)
    //var db2 = firebase.firestore();
    var db = firebase.database();;

    chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
            if(request.command==='analytics'){
              //console.log("analytics post please...")

              chrome.storage.sync.get(['STUDENT_NUMBER'], function(result) {
                

                var date = new Date().toString();
                db.ref('students').child(result.STUDENT_NUMBER).set({lastRead: date });

              });

              

            }
      }
    );

    //  chrome.tabs.onActivated.addListener(tab =>{
//     var currentURL;
//     console.log(tab.url)
//     // if (tab.url && tab.url.includes("vula.uct.ac.za/portal")){
//     //     chrome.tabs.executeScript(null,{file:'./foreground.js'},() => console.log("i injected the file"))
        
    
//     // }

//     chrome.tabs.get(tab.tabId,current_tab_info =>{
//         console.log(current_tab_info.url)
        
//     });
    

  //   var docRef = db.collection("students").doc("ncbmkh005").collection( 'assignments').doc("Capstone Stage 2 Deliverables");      
                                              
  //                           docRef.get().then((doc) => {
  //                             if (!doc.exists) {
  //                                   console.log("doc does not exists")
  //                             } else {
  //                                 // doc.data() will be undefined in this case
  //                                 console.log(`${doc.title} :  exists!`);
  //                             }
  //                         }).catch((error) => {
  //                             console.log("Error getting document:", error);
  //                         });

  } catch (e) {
    console.error(e);
  }

//  console.log("starting..v.")
//  var obj = []

//  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){ 
//     console.log("got message")

//     if(request.assign_done!==undefined){
//         console.log(`we done : ${request.assign_done}`)
//     }

//     if(request.tests!==undefined){
//         console.log(`tests : ${request.tests}`)
//         window.localStorage["user"] = true;
//         window.localStorage["tests"] = request.tests;
//         // var list = JSON.parse(request.tests)
//         // const assignArray = list.map(assign => {
//         //     return JSON.parse(assign)
//         // })
//         // console.log(assignArray)
//     }
   

//     if(request.assigns!==undefined){
//         console.log(`assigns : ${request.assigns}`)
//         //console.log(`storage : ${localStorage.getItem('assigns')}`)
//         if(localStorage.getItem('assigns')!==undefined){
            
//             var string = ''
//             string += localStorage.getItem('assigns') + ' | ' + request.assigns    
//             console.log(`string stuff : ${string}`)
//             window.localStorage["assigns"] = string;
//             console.log(string)
//         }else{
//             //console.log(typeof request.assigns) 
//             window.localStorage["user"] = true;
//             window.localStorage["assigns"] = request.assigns;
//         }


        
        
        

//     }
    
    
//     // if(request._assign==="done"){
//     //     console.log('---------------done---------------')
//     //     console.log(obj)
//     // }else{
//     //     chrome.runtime.sendMessage({assessment: request._assign});
//     //     console.log(`String Object : ${JSON.stringify(request._assign)}`)
      
//     //     obj.push(request._assign)
//     // }
//     window.localStorage["assignments"] =  JSON.stringify(request._assign);
//   })

//  chrome.tabs.onActivated.addListener(tab =>{
     
//     chrome.tabs.get(tab.tabId,current_tab_info=>{
//         console.log(current_tab_info.url)
//         if (current_tab_info.url && current_tab_info.url.includes("vula.uct.ac.za/portal")){
//             console.log("yes!!")
//             chrome.tabs.executeScript(null,{file:'./foreground.js'},() => console.log("i injected the file"))
//         }
//     })
//  })
         


//  chrome.tabs.onActivated.addListener(tab =>{
//     var currentURL;
//     console.log(tab.url)
//     // if (tab.url && tab.url.includes("vula.uct.ac.za/portal")){
//     //     chrome.tabs.executeScript(null,{file:'./foreground.js'},() => console.log("i injected the file"))
        
    
//     // }

//     chrome.tabs.get(tab.tabId,current_tab_info =>{
//         console.log(current_tab_info.url)
        
//     });

     


//     // chrome.tabs.get(tab.tabId,current_tab_info => {
//     //     if(/^https:\/\/www\.vula/.test(current_tab_info.url)){
//     //         //chrome.tabs.insertCSS(null,{file:'./mystyles.css'})
//     //         chrome.tabs.executeScript(null,{file:'./foreground.js'},() => console.log("i injected the file"))
//     //         console.log("i have injected foreground script");
//     //         //document.querySelector('#main')
            
//     //     }
//     // })
// })


 
  
    

 