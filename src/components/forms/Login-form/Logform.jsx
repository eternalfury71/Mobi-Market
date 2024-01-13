import React from "react";
import { useState } from "react";
import './logform.css'
import { EyeDisabled, EyeOpen } from "../../../assets/icons/icons";
import {useFormik} from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";


const Logform = () => {
    const [isHide, setHide] = useState(true);
    const loginUrl = 'https://neobook.online/mobi-market/swagger/users/login/';

    const handlePass = () => {
        setHide((prevHide) => !prevHide)
    }

    const [isActiveName, setActiveName] = useState(false);
    const [isActivePass, setActivePass] = useState(false);
    
    //Handling form

    const initialValues = {
        name: '',
        password: ''
    };


    const showError = () => toast('Error!');


    const validationSchema = Yup.object({
        name: Yup.string()
        .min(1, '')
        .max(15, '')
        .required('Required!'),
        password: Yup.string()
        .min(1, '')
        .required('Required!')
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (data) => {
            try {
                const res = await axios.post(loginUrl, data);
                if(res.status === 200) {
                    console.log('logged in!');
                    console.log(res.data);
                }
                else {
                    console.log('failed :(');
                    console.log(data);
                }
            } catch(error) {
                console.error('Error', error);
                console.log(data);
            }
        }
    }
    );

    
    return (
        <div className="login-form_container">
            <form onSubmit={formik.handleSubmit} action="" className="login-form">
                <div className="form-input input_name">
                    <input type="text" className={formik.errors.name ? 'error' : ''} name="name" id="name" onFocus= {() => setActiveName(true)} onBlur={() => setActiveName(!!formik.values.name)} value={formik.values.name} onChange={formik.handleChange}/>
                    <label className={isActiveName || formik.values.name ? 'active' : ''} htmlFor="name">Имя пользователя</label>
                </div>
                <div className="form-input input_password">
                    <input type={isHide ? 'password' : 'text'} className={formik.errors.password ? 'error' : ''} name="password" id="password" onFocus= {() => setActivePass(true)} onBlur={() => setActivePass(!!formik.values.password)} value={formik.values.password} onChange={formik.handleChange}/>
                    <div className="icon" onClick={handlePass}>
                        {isHide ? <EyeDisabled /> : <EyeOpen/>}
                    </div>
                    <label className={isActivePass || formik.values.password ? 'active' : ''} htmlFor="password">Пароль</label>
                </div>
                <span>Забыли пароль</span>
                <button type="submit" className="form-btn">Войти</button>
            </form>
            <h3>Зарегистрироваться</h3>
        </div>
    )
}

export default Logform;