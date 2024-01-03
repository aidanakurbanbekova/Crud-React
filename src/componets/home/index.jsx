import React, {useEffect, useState} from "react";
import styles from "./style.module.scss";
import {LuClipboardEdit} from "react-icons/lu";
import {MdOutlineDeleteForever} from "react-icons/md";
import {MdOutlinePlaylistAdd} from "react-icons/md";
import {useNavigate} from "react-router-dom";
import { VscSaveAs } from "react-icons/vsc";

const Home = () => {
    const navigate = useNavigate()
    const [blogs, setBlogs] = useState([])
    const [editUser, setEditUser] = useState(null);
    const [editedBlog, setEditedBlog] = useState({
        product: "",
        price: "",
    });

    useEffect(() => {
        const blogs = localStorage.getItem('blogs');
        setBlogs(JSON.parse(blogs));
    }, []);

    const handleDelete = (index) => {
        const updatedBlogs = blogs.filter((_, i) => i !== index);
        setBlogs(updatedBlogs);
        localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
        console.log(updatedBlogs)
    };
    const handleEditClick = (blog, index) => {
        setEditUser(index);
        setEditedBlog({
            product: blog.product,
            price: blog.price,
        });
    };
    const handleSaveEdit = () => {
        const updatedBlogs = [...blogs];
        updatedBlogs[editUser] = {
            product: editedBlog.product,
            price: editedBlog.price,
        };
        setBlogs(updatedBlogs);
        localStorage.setItem("blogs", JSON.stringify(updatedBlogs));

        // Сброс редактируемой записи и очистка полей ввода
        setEditUser(null);
        setEditedBlog({
            product: "",
            price: "",
        });
    };

    return (
        <div className={styles['home']}>
            <div>
                <button className={styles['add']} onClick={() => {
                    navigate('/crud')
                }}
                        type='text'>
                    <MdOutlinePlaylistAdd/>
                    Add
                </button>
            </div>
            <table>
                <thead>
                <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Action</th>
                </tr>
                </thead>
                {blogs && blogs.length > 0 ? (
                    blogs.map((blog, index) => (
                        <tbody key={index}>
                        <tr>
                            <td >
                                {editUser === index ? (
                                    <input
                                        className={styles['edit-save']}
                                        type="text"
                                        value={editedBlog.product}
                                        onChange={(e) =>
                                        setEditedBlog({...editedBlog, product: e.target.value})
                                        }
                                    />
                                ) : (
                                    blog.product
                                )}
                            </td>
                            <td>
                                {editUser === index ? (
                                    <input
                                        className={styles['edit-save']}
                                        type="text"
                                        value={editedBlog.price}
                                        onChange={(e) =>
                                            setEditedBlog({...editedBlog, price: e.target.value})
                                        }
                                    />
                                ) : (
                                    blog.price
                                )}
                            </td>
                            <td className={styles["button"]}>
                                {editUser === index ? (
                                    <button
                                        className={styles['button-save']}
                                        onClick={handleSaveEdit}>
                                        <VscSaveAs
                                        className={styles['save']}
                                        />
                                    </button>
                                ) : (
                                    <>
                                        <LuClipboardEdit
                                            onClick={() => handleEditClick(blog, index)}
                                            className={styles["btn-icon"]}
                                        />
                                        <MdOutlineDeleteForever
                                            onClick={() => handleDelete(index)}
                                            className={styles["btn-icon"]}
                                        />
                                    </>
                                )}
                            </td>
                        </tr>
                        </tbody>
                    ))
                ) : (
                    <tr>
                        <td colSpan="3">No Data found</td>
                    </tr>
                )}
            </table>
        </div>
    );
};

export default Home;


