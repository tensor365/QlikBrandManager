import { Table, Link, TableHeader, TableRow, TableHeaderCell, TableBody, MessageBar, MessageBarBody, MessageBarTitle, TableSelectionCell } from "@fluentui/react-components"
import { Header } from "./Header"
import { SubHeader } from "./SubHeader"
import { Themes } from "./Themes"
import { useState, createContext } from "react"


export const refreshTableContext = createContext();

export const Body = ()=>{
    
    const [tableUpdateFlag,setTableUpdateFlag] = useState<boolean>(false);
    const [selectedBrandID,setSelectedBrandID] = useState();

    return(
        
        <refreshTableContext.Provider value={{ tableUpdateFlag, setTableUpdateFlag, selectedBrandID,setSelectedBrandID}}>
        <div
        style={{
            height: "100%",
            display: "flex",
            flexDirection: "row",
            boxSizing: "border-box",
        }}
        >
        
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: 20,
                padding: 20,
                boxSizing: "border-box",
            }}
        >
            <Header />
            <SubHeader/>
            <div style={{ flexGrow: 1 }}>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableSelectionCell type="radio" invisible/>
                            <TableHeaderCell style={{ fontWeight: "bold"}}>Brand Name</TableHeaderCell>
                            <TableHeaderCell style={{ fontWeight: "bold"}}>Last updated</TableHeaderCell>
                            <TableHeaderCell style={{ fontWeight: "bold", textAlign: "center"}}>Active</TableHeaderCell>
                            <TableHeaderCell></TableHeaderCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <Themes/>
                    </TableBody>
                </Table>
            </div>

            <MessageBar>
                <MessageBarBody>
                    <MessageBarTitle>Any bugs</MessageBarTitle>
                    Click <Link target="_blank" href="https://github.com/tensor365/QlikBrandManager/issues">here</Link> to report bug on github.
                </MessageBarBody>
            </MessageBar>

        </div>
    </div>
    </refreshTableContext.Provider>

    )
  }