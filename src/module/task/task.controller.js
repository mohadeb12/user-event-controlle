const {eventCreateService,getMyEventService,updateEventService,deleteEventService} = require('./task.service');

exports.eventCreateController = async(req,res) =>{
    try{
      const data = req.body;
      data.owner = req.user._id;
        const event = await eventCreateService(data);
        res.status(201).json(event);
     }catch(err){
        res.status(500).json({message : err.message});
     }
};

exports.getMyEventController = async(req,res) =>{
   try{
      const userId = req.user._id
      const events = await getMyEventService(userId);
      res.status(200).json(events);
   }catch(err){
      res.status(500).json({message : err.message});
   }
};

exports.updateEventController = async(req,res) =>{
   try{
      const eventId = req.params.id;  //ei id ase link theke 
      const userId = req.user._id;     //ei di ase autho theke req.user theke

      const updatedEvent = await updateEventService(eventId,userId,req.body);
      res.status(200).json(updatedEvent);
   }catch(err){
      res.status(err.statusCode || 400).json({message : err.message});
   };
};

exports.deleteEventController =  async (req,res) =>{
   try{
      const eventId = req.params.id;
      const userId = req.user._id;
      const deletedEvent = await deleteEventService(eventId,userId);
      res.status(200).json(deletedEvent);
   }catch(err){
      res.status(err.statusCode || 400).json({message : err.message});
   };
};
