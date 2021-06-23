import React, { useEffect, useState } from 'react';

import { Form, Button } from 'react-bootstrap';
import { useSnackbar } from 'notistack';

//Services
import TodoService from '../../services/todos';

//Styles
import './styles.scss';

/**
 * Main component
 */
const MyTodoList = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [items, setItems] = useState<Array<ToDoType>>([]);

  /**
   * Get To-do lists
   */
  const doGetItemsList = async (): Promise<Array<ToDoType> | any> => {
    try {
      const { data } = await TodoService.List();

      setItems(data);
    } catch (err) {
      enqueueSnackbar('Error getting to-dos', {
        variant: 'error',
      });
    }
  };

  //Todo: Add unmount callback
  useEffect(() => {
    doGetItemsList();
  }, []);

  /**
   * Create new item
   * @param {string} uid unique id of the item
   */
  const onPushItem = async () => {
    let clonedItems = [...items];
    //Generate a empty item
    const newItem = {
      text: '',
    } as ToDoType;

    clonedItems.push(newItem);

    setItems(clonedItems);
  };

  /**
   * Add new item
   * @param {string} uid unique id of the item
   */
  const onAdddAction = async (_item: ToDoType): Promise<any> => {
    try {
      await TodoService.Create(_item);
      /**
       * Re-fetch (as is a small api, but the ideal is update the state)
       */
      await doGetItemsList();
    } catch (err) {
      if (err?.response?.data) {
        enqueueSnackbar(err.response.data.msg, {
          variant: 'error',
        });
      }
    }
  };

  /**
   * Update item
   * @param {string} uid unique id of the item
   */
  const onUpdateAction = async (_item: ToDoType): Promise<any> => {
    try {
      await TodoService.Update(_item, _item._id);
      /**
       * Re-fetch (as is a small api, but the ideal is update the state)
       */
      await doGetItemsList();
    } catch (err) {
      if (err?.response?.data) {
        enqueueSnackbar(err.response.data.msg, {
          variant: 'error',
        });
      }
    }
  };

  /**
   * Delete item
   * @param {string} uid unique id of the item
   */
  const onDeleteAction = async (uid: string): Promise<any> => {
    try {
      await TodoService.Remove(uid);
      /**
       * Re-fetch (as is a small api, but the ideal is update the state)
       */
      await doGetItemsList();
    } catch (err) {
      if (err?.response?.data) {
        enqueueSnackbar(err.response.data.msg, {
          variant: 'error',
        });
      }
    }
  };

  /**
   * On handle todo field
   * @param {string} _key unique id of the item
   * @param {string} _value value for the item
   */
  const onFieldChange = (_key: number, _value: string) => {
    //Clone items to update state
    const clonedItems = [...items];

    //Set new item
    clonedItems[_key]['text'] = _value;

    setItems(clonedItems);
  };

  /**
   * Handle to handle blue input if can be created or ignored
   * @param {string}  _key unique id of the item
   * @param {string} _type type the crud
   */
  const onBlurAction = (_key: number, _item: ToDoType) => {
    //If item doest have a unique id, will create the item
    if (!_item._id) {
      //If item doest have any value remove it
      if (!_item.text) {
        let clonedItems = [...items];

        clonedItems.splice(_key, 1);

        setItems(clonedItems);
      }

      //Create item with value
      return onAdddAction(_item);
    }

    //If item have a unique id, will update it
    return onUpdateAction(_item);
  };

  return (
    <div className='itemsList'>
      <ul className='itemsList_ul'>
        {items.map((e, k) => (
          <li key={k}>
            <Form.Control
              value={e.text}
              onChange={({ target }) => onFieldChange(k, target.value)}
              onBlur={() => onBlurAction(k, e)}
            />
            {e._id && (
              <Button
                variant='secondary'
                size='sm'
                onClick={() => onDeleteAction(e._id)}
              >
                X
              </Button>
            )}
          </li>
        ))}
      </ul>

      <Button variant='secondary' size='sm' onClick={() => onPushItem()}>
        + Add more
      </Button>
    </div>
  );
};

export default MyTodoList;
