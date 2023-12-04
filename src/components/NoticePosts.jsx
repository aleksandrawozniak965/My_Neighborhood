import React, {useState, useEffect} from "react";
import supabase from "../utilis/supabase.js";
import Comments from "./Comments.jsx";



export default function NoticePosts(){
    const [notices, setNotices] = useState([]);

    useEffect(() => {
        async function fetchNotices() {
            const {data, error} = await supabase
                .from('notice_board')
                .select('*');

            if (error) {
                console.error(error);
            }

            setNotices(data);
        }

        fetchNotices();
    }, [])

    return(
        <div className="notice_posts">
            <h2>Notice Posts</h2>
            <div className="notice_list">
                {notices.map((notice) => (
                    <div className="notice" key={notice.id}>
                        <h3>{notice.title_notice}</h3>
                        <p>{notice.description_notice}</p>
                        <p>Price: {notice.price_notice}</p>
                        <p>Description: {notice.description_notice}</p>
                        <p>Date: {notice.date_notice}</p>
                        <p>User: {notice.user_id_notice}</p>
                        <Comments noticeId={notice.id} />
                    </div>
                ))}
            </div>
        </div>
    )
}