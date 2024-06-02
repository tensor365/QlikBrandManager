import * as React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogContent,
  DialogBody,
  DialogActions,
  Button,
  Input,
  Label,
  makeStyles,
} from "@fluentui/react-components";


import { AddRegular } from "@fluentui/react-icons";
import {createBrandList} from "./services/brands-api";

import { useContext } from "react"
import {refreshTableContext} from "./BodyPage";

const useStyles = makeStyles({
  content: {
    display: "flex",
    flexDirection: "column",
    rowGap: "10px",
  },
});

export const CreateBrandForm = () => {
  const styles = useStyles();

  const { tableUpdateFlag,setTableUpdateFlag, selectedBrandID,setSelectedBrandID } = useContext(refreshTableContext)

  const [qlikBrandName, setQlikBrandName] = React.useState<string>();
  const [selectedLogo, setSelectedLogo] = React.useState(null);
  const [selectedIcon, setSelectedIcon] = React.useState(null);

  const handleQlikBrandChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQlikBrandName(event.target.value);
  };

  const handleFileSelectedLogo = (event) => {
    setSelectedLogo(event.target.files[0])
  }

  const handleFileSelectedIcon = (event) => {
    setSelectedIcon(event.target.files[0])
  }

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const answer = createBrandList(qlikBrandName, selectedIcon, selectedLogo);
    setTableUpdateFlag(!tableUpdateFlag);
  };

  return (
    <Dialog modalType="modal" >
      <DialogTrigger disableButtonEnhancement>
        <Button icon={<AddRegular />}>New Brand</Button>
      </DialogTrigger>
      <DialogSurface aria-describedby={undefined}>
        <form onSubmit={handleSubmit}>
          <DialogBody>
            <DialogTitle>Create a new brand</DialogTitle>
            <DialogContent className={styles.content}>
              <Label required htmlFor={"brand-name-input"}>
                Qlik Sense Brand Name
              </Label>
              <Input required type="text" id={"brand-name-input"} onChange={handleQlikBrandChange}/>
              <Label required htmlFor={"qlik-icon-input"}>
                Qlik Sense Icon
              </Label>
              <input required type="file" id={"qlik-icon-input"} onChange={handleFileSelectedIcon}/>
              <Label required htmlFor={"qlik-logo-input"}>
              Qlik Sense Logo
              </Label>
              <input required type="file" id={"qlik-logo-input"} onChange={handleFileSelectedLogo}/>
            </DialogContent>
            <DialogActions> 
              <DialogTrigger disableButtonEnhancement>
                <Button appearance="secondary">Close</Button>
              </DialogTrigger>
              <DialogTrigger disableButtonEnhancement>
              <Button type="submit" appearance="primary">
                Submit
              </Button>
              </DialogTrigger>
            </DialogActions>
          </DialogBody>
        </form>
      </DialogSurface>
    </Dialog>
  );
};