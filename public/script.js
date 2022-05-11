window.onload = async (event) => {
  await renderInventory();
  document.getElementById('create_button').addEventListener('click', newItem);
};

let ALL_ITEMS = [];
async function renderInventory() {
  const $inventory = document.getElementById('inventory');
  const inventory = await fetchInventory();

  inventory.forEach(item => {
    ALL_ITEMS.push(item);
    $inventory.appendChild(renderItem(item));
  });
}

function renderItem(item) {
  const $container = document.createElement('div');
  $container.classList.add('item');
  $container.setAttribute('id', `item_${item._id}`);

  const $name = document.createElement('input');
  $name.classList.add('item_name');
  $name.setAttribute('default', item.name);
  $name.value = item.name;
  $name.disabled = true;

  const $price = document.createElement('input');
  $price.classList.add('item_price');
  $price.setAttribute('default', item.price);
  $price.value = item.price;
  $price.disabled = true;

  const $edit = document.createElement('button');
  $edit.classList.add('item_edit');
  $edit.setAttribute('edit', false);
  $edit.innerText = 'Edit';
  $edit.addEventListener('click', (e) => onEditClick(e, $container));

  const $save = document.createElement('button');
  $save.classList.add('item_save');
  $save.innerText = 'Save';
  $save.hidden = true;
  $save.addEventListener('click', (e) => onSaveClick(e, $container, item._id));

  const $delete = document.createElement('button');
  $delete.classList.add('item_delete');
  $delete.setAttribute('delete', false);
  $delete.innerText = 'Delete';
  $delete.addEventListener('click', (e) => onDeleteClick(e, $container));

  const $deleteComment = document.createElement('input');
  $deleteComment.classList.add('item_delete_comment');
  $deleteComment.hidden = true;
  $deleteComment.setAttribute('placeholder', 'enter a comment');

  const $deleteConfirm = document.createElement('button');
  $deleteConfirm.classList.add('item_delete_confirm');
  $deleteConfirm.innerText = 'Confirm Deletion';
  $deleteConfirm.hidden = true;
  $deleteConfirm.addEventListener('click', (e) => onDeleteConfirmClick(e, $container, item._id));

  const $deleteUndo = document.createElement('button');
  $deleteUndo.classList.add('item_delete_undo');
  $deleteUndo.innerText = 'Undo Delete';
  $deleteUndo.hidden = true;
  $deleteUndo.addEventListener('click', (e) => onDeleteUndoClick(e, $container, item._id));  

  const $deleteHistory = document.createElement('button');
  $deleteHistory.classList.add('item_delete_history');
  $deleteHistory.innerText = 'Deletion History';
  $deleteHistory.addEventListener('click', (e) => onDeleteHistoryClick(e, item._id));  

  $container.appendChild($name);
  $container.appendChild($price);
  $container.appendChild($edit);
  $container.appendChild($save);
  $container.appendChild($delete);
  $container.appendChild($deleteComment);
  $container.appendChild($deleteConfirm);
  $container.appendChild($deleteUndo);
  $container.appendChild($deleteHistory)
  
  return $container;
}

function onEditClick(e, $container) {
  const currentState = e.target.getAttribute('edit') == 'true';
  toggleItemEdit($container, !currentState);
}

function onSaveClick(e, $container, id) {
  const $name = $container.getElementsByClassName('item_name')[0];
  $name.setAttribute('default', $name.value);
  const $price = $container.getElementsByClassName('item_price')[0];
  $price.setAttribute('default', $price.value);
  saveItem(id, $name.value, $price.value)

  const currentState = e.target.getAttribute('edit') == 'true';
  toggleItemEdit($container, currentState);
}

function onDeleteClick(e, $container) {
  const currentState = e.target.getAttribute('delete') == 'true';
  toggleItemEdit($container, false);
  toggleItemEditVisibility($container, currentState);
  toggleItemDelete($container, currentState);
}

async function onDeleteConfirmClick(e, $container, id) {
  const comment = $container.getElementsByClassName('item_delete_comment')[0].value;
  await deleteItem(id, comment);
  toggleItemDelete($container, true);
  toggleUndoItemDelete($container, true);
}

async function onDeleteUndoClick(e, $container, id) {
  await undoItemDelete(id);
  toggleUndoItemDelete($container, false);
  $container.getElementsByClassName('item_delete_confirm')[0].hidden = true;
}

async function onDeleteHistoryClick(e, id) {
  const history = ALL_ITEMS.filter(i => i._id == id)[0].deletionHistory;
  
  const $table = document.getElementById('table_history');
  const children = $table.querySelectorAll('tr');
  for (let i = 1; i < children.length; i++) {
    children[i].remove();
  }


  $table.hidden = false;
  document.getElementById('delete_history').hidden = true;

  history.forEach(h => {
    $tr = document.createElement('tr')
    
    $date = document.createElement('td')
    $date.innerText = h.date;

    $comment = document.createElement('td')
    $comment.innerText = h.comment;

    $tr.appendChild($date);
    $tr.appendChild($comment);
    $table.appendChild($tr);
  });
}

function toggleItemEdit($container, edit) {
  const $name = $container.getElementsByClassName('item_name')[0];
  $name.value = $name.getAttribute('default');
  $name.disabled = !edit;

  const $price = $container.getElementsByClassName('item_price')[0];
  $price.value = $price.getAttribute('default');
  $price.disabled = !edit;

  const $edit = $container.getElementsByClassName('item_edit')[0];
  $edit.setAttribute('edit', edit);

  const $save = $container.getElementsByClassName('item_save')[0];
  $save.hidden = !edit;

  const $delete = $container.getElementsByClassName('item_delete')[0];
  $delete.hidden = edit;

  if (edit) {
    $edit.innerText = 'Cancel';
  } else {
    $edit.innerText = 'Edit';
  }
}

function toggleItemEditVisibility($container, visible) {
  $container.getElementsByClassName('item_price')[0].hidden = !visible;
  $container.getElementsByClassName('item_edit')[0].hidden = !visible;
}

function toggleItemDelete($container, del) {
  const $comment = $container.getElementsByClassName('item_delete_comment')[0];
  $comment.value = '';
  $comment.hidden = del;

  const $confirm = $container.getElementsByClassName('item_delete_confirm')[0];
  $confirm.hidden = del;

  const $delete = $container.getElementsByClassName('item_delete')[0];
  $delete.setAttribute('delete', !del);
  if (del) {
    $delete.innerText = 'Delete';
  } else {
    $delete.innerText = 'Cancel';
  }
}

function toggleUndoItemDelete($container, state) {
  const $name = $container.getElementsByClassName('item_name')[0];
  const $price = $container.getElementsByClassName('item_price')[0];
  const $edit = $container.getElementsByClassName('item_edit')[0];
  const $delete = $container.getElementsByClassName('item_delete')[0];
  const $undo = $container.getElementsByClassName('item_delete_undo')[0];
  const $confirm = $container.getElementsByClassName('item_delete_confirm')[0];

  $price.hidden = state;
  $edit.hidden = state;
  $delete.hidden = state;
  $undo.hidden = !state;
  $confirm.hidden = state;

  if (state) {
    $name.classList.add('deleted');
    $price.classList.add('deleted');
  } else {
    $name.classList.remove('deleted');
    $price.classList.remove('deleted');
  }
}

async function newItem() {
  const name = document.getElementById('create_name').value;
  const price = document.getElementById('create_price').value;
  const newItem = await createItem(name, price)
  
  if (newItem.status == 422) {
    alert(newItem.error);
    return;
  }
  
  document.getElementById('inventory').appendChild(renderItem(newItem));
}

async function createItem(name, price) {
  const data = { name, price: parseInt(price) };
  const response = await fetch('/items/api/v1', { 
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const newItem = await response.json();
  ALL_ITEMS.push(newItem);
  return newItem;
}

async function saveItem(id, name, price) {
  const data = { id, name, price: parseInt(price) };
  await fetch('/items/api/v1', { 
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
}

async function deleteItem(id, comment) {
  const data = { id };
  if (comment != '') {
    data.comment = comment;
  }
  const response = await fetch('/items/api/v1', { 
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const updatedItem = await response.json();
  console.log(ALL_ITEMS)
  ALL_ITEMS = ALL_ITEMS.filter(i => i._id != updatedItem._id)
  ALL_ITEMS.push(updatedItem);
}

async function undoItemDelete(id) {
  const data = { id };
  await fetch('/items/api/v1/undelete', { 
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
}

async function fetchInventory() {
  const response = await fetch('/items/api/v1/all');
  return await response.json();
}