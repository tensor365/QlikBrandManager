import { Skeleton, SkeletonItem, createTableColumn, TableCell,TableSelectionCell, TableRow, TableCellLayout, Button, Tab, DialogTrigger, Dialog, DialogActions, DialogBody, DialogContent, DialogSurface, DialogTitle, useTableSelection, useTableFeatures, TableColumnDefinition, TableRowId } from "@fluentui/react-components";
import { DeleteRegular, EditRegular, CheckmarkRegular } from "@fluentui/react-icons";

import {getBrandList, deleteBrandList} from "./services/brands-api";
import {  useEffect ,useState, useContext } from "react";

import {refreshTableContext} from "./BodyPage";

interface IData {
    id: number;
    name: string;
    update: string;
    active: boolean;
  }

  const columns: TableColumnDefinition<IData>[] = [
    createTableColumn<IData>({
        columnId: "id",
      }),
    createTableColumn<IData>({
      columnId: "name",
    }),
    createTableColumn<IData>({
      columnId: "update",
    }),
    createTableColumn<IData>({
      columnId: "active",
    })
  ];

export const Themes = () => {
    
    const [items, setTabularData] = useState<IData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [selectedRows, setSelectedRows] = useState<Set<TableRowId>>(new Set());

    const { tableUpdateFlag,setTableUpdateFlag, selectedBrandID,setSelectedBrandID } = useContext(refreshTableContext);

    function delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    };

    const getData = async() => {

        await delay(500);
        const answer = await getBrandList();
    
        const mappedData = answer.data.data.map((item) => ({
            id: item.id,
            name: item.name,
            update: item.updatedAt,
            active: item.active
          }));
          setTabularData(mappedData);
          setIsLoading(false);

    };

    const handleDeleteBrand =  async (brandId: string) => {
        
        await deleteBrandList(brandId);
        await delay(500);
        await getData();
    
      };
   

    useEffect(() => {
        getData();
      },[tableUpdateFlag]);
    
    const {
        getRows,
        selection: { toggleRow, isRowSelected },
      } = useTableFeatures(
        {
          columns,
          items,
        },
        [
          useTableSelection({
            selectionMode: "single",
            selectedItems: selectedRows,
            onSelectionChange: (e, data) => setSelectedRows(data.selectedItems),
          }),
        ]
      );
    
      

      const rows = getRows((row) => {
       
        const selected = isRowSelected(row.rowId);
        return {
          ...row,
          onClick: (e: React.MouseEvent) => {toggleRow(e, row.rowId); 
            setSelectedBrandID(items[row.rowId]);},
          onKeyDown: (e: React.KeyboardEvent) => {
            if (e.key === " ") {
              e.preventDefault();
              toggleRow(e, row.rowId);
            }
          },
          selected,
          appearance: selected ? ("brand" as const) : ("none" as const),
        };
      });
     
    return isLoading ? (
        <>
            {[...Array(4)].map((_, index) => (
                <TableRow key={`skeletion-${index}`}>
                    <TableCell>
                        <Skeleton>
                            <SkeletonItem />
                        </Skeleton>
                    </TableCell>
                    <TableCell>
                        <Skeleton>
                            <SkeletonItem />
                        </Skeleton>
                    </TableCell>
                    <TableCell>
                        <Skeleton>
                            <SkeletonItem />
                        </Skeleton>
                    </TableCell>
                </TableRow>
            ))}
        </>
    ) : (
        <>
        {rows.map(({ item, selected, onClick, onKeyDown, appearance }) => (
         
            <TableRow key={item.id} 
                      onClick={onClick}
                      onKeyDown={onKeyDown}
                      aria-selected={selected}
                      appearance={appearance}>

                <TableSelectionCell type="radio" checked={selected} radioIndicator={{ "aria-label": "Select row" }}/>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.update}</TableCell>
                <TableCell>{item.active ? <CheckmarkRegular/> : ""}</TableCell>
                <TableCell role="gridcell">
                    <TableCellLayout style={{display:"flex", justifyContent:"flex-end"}}>
                        <Button icon={<EditRegular />} aria-label="Edit" />
                        <Dialog>
                            <DialogTrigger disableButtonEnhancement>
                                <Button  icon={<DeleteRegular />} aria-label="Delete" />
                            </DialogTrigger>
                            <DialogSurface>
                                <DialogBody>
                                <DialogTitle>Deleting a brand</DialogTitle>
                                <DialogContent>
                                    Are you sure you want to delete this brand ?
                                </DialogContent>
                                <DialogActions>
                                    <DialogTrigger disableButtonEnhancement>
                                        <Button appearance="secondary">Cancel</Button>
                                    </DialogTrigger>
                                    <DialogTrigger disableButtonEnhancement>
                                        <Button appearance="danger" onClick = {() => handleDeleteBrand(item.id)} >Delete</Button>
                                    </DialogTrigger>
                                </DialogActions>
                                </DialogBody>
                            </DialogSurface>
                        </Dialog>
                    </TableCellLayout>    
                </TableCell>
            </TableRow>
        ))}
        </>
    );
};