import { createRef, useEffect, useState } from "react";
import "./admin.scss";
import { ADRESS } from "../redux/index";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { allLessons } from "../redux/action";
import { Link } from "react-router-dom"

function Admin() {

    const [orderHandler, changeOrderHandler] = useState(false);
    const [userHandler, changeUserHandler] = useState(false);
    const [aplicationsHandler, changeAplicationsHandler] = useState(false);

    const style = {
        width: "100%",
        minHeight: "100vh",
        maxHeight: '100%',
        background: '#fff',
    }




    const dispatch = useDispatch()

    function update() {
        fetch(`http://${ADRESS}:100/gettingusers`, {
            method: "get"
        })
            .then(response => response.json())
            .then(jsonData => setAllUsers(allUsers = jsonData))




        fetch(`http://${ADRESS}:100/order`)
            .then(response => response.json())
            .then(data => setGetAllOrder(getAllOrder = data))

        // Получить все заявки
        fetch(`http://${ADRESS}:100/gocourse`)
            .then(response => response.json())
            .then(data => setAllAplications(allAplications = data))


        fetch(`http://${ADRESS}:100/all`)
            .then(response => response.json())
            .then(data => setGetAll(getAll = data))


        fetch(`http://${ADRESS}:100/categories`)
            .then(response => response.json())
            .then(data => setGetAllCat(getAllCat = data))


        dispatch(allLessons())


    }


    useEffect(() => {
        fetch(`http://${ADRESS}:100/gettingusers`, {
            method: "get"
        })
            .then(response => response.json())
            .then(jsonData => setAllUsers(allUsers = jsonData))
    }, [])

    useEffect(() => {
        fetch(`http://${ADRESS}:100/order`)
            .then(response => response.json())
            .then(data => setGetAllOrder(getAllOrder = data))
    }, [])

    useEffect(() => {
        fetch(`http://${ADRESS}:100/all`)
            .then(response => response.json())
            .then(data => setGetAll(getAll = data))
    }, [])

    useEffect(() => {
        fetch(`http://${ADRESS}:100/categories`)
            .then(response => response.json())
            .then(data => setGetAllCat(getAllCat = data))
    }, [])


    // Получить все заявки
    useEffect(() => {
        fetch(`http://${ADRESS}:100/gocourse`)
            .then(response => response.json())
            .then(data => setAllAplications(allAplications = data))
    }, [])






    let [getAllOrder, setGetAllOrder] = useState([])

    let [getAllCat, setGetAllCat] = useState([])

    let [getAll, setGetAll] = useState([])

    let [allUsers, setAllUsers] = useState([])



    // Все заявки
    let [allAplications, setAllAplications] = useState([])


    let [auth, setAuth] = useState(false)
    let inpv = createRef()


    async function admLogin() {
        let pass = inpv.current.value

        let body = {
            password: pass
        }

        var st = 0
        
        await fetch(`http://${ADRESS}:100/admPassword`, {
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






    function clear() {

        let sure = window.confirm("Вы уверены что хотите удалить все заявки ?")

        if (sure) {
            fetch(`http://${ADRESS}:100/clear`, {
                method: "put"
            })

            setTimeout(() => {
                update()
            }, 500)
        }

    }


    let catName = createRef()
    // let catId = createRef()

    function addCat() {


        let name = catName.current.value
        // let cat_id = catId.current.value


        let body = {
            // cat_id: Number(cat_id),
            name: name
        };

        if (name.length !== 0) {
            fetch(`http://${ADRESS}:100/categories`, {
                method: "post",
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            setTimeout(() => {
                update()
                alert("Категория " + name + " добавлена!")
            }, 500)
        }


        setTimeout(() => {
            update()
        }, 500)

    }


    function delCat(id) {
        let body = {
            id: id
        }

        fetch(`http://${ADRESS}:100/delcat`, {
            method: "delete",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        })



        setTimeout(() => {
            update()
        }, 500)

    }



    let imgel = createRef()
    let nameel = createRef()
    let idcatel = createRef()
    let priceel = createRef()
    let priceelrubles = createRef()

    async function addEl() {
        let img = imgel.current.value;
        let name = nameel.current.value;
        let price = priceel.current.value;
        let pricerub = priceelrubles.current.value;
        let cat_id = idcatel.current.value;

        let uniq = true

        getAll.forEach(el => {
            if (el.name === name) {
                uniq = false
            }
        })

        if (uniq) {
            let body = {
                img: img,
                name: name,
                price: +price,
                price_rub: +pricerub,
                cat_id: Number(cat_id)
            }

            if ((name && price && cat_id) !== "") {
                await fetch(`http://${ADRESS}:100/newelement`, {
                    method: "post",
                    body: JSON.stringify(body),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                update()
                alert(`Товар ${name} добавлен`);
            }

            update()
        }

        else {
            alert("Повторяющиеся имена товаров недопустимы")
        }

    }



    function delElement(name) {
        let body = {
            name: name
        }

        fetch(`http://${ADRESS}:100/delel`, {
            method: "delete",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        })

        setTimeout(() => {
            update()
        }, 500)

    }




    let colvo = createRef()
    let nameToCoddyCoin = createRef()

    function addCoin() {
        let col = colvo.current.value;
        let id = nameToCoddyCoin.current.value

        let body = {
            col: Number(col),
            id: Number(id),
        }


        fetch(`http://${ADRESS}:100/addcoin`, {
            method: "put",
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


    let rname = createRef()
    let rparent = createRef()
    let rphone = createRef()
    let rage = createRef()
    let rlog = createRef()
    let rpass = createRef()
    let rcoin = createRef()


    function reg() {
        let body = {
            login: rlog.current.value,
            password: rpass.current.value,
            name: rname.current.value,
            parent: rparent.current.value,
            phone: rphone.current.value,
            age: +rage.current.value, 
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



    async function delOrder(id) {

        let body = {
            id: id,
        }


        await fetch(`http://${ADRESS}:100/delOrder`, {
            method: "put",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        })

        update()
    }







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
        debugger
        await fetch(`http://${ADRESS}:100/posts`, {
            method: "post",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => alert(data))

        update()


    }


    let deletePostId = createRef();

    async function deletePost() {
        let body = {
            id: deletePostId.current.value,
        }


        let sure = window.confirm(`Вы уверены что хоитите удалить ${body.id} пост ?`)

        if (sure) {

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

    }


    let courseTitle = createRef();
    let courseDescription = createRef();
    let courseImg = createRef();
    let coursePrice = createRef();


    async function createCourse() {

        let body = {
            title: courseTitle.current.value,
            description: courseDescription.current.value,
            img: courseImg.current.value,
            price: coursePrice.current.value,
        };

        if (body.title && body.description && body.img && body.price) {

        } else {
            alert("Заполните все поля");
            return
        }

        console.log(body);
        await fetch(`http://${ADRESS}:100/courses`, {
            method: "post",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => alert(data))

        update()


    }


    async function deleteAplication(id) {
        let body = {
            id: id,
        }


        await fetch(`http://${ADRESS}:100/gocourse`, {
            method: "delete",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },

        })
            .then(response => response.json())
            .then(data => alert(data))

        update()

    }

    async function deleteAllAplications() {

        let sure = window.confirm("Вы уверены что хотите удалить все заявки ?")

        if (sure) {
            await fetch(`http://${ADRESS}:100/gocourse_all`, {
                method: "delete",
            })
                .then(response => response.json())
                .then(data => alert(data))

            update()
        }


    }


    let deleteCourseId = createRef();

    async function deleteCourse() {
        let body = {
            id: deleteCourseId.current.value,
        }


        await fetch(`http://${ADRESS}:100/courses`, {
            method: "delete",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },

        })
            .then(response => response.json())
            .then(data => alert(data))

    }



    let upd = createRef()

    function updModer() {
        let body = {
            newPass: upd.current.value
        }

        fetch(`http://${ADRESS}:100/updateModerPassword`, {
            method: "put",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => alert(data))
    }








    async function delUser(id) {


        let body = {
            id: id
        }

        let c = window.confirm("Удалить пользователя " + id)

        if (c) {
            await fetch(`http://${ADRESS}:100/user`, {
                method: "delete",
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            update()
        }


    }




    let day = createRef()


    async function addDay() {
        let name = day.current.value


        if (name !== ``) {

            let body = {
                name: name
            }

            await fetch(`http://${ADRESS}:100/day`, {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            alert(`День ${name} добавлен`)
        }
        else {
            alert("Поля пустые")
        }
        update()
    }






    let days = useSelector(state => state.reducer.sch)


    let day_id = createRef()
    let course = createRef()
    let time = createRef()

    async function addLesson() {


        if ((course.current.value && time.current.value) !== ``) {

            let body = {
                day_id: +day_id.current.value,
                name: course.current.value,
                time: time.current.value
            }

            await fetch(`http://${ADRESS}:100/lessons`, {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            alert(`Урок ${body.name} на ${body.time} добавлен`)
        }

        else {
            alert("Поля пустые")
        }
        update()
    }







    let removeday = createRef()


    async function removeDay() {
        let body = {
            id: removeday.current.value
        }

        await fetch(`http://${ADRESS}:100/day`, {
            method: "DELETE",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            }
        })

        alert("День удален")

        update()
    }



















    if (!auth) {
        return (
            <div className="login__window">
                <form action="">
                    <input className="login__password" ref={inpv} type="text" placeholder="Введите пароль" />
                    <div className="gradient login__btn" onClick={() => { admLogin()}}>Войти</div>
                </form>
            </div>

        )
    }



    else if (auth) {
        return (
            <div className="admin-block" style={style}>
                <Link to = "table"><h4 style={{ textAlign: 'left', cursor: "pointer", color: "blue" }}>ТАБЛИЦА КЛИЕНТОВ</h4></Link>
                <h1 style={{ textAlign: 'center' }}>Админка</h1>

                <div className="orders-title">
                    <h2 className="orders-header" onClick={() => changeOrderHandler(!orderHandler)}>Заказы</h2>

                    {orderHandler && <div className="orders">


                        {getAllOrder.length === 0 ?
                            <h3 key={1}>Заказов нет</h3>
                            :
                            getAllOrder.map(el => {
                                return (
                                    <div className="order" key={el.id}>
                                        {el.name} заказывает {el.order_name}
                                        стоимостью {el.price}
                                        <span style={{ 'cursor': "pointer", "color": "red" }} onClick={() => delOrder(el.id)}>x</span>
                                    </div>

                                )
                            })
                        }
                        <h6 className="admin__button gradient" style={{ cursor: "pointer" }} onClick={() => clear()}>Очистить все</h6>

                    </div>}
                </div>







                <div style={{ marginTop: "20px" }} className="orders-title">
                    <h2 className="orders-header" onClick={() => changeUserHandler(!userHandler)}>Пользователи</h2>

                    {userHandler && <div className="orders">


                        {allUsers.length === 0 ?
                            <h3 key={1}>Пользователей нет</h3>
                            :
                            allUsers.map(el => {
                                return (
                                    <div className="order" key={el.id}>
                                        id :{el.id} <br />
                                        {el.name}<br />
                                        coins: {el.coin}<br />
                                        <span style={{ 'cursor': "pointer", "color": "red", "fontSize": "30px" }} onClick={() => delUser(el.id)}>x</span>
                                    </div>

                                )
                            })
                        }
                    </div>}
                </div>




















                <div className="applications-block">

                    <h2 className="orders-header" onClick={() => changeAplicationsHandler(!aplicationsHandler)}>Заявки</h2>

                    {aplicationsHandler && <div className="aplications">
                        {allAplications.map(aplication => {
                            return (
                                <div className="aplication__item">
                                    <p>Родитель: {aplication.parent}</p>
                                    <p>Ребенок: {aplication.child}</p>
                                    <p>Возраст: {aplication.age}</p>
                                    <p>Телефон: {aplication.phone}</p>
                                    <p>Курс: {aplication.course_title}</p>
                                    <button
                                        onClick={() => deleteAplication(aplication.id)}
                                    >Удалить</button>
                                </div>

                            )
                        })}
                        <h6 className="admin__button gradient" style={{ cursor: "pointer" }} onClick={() => deleteAllAplications()}>Удалить все заявки</h6>
                    </div>}

                </div>

                <form className="add-category" action="" style={{ marginTop: "20px" }}>
                    <h1>Добавить категорию</h1>
                    <div className="add-category__inputs-box">
                        <input className="add-category__input admin__input" ref={catName} type="text" placeholder="Название" />
                        <h6 className="admin__button gradient" style={{ cursor: "pointer" }} onClick={() => addCat()}>Добавить</h6>
                    </div>
                </form>


                <form action="" style={{ marginTop: "20px" }}>
                    <h1>Добавить товар</h1>
                    <div className="add-product">
                        <input className="admin__input" ref={imgel} type="text" placeholder="Ccылка на картинку" />
                        <input className="admin__input" ref={nameel} type="text" placeholder="Название" />
                        <input className="admin__input" ref={idcatel} type="number" placeholder="id Категории" />
                        <input className="admin__input" ref={priceel} type="number" placeholder="Цена COINS" />
                        <input className="admin__input" ref={priceelrubles} type="number" placeholder="Цена рубли (НЕОБЯЗАТЕЛЬНО)" />
                        <h6 className="admin__button gradient" style={{ cursor: "pointer" }} onClick={() => addEl()}>Добавить</h6>
                    </div>
                </form>




                <h1 style={{ marginTop: "20px" }}>ID существующих категорий:</h1>
                {getAllCat.map(el => <li>{el.name} = id: {el.id} <span style={{ cursor: "pointer" }} onClick={() => delCat(el.id)}>x</span></li>)}

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
                        <input className="admin__input" ref={rparent} type="text" placeholder="ФИО родителя" required />
                        <input className="admin__input" ref={rphone} type="text" placeholder="Телефон родителя" required />
                        <input className="admin__input" ref={rage} type="text" placeholder="Возраст ребенка" required />
                        <input className="admin__input" ref={rlog} type="text" placeholder="Логин" required />
                        <input className="admin__input" ref={rpass} type="text" placeholder="Пароль" required />
                        <input className="admin__input" ref={rcoin} type="number" placeholder="Коины в наличии" required />
                        <h6 className="admin__button gradient" style={{ cursor: "pointer" }} onClick={(e) => reg()}>Зарегистрировать</h6>
                    </div>
                </form>

                <h1>Добавить Пост</h1>
                <form className="admin-createPost" action="">
                    <div className="creactePost">
                        <input className="admin__input" ref={authorImgSrc} type="text" placeholder="Ссылка на изображение автора" required />
                        <input className="admin__input" ref={authorName} type="text" placeholder="ФИО Автора" required />
                        <input className="admin__input" ref={imgPost} type="text" placeholder="Ссылка на первое изображение" required />
                        <input className="admin__input" ref={imgPost2} type="text" placeholder="Ссылка на второе изображение" required />
                        <textarea className="admin__input" ref={postText} type="text" placeholder="Текст" required />
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

                <h1>Добавить Курс</h1>
                <form className="admin-createPost" action="">
                    <div className="creactePost">
                        <input className="admin__input" ref={courseTitle} type="text" placeholder="Название курса" required />
                        <input className="admin__input" ref={courseImg} type="text" placeholder="Ссылка на изображение курса" required />
                        <input className="admin__input" ref={coursePrice} type="text" placeholder="Цена на курс" required />
                        <textarea className="admin__input" ref={courseDescription} type="text" placeholder="Описание курса" required />
                        <h6 className="admin__button gradient" style={{ cursor: "pointer" }} onClick={(e) => createCourse()}>Создать курс</h6>
                    </div>
                </form>

                <h1>Удалить курс</h1>
                <form action="">
                    <div className="deletePost">
                        <input className="admin__input" ref={deleteCourseId} type="number" placeholder="Id Курса который хотите удалить" required />
                        <h6 className="admin__button gradient" style={{ cursor: "pointer" }} onClick={(e) => deleteCourse()}>Удалить курс</h6>
                    </div>
                </form>

                <h1>Добавить день проведения уроков</h1>
                <form action="">
                    <div className="creactePost">
                        <input ref={day} className="admin__input" type="text" placeholder="Например: Пятница" required />
                        <h6 className="admin__button gradient" style={{ cursor: "pointer" }} onClick={(e) => addDay()}>Добавить день</h6>
                    </div>
                </form>


                <h1>Добавить занятие</h1>
                <form action="">
                    <div className="creactePost">
                        <span>Выберите день</span>
                        <select ref={day_id} name="" id="">

                            {days.map(el => <option key={el.id} value={el.id}>{el.name}</option>)}

                        </select>
                        <input ref={course} className="admin__input" type="text" placeholder="Курс" required />
                        <input ref={time} className="admin__input" type="text" placeholder="Время: пример 14:30" required />
                        <h6 className="admin__button gradient" style={{ cursor: "pointer" }} onClick={(e) => addLesson()}>Добавить занятие</h6>
                    </div>
                </form>


                <h1>Удалить день проведения уроков</h1>
                <form action="">
                    <div className="creactePost">
                        <select ref={removeday} name="" id="">
                            {days.map(el => <option key={el.id} value={el.id}>{el.name}</option>)}
                        </select>
                        <h6 className="admin__button gradient" style={{ cursor: "pointer" }} onClick={(e) => removeDay()}>Удалить день</h6>
                    </div>
                </form>


                <h1>Поменять пароль модераторам</h1>
                <form action="">
                    <div className="creactePost">
                        <input ref={upd} className="admin__input" type="text" placeholder="Введите новый пароль" required />
                        <h6 className="admin__button gradient" style={{ cursor: "pointer" }} onClick={(e) => updModer()}>Поменять пароль</h6>
                    </div>
                </form>


                <h1 style={{ marginTop: "20px" }}>Товары:</h1>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-evenly", alignItems: "flex-start", zIndex: '10000' }}>
                    {getAll.map(el => {

                        return <div key={el.id}>
                            <img style={{ width: "150px" }} src={el.img} alt="" />
                            <h4>{el.name}</h4>
                            <h4>Цена:{el.price}</h4>
                            <h4>Категория{el.cat_id}</h4>

                            <h6 style={{ cursor: "pointer" }} onClick={() => delElement(el.name)}>X</h6>
                        </div>
                    }
                    )}
                </div>


            </div>
        );
    }
    else {
        alert("Неверно")
    }
}

export default Admin;
