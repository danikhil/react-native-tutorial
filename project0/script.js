const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

let itemCount = 0
let checkedCount = 0

function generateRandomId() {
  return String(Math.random()*Math.random()).slice(0,10)
}

function newTodo() {
  const div = document.createElement("div")
  const todo_id = "todo_" + generateRandomId()
  const textbox = document.createElement("textarea")
  const text = document.createTextNode("Checked: ")
  const checkbox = document.createElement("input")
  const button = document.createElement("button")

  div.setAttribute("class", "todo-container")
  div.setAttribute("id", todo_id)

  textbox.setAttribute("class", "todo-text")
  textbox.setAttribute("rows", "8")

  checkbox.setAttribute("class", "todo_checkbox middle")
  checkbox.setAttribute("type", "checkbox")
  checkbox.setAttribute("onchange", "modifyCheckbox(this)")

  const button_id = "btn_" + todo_id  
  button.setAttribute("onclick", "deleteTodo(this)")
  button.setAttribute("id", button_id)
  const button_text = document.createTextNode("delete")
  button.appendChild(button_text)

  div.appendChild(textbox)
  div.appendChild(text)
  div.appendChild(checkbox)
  div.appendChild(button)
  list.appendChild(div)

  itemCount++
  itemCountSpan.innerHTML = itemCount
  uncheckedCountSpan.innerHTML = itemCount-checkedCount
}

function modifyCheckbox(element) {
  const checked = element.checked
  
  if(checked) {
    checkedCount++;
  }
  else
  {
    checkedCount--;
  }
  uncheckedCountSpan.innerHTML = itemCount-checkedCount
}

function deleteTodo(element) {

  const button_id = element.id
  const todo_id = button_id.slice(4)
  const todo = document.getElementById(todo_id)
  const checkbox = todo.getElementsByClassName("todo_checkbox")[0]

  if(checkbox.checked) {
    checkedCount--
  }

  todo.remove()
  itemCount--
  itemCountSpan.innerHTML = itemCount
  uncheckedCountSpan.innerHTML = itemCount-checkedCount
}
