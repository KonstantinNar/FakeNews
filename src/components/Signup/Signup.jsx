import s from "./Signup.module.css"
import { Dropdown, Space } from 'antd';

export const Signup = ({ userInfo }) => {

    const items = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="#">
                    Вошел как <br />
                    <span className={s.name}>{userInfo.name}</span>
                </a>
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