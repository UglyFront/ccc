import React, { useEffect } from 'react';
import { useState } from 'react';
import { createRef } from 'react';
import "./moder-posts.scss";
import { ADRESS } from '../redux/index';



const ModerPosts = () => {


    const [auth, setAuth] = useState(false)

    
    
    let inp = createRef()
    
    async function sendPass() {
        let pass = inp.current.value

        let body = {
            password: pass
        }

        var st = 0
        
        await fetch(`http://${ADRESS}:100/moderPassword`, {
            method: "post",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.status)
        .then(status => st = status)
        
        if (st === 200) {
            setAuth(true)
        }
        else {
            alert("Пароль не верен!")
        }
    }


    let [allUsers, setAllUsers] = useState([])
    
    
    
    function update() {
        fetch(`http://${ADRESS}:100/gettingusers`, {
            method: "get"
        })
        .then(response => response.json())
        .then(jsonData => setAllUsers(allUsers = jsonData))
        
        
        // 89.108.71.167
    }
    
    
    useEffect(() => {
        fetch(`http://${ADRESS}:100/gettingusers`, {
            method: "get"
        })
            .then(response => response.json())
            .then(jsonData => setAllUsers(allUsers = jsonData))
    }, [])


    let authorImgSrc = createRef();
    let postText = createRef();
    let authorName = createRef();
    let imgPost = createRef();
    let imgPost2 = createRef();

    async function createPost() {

        let body = {
            name: authorName.current.value,
            img: authorImgSrc.current.value,
            body: postText.current.value,
            imgPost: imgPost.current.value,
            imgPost2: imgPost2.current.value,

        };
        console.log(body);
        await fetch(`http://${ADRESS}:100/posts`, {
            method: "post",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => alert(data))



    }




    let deletePostId = createRef();

    async function deletePost() {
        let body = {
            id: deletePostId.current.value,
        }


        await fetch(`http://${ADRESS}:100/posts`, {
            method: "delete",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => alert(data))


    }

    let colvo = createRef()
    let nameToCoddyCoin = createRef()


    async function addCoin() {
        let col = colvo.current.value;
        let id = nameToCoddyCoin.current.value

        let body = {
            col: Number(col),
            id: Number(id),
        }


        await fetch(`http://${ADRESS}:100/addcoin`, {
            method: "put",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => alert(data))

        update()
    }


    let rname = createRef()
    let rlog = createRef()
    let rpass = createRef()
    let rcoin = createRef()


    function reg() {
        let body = {
            login: rlog.current.value,
            password: rpass.current.value,
            name: rname.current.value,
            coin: Number(rcoin.current.value),
        }



        if ((body.id && body.coin) === 0 && (body.login && body.password && body.name) === '') {
            alert("Форма пуста")

            setTimeout(() => {
                update()
            }, 500)

        }

        else {
            fetch(`http://${ADRESS}:100/registr`, {
                method: "post",
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => response.json())
                .then(data => alert(data))


            setTimeout(() => {
                update()
            }, 500)

        }


        setTimeout(() => {
            update()
        }, 500)


    }



    if (auth) {
        return (
            <div className='moderPosts'>
                <h1>Добавить Пост</h1>
                <form action="">
                    <div className="creactePost">
                        <input className="admin__input" ref={authorImgSrc} type="text" placeholder="Ссылка на изображение автора" required />
                        <input className="admin__input" ref={authorName} type="text" placeholder="ФИО Автора" required />
                        <input className="admin__input" ref={imgPost} type="text" placeholder="Ссылка на первое изображение" required />
                        <input className="admin__input" ref={imgPost2} type="text" placeholder="Ссылка на второе изображение" required />
                        <textarea className="admin__input creactePost__text-post" ref={postText} type="text" placeholder="Текст" required />
                        <h6 className="admin__button gradient" style={{ cursor: "pointer" }} onClick={(e) => createPost()}>Создать пост</h6>
                    </div>
                </form>


                <h1>Удалить пост</h1>
                <form action="">
                    <div className="deletePost">
                        <input className="admin__input" ref={deletePostId} type="number" placeholder="Id поста который хотите удалить" required />
                        <h6 className="admin__button gradient" style={{ cursor: "pointer" }} onClick={(e) => deletePost()}>Удалить пост</h6>
                    </div>
                </form>

                <div className="increase-coin">
                    <h1>Начислить CODDYCOIN</h1>
                    <form className="increase-coin__inputs-box" action="">
                        <input className="admin__input" ref={colvo} type="number" placeholder="Кол-во" />
                        <select ref={nameToCoddyCoin} name="" id="">
                            {allUsers.map(el => <option key={el.id} value={el.id}>{el.name}</option>)}

                        </select>
                        <h6 className="admin__button gradient increase-coin__button" style={{ cursor: "pointer" }} onClick={(e) => addCoin()}>Начислить</h6>
                    </form>
                </div>

                <h1>Зарегистрировать</h1>
                <form action="">
                    <div className="registration">
                        <input className="admin__input" ref={rname} type="text" placeholder="Имя, фамилия" required />
                        <input className="admin__input" ref={rlog} type="text" placeholder="login" required />
                        <input className="admin__input" ref={rpass} type="text" placeholder="password" required />
                        <input className="admin__input" ref={rcoin} type="number" placeholder="коины в наличии" required />
                        <h6 className="admin__button gradient" style={{ cursor: "pointer" }} onClick={(e) => reg()}>Зарегистрировать</h6>
                    </div>
                </form>



            </div>



        );
    } else {
        return (
            <div className="login__window">
                <form action="">

                    <input className="login__password" ref={inp} type="text" placeholder='ВВЕДИТЕ ПАРОЛЬ' />
                    <div className="gradient login__btn" onClick={(e) => {
                        sendPass()
                    }}>ВОЙТИ</div>
                </form>
            </div>


        );

    }


};

export default ModerPosts;
