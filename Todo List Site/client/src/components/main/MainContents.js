import React            from 'react';
import TableHeader      from './TableHeader';
import TableContents    from './TableContents';

const MainContents = (props) => {
    return (
        <div className='table ' >
            <TableHeader
                disabled={!props.activeList._id} addItem={props.addItem}
                setShowDelete={props.setShowDelete} setActiveList={props.setActiveList} 
                activeList={props.activeList} 
                undo={props.undo} redo={props.redo} 
                handleClickClose={props.handleClickClose}
                handleSortBy={props.handleSortBy}
                hasTransactionToRedo={props.hasTransactionToRedo} hasTransactionToUndo={props.hasTransactionToUndo}
            />
            <TableContents
                key={props.activeList.id} activeList={props.activeList}
                deleteItem={props.deleteItem} reorderItem={props.reorderItem}
                editItem={props.editItem} 
            />
        </div>
    );
};

export default MainContents;