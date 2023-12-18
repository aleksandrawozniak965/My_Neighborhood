import React, {useEffect, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import supabase from "../utilis/supabase.js";


export  default function Comments({noticeId}) {
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [user, setUser] = useState(null);
    const [editIndex, setEditIndex] = useState(null);
    const [editedComment, setEditedComment] = useState("");

    useEffect(() => {
        const getSessionData = async () => {
            try {
                const { data, error } = await supabase.auth.getSession();
                if (error) {
                    console.error(error);
                    return;
                }

                if (data) {
                    setUser(data.session.user.user_metadata.name);
                }
            } catch (error) {
                console.error(error);
            }
        };

        getSessionData();
    }, []);

    useEffect(() => {
        async function fetchComments () {
            const {data, error} = await supabase
                .from('comments_table')
                .select('id, comment_text, comment_author')
                .eq('comment_notice', noticeId)

            if(error) {
                console.error(error);
            }

            const transformedComments = data.map(comment => ({
                id: comment.id,
                text: comment.comment_text,
                author: comment.comment_author
            }));

            if (data) {
                setComments(transformedComments);
            }
        }
        fetchComments();
    }, [noticeId]);


    async function handleAddComment () {
        if (!comment.trim()) {
            alert("Komentarz nie może być pusty.");
        }

        const {error } = await supabase
            .from('comments_table')
            .insert([
                {
                    comment_text: comment,
                    comment_author: user,
                    comment_notice: noticeId,
                },
            ]);

        if (error) {
            console.error(error)
        }

        setComments((prevComments) => [
            ...prevComments,
            {
                text: comment,
                author: user,
            },
        ]);

        setComment('');
    }

    function handleEditComment(id) {
        const commentToEdit = comments.find(comment => comment.id === id);

        if (commentToEdit && user === commentToEdit.author) {
            setEditIndex(id);
            setEditedComment(commentToEdit.text);
        } else {
            alert("Nie masz uprawnień do edycji tego komentarza.");
        }
    }

    async function handleSaveEdit() {
        const { error } = await supabase
            .from('comments_table')
            .update({ comment_text: editedComment })
            .eq('id', editIndex);

        if (error) {
            console.error(error);
        }

        setComments(prevComments =>
            prevComments.map(comment =>
                comment.id === editIndex ? { ...comment, text: editedComment } : comment
            )
        );

        setEditIndex(null);
        setEditedComment("");
    }

    function handleCancelEdit() {
        setEditIndex(null);
        setEditedComment("");
    }


    async function handleDeleteComment(id) {
        const commentToDelete = comments.find(comment => comment.id === id);

        if (commentToDelete && user === commentToDelete.author) {
            const { error } = await supabase
                .from('comments_table')
                .delete()
                .eq('id', id);

            if (error) {
                console.error(error);
            }

            setComments(prevComments => prevComments.filter(comment => comment.id !== id));
        } else {
            alert("Nie masz uprawnień do usunięcia tego komentarza.");
        }
    }

    return (
        <>
            <div>
                <textarea
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button className="btn_comments" onClick={handleAddComment}>
                    Add Comment
                </button>
            </div>
            <div>
                {comments.map(({ id, text, author }, index) => (
                    <div key={index} className="comment_container">
                        {editIndex === id ? (
                            <div className="edit_container">
                                <input
                                    type="text"
                                    value={editedComment}
                                    onChange={(e) => setEditedComment(e.target.value)}
                                />
                                <div className="edit_btn_container">
                                <button className="btn_edit" onClick={handleSaveEdit}>Save</button>
                                <button className="btn_edit" onClick={handleCancelEdit}>Cancel</button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <p className="comment_text ">{author}: <span>{text}</span></p>
                                <div className="icons_container">
                                    <FontAwesomeIcon icon={faTrash} onClick={() => handleDeleteComment(id)} />
                                    <FontAwesomeIcon icon={faPenToSquare} onClick={() => handleEditComment(id)} />
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
}
