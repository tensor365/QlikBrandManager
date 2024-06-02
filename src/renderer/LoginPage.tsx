import { Label, Input, Text, Textarea, Button } from "@fluentui/react-components"

import { useState} from "react";
import { useNavigate  } from "react-router-dom";




export const Login = ()=>{

  const [qlikTenant,setQlikTenantValue] = useState<string>('');
  const [qlikToken, setQlikTokenValue] = useState<string>('');

  const navigate = useNavigate();

  const handleQlikTenantChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setQlikTenantValue(event.target.value);
    };

  const handleQlikTokenChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setQlikTokenValue(event.target.value);
    };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    
    localStorage.setItem("qlikToken", qlikToken);
    localStorage.setItem("qlikTenant", qlikTenant);
    navigate('/home')
  };

    return(
      <form 
      onSubmit={handleSubmit}
      style={{
          height: "100%",
          display: "flex",
          padding: 30,
          gap: 20,
          flexDirection: "column",
          boxSizing: "border-box"
      }}
      >
          <div>
            <Text>Please can you provide your Qlik Cloud Tenant URI and Qlik API Token.</Text>
          </div>

          <div style={{
            display: "flex",
            flexDirection: "column",
            }}>
            <Label required style={{fontWeight: "bold"}} htmlFor={"qlik-tenant-input"}>
              Tenant Qlik Cloud URI
            </Label>
            <Input required id={"qlik-tenant-input"} value={qlikTenant} onChange={handleQlikTenantChange} placeholder="https://xxxxxxx.(eu|us).qlikcloud.com"/>     
          </div>

          <div style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            boxSizing: "border-box",
            }}>
            <Label required style={{fontWeight: "bold"}} htmlFor={"qlik-token-input"}>
              Qlik API Token
            </Label>
            <Textarea required id={"qlik-token-input"} value={qlikToken} onChange={handleQlikTokenChange} placeholder="Your Qlik Cloud API Token" style={{height: "100%"}}/>
          </div>
          
          <div style={{display: "flex", marginLeft: "auto"}}>
          <Button  type="submit" appearance="primary">
            Login
          </Button>
          </div>

        </form>

    )
  }


