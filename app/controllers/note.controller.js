const Note = require('../models/note.model.js');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

// Create and Save a new Note
exports.create= (req, res) => {
	
	    
      
    // Create a Note
    const note = new Note({
        username: req.body.username || "Untitled User", 
        password: req.body.password
    });

    // Save Note in the database
    note.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while registering."
        });
    });


};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
	
	  Note.find()
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving."
        });
    });

};

// Find a single note with a noteId
exports.findOne = (req, res) => {
	
	 Note.findById(req.params.noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "user not found with ids " + req.params.noteId
            });            
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving User with id " + req.params.noteId
        });
    });

};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
	
	    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }

    // Find note and update it with the request body
    Note.findOneAndUpdate,(req.params.noteId, {
        title: req.body.title || "Untitled User",
        content: req.body.content
    }, {new: true})
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "User not found with id " + req.params.noteId
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error updating user with id " + req.params.noteId
        });
    });


};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
	
	Note.findByIdAndRemove(req.params.noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "User not found with id " + req.params.noteId
            });
        }
        res.send({message: "User deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Could not delete user with id " + req.params.noteId
        });
    });

};


exports.data = (req, res) => {
    var url="http://developer.goibibo.com/api/bus/search/?app_id=045ea148&app_key=3e449f37d35d060398943020050fcee5&format=json&source=delhi&destination=dehradun&dateofdeparture=20180905";

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
    
        val=data.data.onwardflights[i].BPPrims.list[0].BPLocation;
        obj['BPLocation'] = val;
    
        val=data.data.onwardflights[i].DPPrims.list[0].DPAddress;
        obj['DPAddress'] = val;
    
        val=data.data.onwardflights[i].RouteSeatTypeDetail.list[0].SeatsAvailable;
        obj['SeatsAvailable'] = val;
        Detail.push(obj);
    
    }
    
    res.send({Detail});}
    else{
        alert("error");
    }
    }
  getUserDetails();  

};
