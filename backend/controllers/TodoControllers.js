const Todo = require('../Models/TodoSchema');

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
            return res.status(200).send({message:'Todo deleted succesfully', todo});
        return res.status(400).send({message:'Todo not found, couldn´t delete.'})
    }catch(error){
        return res.status(400).send({message:'Error deleting todo', error})
    }
}
const updateTodo = (req, res)=>{
    const userId = req.userData.id;
    const entries = Object.keys(req.body);
    const updates = {};
    entries.map((entrie, i)=>{
        updates[entrie] = Object.values(req.body)[i];
    })
}

module.exports = {
    createTodo,
    deleteTodo,
    updateTodo
}