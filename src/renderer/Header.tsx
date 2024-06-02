import { Image , Avatar, Text, MenuTrigger, MenuItem, MenuList, MenuPopover, Menu } from "@fluentui/react-components";
import { useNavigate  } from "react-router-dom";
import { getUserInfo } from './services/brands-api';
import { useEffect, useState } from "react";

export const Header = () => {

    const navigate = useNavigate();

    const [name,setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const getQlikUserInfo = async () => {

        const answer = await getUserInfo();
        setName(answer.data.name);
        setEmail(answer.data.email);
        
    }

    useEffect(() => {
        getQlikUserInfo();

      },[]);

    const logout = (ev: React.FormEvent) => {
        ev.preventDefault();
        localStorage.clear();
        navigate("/");
      };

    return (
        <div
            style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 20,
            }}
        >
             <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 10,}}>
                <Image 
                 src="./img/qlik.png"
                 alt="qlik-icon"
                 width="20%"
                 height="20%"
                />
             </div>
            
             <Menu>
                <MenuTrigger disableButtonEnhancement>
                    <div  style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 10,}}>
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <Text size={200} align="end">
                                    {name}
                                </Text>
                                <Text size={100} align="end">
                                   {email}
                                </Text>
                            </div>
                            <Avatar size={36} name={name} />         
                    </div>
                </MenuTrigger>
                <MenuPopover>
                    <MenuList>
                        <MenuItem onClick={logout}>Logout</MenuItem>
                    </MenuList>
                </MenuPopover> 
            </Menu>

        </div>
    );
};
