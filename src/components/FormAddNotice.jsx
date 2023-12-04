import React, { useState, useEffect } from "react";
import supabase from "../utilis/supabase.js";
import Input from "./Input.jsx";
import Select from "./Select.jsx";

export default function FormAddNotice () {
    const [noticeTitle, setNoticeTitle] = useState("");
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [transactionTypes, setTransactionType] = useState([]);
    const [selectedTransaction, setSelectedTransaction] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
    const [user, setUser] = useState("");
    const [errors, setErrors] = useState({});


    useEffect(() => {
        async function fetchCategories () {
            const {data, error} = await supabase
                .from('categories_notice_board')
                .select('id, name_category');

            if (error) {
                console.error(error);
            }

            setCategories(data);
        }
        fetchCategories();
    }, []);


    useEffect(() => {
        async function fetchTransactionType () {
            const {data, error} = await supabase
                .from('transaction_types_notice_board')
                .select('id, name');

            if (error) {
                console.error(error);
            }

            setTransactionType(data);

            if (data.length > 0) {
                setSelectedTransaction(data[0].id.toString());
            }

        }
        fetchTransactionType();
    }, []);


    useEffect(() => {
       async function fetchUser  (){
            const {data} = await supabase.auth.getSession();
           console.log(data);

            if (data) {
                setUser(data.session.user.user_metadata.name);
                console.log(user)
            }
        }

        fetchUser();
    }, []);


    async function handleSubmit(e) {
        e.preventDefault();

        try {
            validateForm();
            const {data, error} = await supabase
                .from('notice_board')
                .insert([{
                    title_notice: noticeTitle,
                    category_notice: selectedCategory.toString(),
                    description_notice: description,
                    transaction_type_notice: selectedTransaction.toString(),
                    price_notice: price,
                    date_notice: date,
                    user_id_notice: user
                },
                ]);

            if (error) {
                console.error(error);
            } else {
                console.log("Notice form added successfully", data);
                clearForm();
            }
        } catch (error) {
            setErrors({...errors, [error.field]: error.message});
        }
    }

    function validateForm() {
        const errors = {};

        if (!noticeTitle) {
            errors.noticeTitle = "The title of the advertisement cannot be empty";
        }

        if (!description) {
            errors.description = "Description cannot be empty";
        }

        if (!price) {
            errors.price = "The price field cannot be empty";
        }

        if (Object.keys(errors).length > 0) {
            throw { field: Object.keys(errors)[0], message: errors[Object.keys(errors)[0]] };
        }
    }

        function clearForm() {
            setNoticeTitle("");
            setSelectedCategory("");
            setDescription("");
            setSelectedTransaction("");
            setPrice("");
            setDate(new Date().toISOString().slice(0, 10));
            setUser("");
            setErrors({});
        }

    return (
        <div className="form_add_notice">
            <h1>Add Notice</h1>
            <form onSubmit={handleSubmit}>

                <Input label="Notice title" value={noticeTitle} type="text" onChange={(value) => {
                    setNoticeTitle(value);
                    setErrors({ ...errors, noticeTitle: "" });
                }} error={errors.noticeTitle}/>

                <Select label="Select a Category" value={selectedCategory} onChange={setSelectedCategory}
                        options={categories.map((category) => (
                            { id: category.id, name: category.name_category}
                        ))} />

                <Select label="Transaction Type" value={selectedTransaction} onChange={setSelectedTransaction}
                options={transactionTypes.map((transaction) => (
                {id: transaction.id, name:transaction.name}
                    ))}
                />

                <Input label="Description" value={description} onChange={(value) => {
                    setDescription(value);
                    setErrors({ ...errors, description: "" });
                }} error={errors.description} type="textarea" />

                <Input label="Price" value={price} onChange={(value) => {
                    setPrice(value);
                    setErrors({ ...errors, price: "" });
                }} error={errors.price} type="number" />

                <Input label="Date" value={date} onChange={setDate} type="date"/>
                <Input label="User" value={user} onChange={setUser}/>
                <Input label="Upload Photo" type="file" accept="image.jpg, image.png"/>

                <button>Add Notice</button>
            </form>
        </div>
    )
}




















