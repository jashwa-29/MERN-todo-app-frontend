import React, { useState, useEffect } from 'react';

const Todo = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [todos, setTodos] = useState([]);
    const [editId, setEditId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');
    // const [task , setTask] = useState(0)
    const apiurl = 'https://mern-todo-app-backend-m0xf.onrender.com/';

    const addbtn = () => {
        if (title === '') {
            alert('Please enter the Title');
        } else if (description === '') {
            alert('Please enter the Description');
        } else {
            fetch(apiurl + 'todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: title,
                    description: description,
                }),
            })
                .then((res) => {
                    if (!res.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return res.json();
                })
                .then((data) => {
                    setTodos([...todos, data]);
                    setTitle('');
                    setDescription('');
                    setTask(task+1)
                })
                .catch((error) => {
                    console.error('API ERROR:', error);
                });
        }
    };

    useEffect(() => {
        getitems();
    }, []);

    const getitems = () => {
        fetch(apiurl + 'todos')
            .then((res) => res.json())
            .then((data) => setTodos(data));
    };

    const editbtn = (todo) => {
        setEditId(todo._id);
        setEditTitle(todo.title);
        setEditDescription(todo.description);
    };

    const savebtn = () => {
        if (editTitle === '') {
            alert('Please enter the Title');
        } else if (editDescription === '') {
            alert('Please enter the Description');
        } else {
            fetch(apiurl + 'todos/' + editId, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: editTitle,
                    description: editDescription,
                }),
            })
                .then((res) => {
                    if (!res.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return res.json();
                })
                .then((data) => {
                    const updatedTodos = todos.map((todo) =>
                        todo._id === editId ? data : todo
                    );
                    setTodos(updatedTodos);
                    setEditId(null);
                    setEditTitle('');
                    setEditDescription('');
                })
                .catch((error) => {
                    console.error('API ERROR:', error);
                });
        }
    };

    const cancelbtn = () => {
        setEditId(null);
    };

    const deletebtn = (id) => {
        fetch(apiurl + 'todos/' + id, {
            method: 'DELETE',
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(() => {
                const updatedTodos = todos.filter((todo) => todo._id !== id);
                setTodos(updatedTodos);
                setTask(task-1)
            })
            .catch((error) => {
                console.error('API ERROR:', error);
            });
    };

    return (
        <div className='px-10'>
            <h1 className='text-[50px] font-bold text-white text-center my-4'>ToDo List</h1>

            <div className='flex align-items-center md:flex-row flex-col justify-center gap-3 my-5'>
                <input
                    type='text'
                    placeholder='Title'
                    className='border-[1px] border-black text-[18px] rounded-[6px] py-2 ps-2 text-black'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type='text'
                    placeholder='Description'
                    className='border-[1px] border-black text-[18px] rounded-[6px] py-2 ps-2 text-black'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button
                    className='px-8 bg-black text-white py-3 rounded-[5px] hover:scale-105'
                    onClick={addbtn}
                >
                    Add
                </button>
            </div>

            <div className='flex flex-col justify-center items-center  lg:w-[54%] w-full h-auto mx-auto'>
                {/* {
                    task >=1 ?  <h2 className='text-center text-white font-bold text-[29px] underline'>Tasks</h2>:null

                    
                } */}
                {
                    todos.length >=1 ?  <h2 className='text-center text-white font-bold text-[29px] underline my-3'>Tasks</h2>:null
                }
               
               
                    {todos.map((todo) => (
                         <ul className='border-[2px] px-4 py-4'>
                        <li
                            key={todo._id}
                            className='flex items-center justify-between gap-3 md:gap-0 flex-wrap bg-slate-400 py-3 h-auto lg:w-[700px] w-[100%] px-3 rounded-sm my-2'
                        >
                            <div className='flex flex-col gap-1 lg:w-[400px] w-[100%]'>
                                {editId === null || editId !== todo._id ? (
                                    <>
                                        <p className='font-bold text-[22px] lg:w-[400px] w-[100%] break-all'>{todo.title}</p>
                                        <p className='font-medium text-[20px] lg:w-[400px] w-[100%] break-all '>{todo.description}</p>
                                    </>
                                ) : (
                                    <>
                                        <input
                                            type='text'
                                            placeholder='Title'
                                            className='border-[1px] border-black text-[18px] rounded-[6px] py-2 ps-2 text-black'
                                            value={editTitle}
                                            onChange={(e) => setEditTitle(e.target.value)}
                                        />
                                        <input
                                            type='text'
                                            placeholder='Description'
                                            className='border-[1px] border-black text-[18px] rounded-[6px] py-2 ps-2 text-black'
                                            value={editDescription}
                                            onChange={(e) => setEditDescription(e.target.value)}
                                        />
                                    </>
                                )}
                            </div>
                            <div className='flex gap-1'>
                                {editId === null || editId !== todo._id ? (
                                    <>
                                        <button
                                            className='bg-black py-6 px-6 h-0 rounded-[5px] text-white flex items-center'
                                            onClick={() => editbtn(todo)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className='bg-black py-6 px-6 h-0 rounded-[5px] text-white flex items-center'
                                            onClick={() => deletebtn(todo._id)}
                                        >
                                            Delete
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            className='bg-black py-6 px-6 h-0 rounded-[5px] text-white flex items-center'
                                            onClick={() => savebtn(todo._id)}
                                        >
                                            Save
                                        </button>
                                        <button
                                            className='bg-black py-6 px-6 h-0 rounded-[5px] text-white flex items-center'
                                            onClick={cancelbtn}
                                        >
                                            Cancel
                                        </button>
                                    </>
                                )}
                            </div>
                        </li>
  </ul>
                    ))}
              
            </div>
        </div>
    );
};

export default Todo;
