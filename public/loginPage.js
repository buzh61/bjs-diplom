const userForm = new UserForm();

userForm.loginFormCallback = data => {
    ApiConnector.login(data, response => {
        if (response.success == true) {
            location.reload();
        } else {
            errorMessage = response.error;
            userForm.setLoginErrorMessage(errorMessage)
        }
    })
}