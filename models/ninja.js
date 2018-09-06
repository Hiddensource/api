const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const NinjaSchema = new Schema({

   "Detail":  [{
    "BP":[ {
                    "BPAddress": "string",
                    "BPContactNumber": "string", 
                    "BPId": "string",
                    "BPLocation": "string",
                    "BPName":  "string",
                    "BPTime": {
                        "type": "date",
                        "format": "strict_date_optional_time||epoch_millis"
                    }
                }],
    "BusServiceID":  "string",
    "departureTime": "string",
   "avlWindowSeats": "string",
    "busCondition": "string",
    "destination": "string",
    "duration": "string",
    "origin":  "string",
    "rating":  "string",
    "seat": "string",
    "ArrivalTime": "string",
    "BusType": "string",
    "DP":[ {
                    "DPAddress": "string",
                    "DPContactNumber": "string",
                    "DPId":"string",
                    "DPLocation": "string",
                    "DPName": "string",
                    "DPTime": {"type":"date",
                              "format": "strict_date_optional_time||epoch_millis"
                               }
         } ],
                
                                        
      "TravelsName":"string",
      "amenities":"string",
      "arrdate": {
                    "type": "date",
                    "format": "strict_date_optional_time||epoch_millis"
                 },
                        
      "depdate": {
                     "type": "date",
                     "format": "strict_date_optional_time||epoch_millis"
                  },
       "fare": "string", 
       "gps":"string",
       "SeatsAvailable": "string"
                  
                        
        }
    
    ]},



{
timestamps: true
});



 
 

 const Ninja = mongoose.model('busProvider',NinjaSchema);



module.exports = Ninja;
