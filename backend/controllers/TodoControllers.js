const Todo = require('../Models/TodoSchema');


/**
 * This function will create a user todo.
 * @param {String} req - Todo name, description, priority and userId
 * @param {String} res - Response
 */
const createTodo = (req,res)=>{
    const {name, description,priority} = req.body;
    const id = req.userData.id;
    const todo = new Todo({
        userId: id,
        name,
        description,
        priority
    });
    todo.save((err, todo)=>{
    if(err) return res.status(400).send({success: false, err});
    return res.status(200).send({message:'Todo created successfully', todo});
    })
}
const deleteTodo = async(req,res)=>{
    const userId = req.userData.id;
    const todoId = req.params.id;
    try{
        const todo = await Todo.findOneAndDelete({userId, _id: todoId});
        if(todo!==null)
            return res.status(200).send({message:'Todo deleted successfully', todo});
        return res.status(400).send({message:'Todo not found, couldn´t delete.'})
    }catch(error){
        return res.status(400).send({message:'Error deleting todo', error})
    }
}
const updateTodo = async(req, res)=>{
    try{
        const userId = req.userData.id;
    const todoId = req.params.id;
    const entries = Object.keys(req.body);
    const updates = {};
    entries.map((entrie, i)=>{
      updates[entrie] = Object.values(req.body)[i];
    });
    const todo = await Todo.findOneAndUpdate({userId, _id: todoId},{$set:updates}, {new: true, runValidators: true});
    return res.status(200).send({message:'Todo updated successfully', todo})
    }catch(error){
        return res.status(400).send({message:'Error updating todo', error});
    }
}
const getTodosByUserId = async(req,res)=>{
    try {
        const userId = req.userData.id;
        const todoId = req.params.id;

        //For pagination
        const limit = parseInt(req.query.limit);
        const page = parseInt(req.query.page);

        const startIndex = (page-1)*limit;
        const endIndex = page*limit;

        const todos = await Todo.find({userId}).limit(limit).skip(startIndex).exec();
        const count = await Todo.countDocuments({userId}).exec();

        if(startIndex>0){
            var previous = {
                page: page-1,
                limit: limit,
            }
        }
        if(endIndex<count){
            var next = {
                page: page+1,
                limit: limit,
            }
        }
        if(count<limit*page)
        return res.status(206).send({message:'Fill a valid page'});
        if(!todos){
            return res.status(404).send({message:'This user doesn´t has todos', success:false});
        }
        return res.status(200).json({message:'Todos found successfully', success:true, todos: todos, previous, next});
    } catch (error) {
        return res.status(400).send({message: 'Error getting todos', success: false, error: error});
    }
}
const getUserTodo = async(req,res)=>{
    const userId = req.userData.id;
    const todoId = req.params.id;
    try {
        const todo =   await Todo.findOne({_id: todoId, userId}).exec();
        if(!todo) return res.status(404).send({message:'No todo with such Id related to this user', success: false});
        return res.status(200).send({message:'Todo found successfully', success: true, todo});
    } catch (error) {
        return res.status(400).send({success: false, message:'Error finding Todo', error})   
    }
}
const editTodo = async(req,res)=>{
    //If todo userId is tried to update, it won't but a 200 status is returned
    const update = {};
    const entries = Object.keys(req.body);
    const _id = req.params.id;
    const userId = req.userData.id;
    entries.map((entrie,i)=>{
        update[entrie] = Object.values(req.body)[i];
    });
    console.log(update);
    try {
        const todo = await Todo.findOneAndUpdate({_id, userId},{$set:update},{new: true, runValidators: true});
        if(!todo) return res.status(404).send({message:'No todo found', success:'false'});
        return res.status(200).send({message:'Todo updated successfuly', success:true, newTodo: todo});
    } catch (error) {
        return res.status(400).send({message:'Error updating todo',success: false, error});
    }

}
const getUserTodosByPriority = async(req, res)=>{
    const userId = req.userData.id;
    const ascOrDesc = parseInt(req.body.type);
    let sort;
    switch(ascOrDesc){
        case 1:  sort = 'ascending';
        break;
        case 2:  sort = 'descending';
        break;
        //Works well if returned undefinded
        default: console.log('Undefinded');
        break;
    }
    console.log(sort)
    try {
        const todos = await Todo.find({userId}).sort({'priority': sort}).exec();
        if(!todos) return res.status(404).send({message:'No todos found.', success:false});
        return res.status(400).send({message:'Todos found successfully', todos, success:true})
    } catch (error) {
        return res.status(400).send({message:'Error getting todos.', success:false, error});
    }
}

module.exports = {
    createTodo,
    deleteTodo,
    updateTodo,
    getTodosByUserId,
    getUserTodo,
    editTodo,
    getUserTodosByPriority,
}