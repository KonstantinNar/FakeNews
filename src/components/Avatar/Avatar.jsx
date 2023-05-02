import { useContext } from "react";
import s from "./Avatar.module.css"
import { Dropdown, Space } from 'antd';
import { UserContext } from "../../context/UserContext";
import { Link, useNavigate } from "react-router-dom";

export const Avatar = () => {

    const { userInfo, setAuthorization } = useContext(UserContext)
    const navigate = useNavigate()

    const handleClick = () => {
        localStorage.removeItem("token")
        setAuthorization(false)
    }

    const items = [
        {
            key: '1',
            label: (
                <p rel="noopener noreferrer" onClick={() => (navigate('/user/user-info'))}>
                    Вы вошли как<br />
                    <span className={s.name}>{userInfo.name}</span>
                </p>
            ),
        },
        {
            key: '2',
            label: (
                <Link to={'/authorization'} rel="noopener noreferrer" href="#" onClick={() => (handleClick())}>
                    <span className={s.signout}>Выйти</span>
                </Link>
            ),
        },
    ];

    return (
        <Dropdown
            menu={{
                items,
            }}
        >
            <a onClick={(e) => e.preventDefault()} >
                <Space>
                    <img src={userInfo.avatar} alt="Avatar" className={s.avatar} />
                </Space>
            </a>
        </Dropdown>
    )
}