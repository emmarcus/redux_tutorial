import ReactDOM from "react-dom";
import React from "react";

// States
const ST_NONE = "Not Purchased";
const ST_BOUGHT  = "Bought";
const ST_PREORDERED = "Pre-ordered";

// Action types
const AT_BUY = "Buy it";
const AT_PREORDER = "Pre-order it";
const AT_CANCEL_PREORDER = "Cancel Pre-order";
const AT_RETURN = "Return it";

let action = (state = ST_NONE, action) => {
  switch (action.type) {
    case AT_BUY:
      return ST_BOUGHT;
    case AT_PREORDER:
      return ST_PREORDERED;
    case AT_RETURN:
      return ST_NONE;
    case AT_CANCEL_PREORDER:
      return ST_NONE;
    default:
      return state;
  };
}

import { createStore } from 'redux';
const store = createStore(action);

const GroceryItem = (props) => (
  <div>
      <span ><b> {store.getState()} </b></span>
      <span >{props.name}</span>
    </div>
  )

const Groceries = (props) => (
  <div><b>Groceries:</b>
  { store.getState() === ST_NONE ? <button onClick={props.onPreorder} >Preorder All</button> : null }
  { store.getState() === ST_NONE ? <button onClick={props.onBuy     } >Buy All</button> : null }
  { store.getState() === ST_BOUGHT ? <button onClick={props.onReturn     } >Return All</button> : null }
  { store.getState() === ST_PREORDERED ? <button onClick={props.onCancelPreorder     } >Cancel Pre-order</button> : null }

    {props.items.map(item =>
            <GroceryItem key={item} name={item} purchased={store.getState()} onPreorder={props.onPreorder}></GroceryItem>
    )}
    </div>
)

// TODO

const doRender = () =>
ReactDOM.render(
  <Groceries items={["Milk", "Sugar", "Bananas", "Kiwis"]}
    onPreorder={() => store.dispatch({type: AT_PREORDER})}
    onBuy     ={() => store.dispatch({type: AT_BUY})}
    onReturn  ={() => store.dispatch({type: AT_RETURN})}
    onCancelPreorder={() => store.dispatch({type: AT_CANCEL_PREORDER})}
  />,
  document.getElementById("app")
);

doRender();
store.subscribe(doRender);
