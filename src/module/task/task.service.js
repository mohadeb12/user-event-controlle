const Event = require("./task.model");

exports.eventCreateService = async ({ name, description, date, place, owner }) => {
  const event = new Event({ name, description, date, place, owner });
  return await event.save();
};

exports.getMyEventService = async (userId) => {
  const allevent = await Event.find({ owner: userId }).sort({ createdAt: -1 });
  return allevent;
};

exports.updateEventService = async ( eventId, userId, payload ) => {
   const updated = await Event.findOneAndUpdate(
    { _id: eventId, owner: userId },
    {
      name: payload.name,
      description: payload.description,
      date: payload.date,
      place: payload.place,
    },
    { new: true }
  );
  if (!updated) {
    const error = new Error('Event is not found or not yours');
    error.statusCode = 404;
    throw error;
  }
  return updated;
};

exports.deleteEventService = async (eventId, userId) =>{
  const deleted = await Event.findOneAndDelete(
    {_id : eventId,
      owner : userId
    }
  );
  if(!deleted){
    const error = new Error('Event is not found or not yours');
    error.statusCode = 404;
    throw error;
  };
  return deleted;
};