const logout = new LogoutButton();

logout.action = () => {
    ApiConnector.logout(response => {
        if (response.success == true) {
            location.reload();
        } else {
            errorMessage = response.error;
            userForm.setLoginErrorMessage(errorMessage);
        }
    })
}