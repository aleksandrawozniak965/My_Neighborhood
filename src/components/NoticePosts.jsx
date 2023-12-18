import React, {useState, useEffect} from "react";
import supabase from "../utilis/supabase.js";
import Comments from "./Comments.jsx";


export default function NoticePosts() {
    const [notices, setNotices] = useState([]);

    useEffect(() => {
        async function fetchNotices() {
            const { data, error } = await supabase
                .from('notice_board')
                .select('*');

            if (error) {
                console.error(error);
            }

            setNotices(data);
        }

        fetchNotices();
    }, []);

    return (
        <div className="notice_posts">
            <h2>Notice Posts</h2>
            <div className="notice_list">
                {notices.map((notice) => (
                    <div className="notice" key={notice.id}>
                        <h3>{notice.title_notice}</h3>
                        <p>{notice.description_notice}</p>
                        <CategoryDisplay categoryId={notice.category_notice} />
                        <TransactionDisplay transactionId={notice.transaction_type_notice} />
                        <p>Price: {notice.price_notice}</p>
                        <p>Description: {notice.description_notice}</p>
                        <p>Date: {notice.date_notice}</p>
                        <p>User: {notice.user_id_notice}</p>
                        <Comments noticeId={notice.id} />
                    </div>
                ))}
            </div>
        </div>
    );
}


function CategoryDisplay({ categoryId }) {
    const [categoryName, setCategoryName] = useState([]);

    useEffect(() => {
        async function fetchCategoryName() {
            const { data, error } = await supabase
                .from('categories_notice_board')
                .select('id, name_category')
                .eq('id', categoryId);

            if (error) {
                console.error(error);
                return;
            }

            const transformedCategories = data.map(category => ({
                id: category.id,
                name: category.name_category
            }));

            setCategoryName(transformedCategories);
        }

        fetchCategoryName();
    }, [categoryId]);

    return (
        <p>
            Category: {categoryName.map(category => category.name).join(', ')}
        </p>
    );
}


function TransactionDisplay({ transactionId }) {
    const [transactionName, setTransactionName] = useState('');

    useEffect(() => {
        async function fetchTransactionName() {
            const { data, error } = await supabase
                .from('transaction_types_notice_board')
                .select('id, name')
                .eq('id', transactionId);

            if (error) {
                console.error(error);
                return;
            }

            const transformedTransactions = data.map(transaction => ({
                id: transaction.id,
                name: transaction.name
            }));

            if (transformedTransactions.length > 0) {
                setTransactionName(transformedTransactions[0].name);
            }
        }

        fetchTransactionName();
    }, [transactionId]);

    return <p>Transaction: {transactionName}</p>;
}