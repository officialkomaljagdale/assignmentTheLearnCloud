function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
  }
  
  var items = document.querySelectorAll("#todo-list li");
  
  for (var i = 0; i < items.length; i++) {
    items[i].addEventListener("dragstart", function() {
      this.classList.add("dragging");
    });
  
    items[i].addEventListener("dragend", function() {
      this.classList.remove("dragging");
    });
  }
  
  var checkbox = document.querySelectorAll("input[type=checkbox]");
  
  for (var i = 0; i < checkbox.length; i++) {
    checkbox[i].addEventListener("change", function() {
      var label = this.nextElementSibling;
      if (this.checked) {
        label.classList.add("checked");
      } else {
        label.classList.remove("checked");
      }
    });
  }
  