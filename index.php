<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Task Manager</title>

  <link href="https://fonts.googleapis.com/css?family=Montserrat&display=swap" rel="stylesheet">

  <!-- Link to stylesheet -->
  <link rel="stylesheet" href=".\static\css\style.css">

</head>
<body>
  <div id="main-container">
    <div id="form-wrapper">

      <!-- container for form -->
      <form id="form" class="flex-wrapper" action="./includes/form_handler.php" method="POST">
          <div class="user-input">
            <input id="title" class="form-control" type="text" name="title" placeholder="Add task">
          </div>
          <div class="date-input">
            <input id="date" class="form-control" type="date" name="date" placeholder="Add due date">
          </div>
          <div class="submit">
            <input id="submit" class="submit-button" type="submit" value="Add Task">
          </div>
          
      </form>

      <!-- container for task list heading -->
      <div>
        <div class="task-wrapper flex-wrapper">
          <div class="task-list-item-container heading-title">
              <span>Task List</span>
          </div>
          <div id="create-button" class="submit">
              
          </div>
      </div>
      </div>
      
    </div>

    <!-- container for task list -->
    <div id="list-wrapper"></div>
      
  </div>

  <!-- Fontawesome script -->
  <script src="https://kit.fontawesome.com/e26a309e14.js" crossorigin="anonymous"></script>
  
  <!-- Taskmanager script -->
  <script src="./static/js/index/build_list.js"></script>

</body>
</html>
