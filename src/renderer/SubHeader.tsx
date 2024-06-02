
import {  ToggleButton } from "@fluentui/react-components";
import { CreateBrandForm } from "./CreateBrandForm";

import { useContext, useEffect, useState } from "react"
import {refreshTableContext} from "./BodyPage";

import {activateBrandList, deactivateBrandList} from "./services/brands-api";

export const SubHeader = () => {

    const { tableUpdateFlag,setTableUpdateFlag, selectedBrandID,setSelectedBrandID } = useContext(refreshTableContext)

    const handleActivate = () => {
        console.log(selectedBrandID)
        if(selectedBrandID.active)
        {
            deactivateBrandList(selectedBrandID.id); 
        }
        else
        {
            activateBrandList(selectedBrandID.id);
        }
        selectedBrandID.active = !selectedBrandID.active
        setSelectedBrandID(selectedBrandID);
        setTableUpdateFlag(!tableUpdateFlag);
      };


    return (
        <div
            style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
            }}
        >
            <div style={{width: "20%",  display: "block" }}>
                <CreateBrandForm/>
            </div>

            <div style={{width: "20%",  display: "block" }}>
                <ToggleButton  onClick={handleActivate} checked={selectedBrandID && selectedBrandID.active == "active" } style={{display: selectedBrandID ? "block": "none"}}>
                    {selectedBrandID && selectedBrandID.active ? "Deactivate" : "Activate"}
                </ToggleButton>
            </div>

        </div>
    );
};
