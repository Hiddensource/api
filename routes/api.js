const express = require('express');
const router = express.Router();
const Ninja = require ('../models/ninja');
const Ninja2 = require ('../models/ninja2');

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


router.get('/ninjas',function(req,res){
    res.send({type: 'GET'});
});
/*router.post('/ninjas',function(req,res){
  
    Ninja.create(req.body);
    res.send(busProvider);
});*/
router.put('/ninjas/:id',function(req,res){
    res.send({type: 'PUT'});
});
router.delete('/ninjas/:id',function(req,res){
    res.send({type: 'DELETE'});
});
router.post('/getBus',function(req,res){
    var source = req.body.source;
    var destination = req.body.destination;
    var ddate = req.body.ddate;
    var url="http://developer.goibibo.com/api/bus/search/?app_id=045ea148&app_key=3e449f37d35d060398943020050fcee5&format=json&source="+source+"&destination="+destination+"&dateofdeparture="+ddate+" ";

    function getUserDetails() {
        // var origin1=document.getElementById("origin1").value;
        // var d2=document.getElementById("d2").value;
        // var ddate1=document.getElementById("ddate1").value;   
    
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                displayUserInfo(request.responseText);
            }
        };
        request.open("GET", url, true);
        request.send();
    }
    
    
    var Detail=[];
    function displayUserInfo(response) {
        
        var val="";
        
        var data = JSON.parse(response);
        if(data.data!=null){
        for(var i=0;i<data.data.onwardflights.length;i++){
        
         val=data.data.onwardflights[i].origin;
        var obj = {};
        obj['origin'] = val;
        
        val=data.data.onwardflights[i].rating;
        obj['rating'] = val;
    
        val=data.data.onwardflights[i].DepartureTime;
        obj['departureTime'] = val;
    
        val=data.data.onwardflights[i].duration;
        obj['duration'] = val;
        
        val=data.data.onwardflights[i].avlWindowSeats;
        obj['avlWindowSeats'] = val;
    
        val=data.data.onwardflights[i].seat;
        obj['seat'] = val;
    
        val=data.data.onwardflights[i].busCondition;
        obj['busCondition'] = val;

        val=data.data.onwardflights[i].arrdate;
        obj['arrdate'] = val;
    
        val=data.data.onwardflights[i].destination;
        obj['destination'] = val;
    
        val=data.data.onwardflights[i].amenities;
        obj['amenities'] = val;
    
        val=data.data.onwardflights[i].ArrivalTime;
        obj['ArrivalTime'] = val;
    
        val=data.data.onwardflights[i].BusServiceID;
        obj['BusServiceId'] = val;
    
        val=data.data.onwardflights[i].gps;
        obj['gps'] = val;
    
        val=data.data.onwardflights[i].depdate;
        obj['depdate'] = val;
    
        val=data.data.onwardflights[i].BusType;
        obj['BusType'] = val;
    
        val=data.data.onwardflights[i].TravelsName;
        obj['TravelsName'] = val;
    
        val=data.data.onwardflights[i].fare.totalfare;
        obj['fare'] = val;
            
        var b=[];
        for(var j=0; j<data.data.onwardflights[i].BPPrims.list.length;j++){
            var BP = {};
            
        val=data.data.onwardflights[i].BPPrims.list[0].BPAddress;
        BP['BPAddress'] = val;
        val=data.data.onwardflights[i].BPPrims.list[0].BPContactNumber;
        BP['BPContactNumber'] = val;
        val=data.data.onwardflights[i].BPPrims.list[0].BPId;
        BP['BPId'] = val;
        val=data.data.onwardflights[i].BPPrims.list[0].BPLocation;
        BP['BPLocation'] = val;
        val=data.data.onwardflights[i].BPPrims.list[0].BPName;
        BP['BPName'] = val;
        val=data.data.onwardflights[i].BPPrims.list[0].BPTime;
        BP['BPTime'] = val;

        b.push(BP);
        }
        obj['BP'] = b; 
        
        var d=[];
        for(var j=0; j<data.data.onwardflights[i].DPPrims.list.length;j++){
            var DP = {};
            
        val=data.data.onwardflights[i].DPPrims.list[0].BPAddress;
        DP['DPAddress'] = val;
        val=data.data.onwardflights[i].DPPrims.list[0].BPContactNumber;
        DP['DPContactNumber'] = val;
        val=data.data.onwardflights[i].DPPrims.list[0].DPId;
        DP['DPId'] = val;
        val=data.data.onwardflights[i].DPPrims.list[0].DPLocation;
        DP['DPLocation'] = val;
        val=data.data.onwardflights[i].DPPrims.list[0].DPName;
        DP['DPName'] = val;
        val=data.data.onwardflights[i].DPPrims.list[0].DPTime;
        DP['DPTime'] = val;
    
        d.push(DP);
        }
        obj['DP'] = d; 
    
        val=data.data.onwardflights[i].RouteSeatTypeDetail.list[0].SeatsAvailable;
        obj['SeatsAvailable'] = val;
        Detail.push(obj);
        // for(var i=0;i<Detail.length;i++){
       
        // 
        
    // }
    }

   Ninja.create({Detail});
    Ninja2.create(data.data);
    console.log(data.data);
    res.send({Detail});}
    else{
        res.send("error");
    }
    }
  getUserDetails();  

});

module.exports = router;