import React, {useEffect, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import supabase from "../utilis/supabase.js";


export  default function Comments({noticeId}) {
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [commentAuthor, setCommentAuthor] = useState("");
    const [editIndex, setEditIndex] = useState(null);


    useEffect(() => {
        async function getLoggedUser  (){
            const {data} = await supabase.auth.getSession();
            console.log(data);

            if (data) {
                setCommentAuthor(data.session.user.user_metadata.name);
                console.log(commentAuthor);
            }
        }
        getLoggedUser();
    }, []);


    useEffect(() => {
        async function fetchComments() {
            const { data, error } = await supabase
                .from('notice_board')
                .select('comments_notice')
                .eq('id', noticeId);

            if (error) {
                console.error(error);
            } else {
                setComments(data?.[0].comments_notice || []);
            }}
        fetchComments();
    }, [noticeId]);


    async function handleAddComment() {
        if (!comment.trim()) {
            alert("Komentarz nie może być pusty.");
            return;
        }

        if (editIndex !== null) {
            const updatedComments = [...comments];
            updatedComments[editIndex] = comment;

            const { data, error } = await supabase
                .from("notice_board")
                .update({
                    comments_notice: updatedComments,
                })
                .eq("id", noticeId)
                .select();

            if (error) {
                console.error(error);
            }

            if (data) {
                setComments(data[0]?.comments_notice || []);
                setEditIndex(null);
                setComment('');
            } else {
                setComments([]);
            }
        } else {

            const { data, error } = await supabase
                .from("notice_board")
                .update({
                    comments_notice: [...comments, comment],
                    comment_author: commentAuthor
                })
                .eq("id", noticeId)
                .select();

            if (error) {
                console.error(error);
            }

            if (data) {
                setComments(data[0]?.comments_notice || []);
                setComment("");
            } else {
                setComments([]);
            }
        }
    }

    async function handleDeleteComment(index) {
        const updatedComments = [...comments];
        updatedComments.splice(index, 1);

        const { data, error } = await supabase
            .from("notice_board")
            .update({
                comments_notice: updatedComments,
            })
            .eq("id", noticeId)
            .select();

        if (error) {
            console.error(error);
        }

        if (data) {
            setComments(data[0]?.comments_notice || []);
        } else {
            setComments([]);
        }
    }

    function handleEditComment(index) {
        setComment(comments[index]);
        setEditIndex(index);
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
                {comments.map((text, index) => (
                    <div key={index} className="comment_container">
                        <p className="comment_text ">{commentAuthor}:<span>{text}</span></p>
                        <div className="icons_container">
                            <FontAwesomeIcon icon={faTrash} onClick={() => handleDeleteComment(index)}/>
                            <FontAwesomeIcon icon={faPenToSquare} onClick={() => handleEditComment(index)}/>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
