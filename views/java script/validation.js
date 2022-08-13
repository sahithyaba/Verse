function validateRegister() {
    // Name Validation
    let x = document.forms["Register"]["Name"].value;
    if (x == "") {
      alert("Name must be filled out");
      return false;
    };

    //Email Validation
    x = document.forms["Register"]["Email Id"].value;
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!x.match(mailformat))
    {
    alert("Invalid Email");
    return true;
    }

    x = document.forms["Register"]["Email id"].value;
  }

  function validateLogin()
  {
    
  }